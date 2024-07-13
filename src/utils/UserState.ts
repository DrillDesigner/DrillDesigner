import { useState, useEffect } from "react";
import { UploadFile } from "antd";
import config from "../config/AppConfig";
import * as FileSaver from "file-saver";
import { message } from "antd";
import { Show } from "../types/Show";
import { User } from "../types/User";
import utils from "./Utils";
import { SelectorPosition } from "../types/SelectorPosition";
import { Performer } from "../types/Performer";

// Helper function to get an updated show 
const getUpdatedShow = (
  show: Show,
  count: number,
  updatedPerformers: Performer[],
) => ({
  ...show,
  countPositions: {
    ...show.countPositions,
    [count]: updatedPerformers,
  },
});

export const useUserState = (initialUser: User) => {
  const [user, setUser] = useState<User>(initialUser);
  const [show, setShow] = useState<Show>(user.shows[config.initialShowID]);
  const [count, setCount] = useState<number>(0);
  const [showPlaying, setShowPlaying] = useState<boolean>(false);
  const [sliderPosition, setSliderPosition] = useState<number[]>([
    0,
    1,
    Object.keys(show.countPositions).length - 1,
  ]);
  
  // Record type with key being the count and value being the index on the undo and redo index
  const [undoIndex, setUndoIndex] = useState<Record<number, number>>({});
  const [redoIndex, setRedoIndex] = useState<Record<number, number>>({});


  const saveState = (): void => {
    const serializedData = JSON.stringify(show);
    const blob = new Blob([serializedData], { type: "application/json" });
    FileSaver.saveAs(blob, "show.json");
  };

  // Callback passed to upload button
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const loadState = (file: UploadFile<any>[]): boolean => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const jsonData = event.target?.result;
      try {
        const parsedData = JSON.parse(jsonData as string);
        setShow(parsedData);
      } catch (error) {
        message.success(`Error parsing JSON: ${error}`);
      }
    };
    reader.readAsText(file[0].originFileObj as File);
    return true;
  };

  // Callback passed to 'Performers to line' button
  const positionPerformersInLine = (): void => {
    const distanceBetween =
      (config.canvasWidth - config.fieldWidthAdjustment * 2) /
      show.countPositions[count].length;
    const updatedPerformers = Object.keys(show.countPositions[count]).map(
      (key, index) => ({
        ...show.countPositions[count][parseInt(key)],
        x: distanceBetween * index + config.fieldWidthAdjustment,
        y: config.canvasHeight / 2,
      }),
    );

    updatePerformersPositions(updatedPerformers, true);
  };

  // update positions of performers when given Performer array
  // only interface to change performer positions
  const updatePerformersPositions = (
    newPerformersPositions: Performer[], // array of Performers in new positions
    addToUndoStack: boolean, // flag to add to undo stack
  ): void => {
    const currentPerformers = show.countPositions[count];

    if (addToUndoStack) {
      // Save current state for undo
      const newUndoIndex = count in undoIndex ? undoIndex[count] + 1 : 0;
      setUndoIndex({ ...undoIndex, [count]: newUndoIndex });

      sessionStorage.setItem(
        "undo" + count + "-" + (newUndoIndex),
        JSON.stringify({ count: count, positions: currentPerformers }),
      );
    }
    
    // update currentPerformers with performers passed in to be at the new position when wrapped within the canvas
    newPerformersPositions.forEach((performer) => {
      currentPerformers[parseInt(performer.id)].x =
        utils.wrapPositionInsideCanvas(performer.x, true);
      currentPerformers[parseInt(performer.id)].y =
        utils.wrapPositionInsideCanvas(performer.y, false);
    });

    const newShow = getUpdatedShow(show, count, currentPerformers);
    setShow(newShow);
  };

  // Callback passed to the undo button
  // If the undo index is greater than -1, get the positions for the last modification at this count, set show to those positions,
  // and add current positions to redo stack
  const undo = () => {
    if (undoIndex[count] > -1) {
      // add undone positions to recall stack
      const newRedoIndex = redoIndex[count] ? redoIndex[count] + 1 : 0;
      sessionStorage.setItem(
        "redo" + count + '-' + (newRedoIndex),
        JSON.stringify({ count: count, positions: show.countPositions[count] }),
      );
      setRedoIndex({...redoIndex, [count]: newRedoIndex });

      // set to last position from undo stack
      const lastPosition: { count: number; positions: Performer[] } = JSON.parse(sessionStorage.getItem("undo" + undoIndex)!);
      setCount(lastPosition["count"]);
      const newUndoIndex = undoIndex[count] ? undoIndex[count] + 1 : 0;
      setUndoIndex({...undoIndex, [count]: newUndoIndex});

      updatePerformersPositions(lastPosition["positions"], false);
    }
  };

  // Callback passed to the redo button
  // If redoIndex is greather than -1, get the last position undone (current position in the redo stack) and set to that position
  const redo = () => {
    if (redoIndex[count] > -1) {
      // get redone position to be set
      const redoPosition: { count: number; positions: Performer[] } =
        JSON.parse(sessionStorage.getItem("redo" + redoIndex)!);

      // set to redone position
      setCount(redoPosition["count"]);
      updatePerformersPositions(redoPosition["positions"], true);

      // remove from redo stack
      const newRedoIndex = redoIndex[count] ? redoIndex[count] - 1 : 0;
      setRedoIndex({...redoIndex, [count]: newRedoIndex});
    }
  };

  // Callback passed to the select show dropdown
  const setShowButtonCallback = (showName: string): void => {
    const showToSet = Object.values(user.shows).find(
      (show) => show.title === showName,
    );

    if (showToSet) {
      setCount(0);
      setShow(showToSet);
    } else {
      console.error(`Show not found: ${showName}`);
    }
  };

  // Callback passed to slider component
  // If first or last slider positions are greater or less than the current count position, move the current count position to remain within the bounds
  const handleCountSliderChange = (sliderBounds: number[]): void => {
    const newBounds = [sliderBounds[0], sliderBounds[1], sliderBounds[2]];

    // set middle mark to newBounds, as sliderBounds from above may be invalid (start surpassing end)
    if (sliderBounds[0] > sliderBounds[1]) {
      newBounds[1] = newBounds[0];
    }
    if (sliderBounds[2] < sliderBounds[1]) {
      newBounds[1] = newBounds[2];
    }
    setSliderPosition(newBounds);

    // if the current count has changed, update it
    if (newBounds[1] != count) {
      setCount(sliderBounds[1]); // set the count to the middle circle, which represents the count the show is currently at
    }
  };

  // Callback passed to slider onChange to set the count
  const handleCountChange = (newCount: number): void => {
    setCount(newCount);
  };

  // Callback passed to the add count button
  const addCountCallback = (): void => {
    const newCount = Object.keys(show.countPositions).length;
    const performersAtEnd = show.countPositions[newCount - 1];
    setShow((prevShow) => ({
      ...prevShow,
      countPositions: {
        ...prevShow.countPositions,
        [newCount]: performersAtEnd.map((performer) => ({ ...performer })),
      },
    }));
    setCount(newCount);
    setSliderPosition([sliderPosition[0], newCount, newCount]);
  };

  // Given a selectorPosition, select (or deselect) performers that are within the selectorPosition box and update the show so those performers are 'selected'
  const selectPerformers = (selectorPosition: SelectorPosition): boolean => {
    const completedSelector = utils.selectionCompleted(selectorPosition);

    // get topLeft and bottomRight x and y cords, could be positionStart or positionNow depending on which way the use dragged
    const topLeft = {
      x: Math.min(
        selectorPosition.positionStart.x,
        selectorPosition.positionNow.x,
      ),
      y: Math.min(
        selectorPosition.positionStart.y,
        selectorPosition.positionNow.y,
      ),
    };
    const bottomRight = {
      x: Math.max(
        selectorPosition.positionStart.x,
        selectorPosition.positionNow.x,
      ),
      y: Math.max(
        selectorPosition.positionStart.y,
        selectorPosition.positionNow.y,
      ),
    };
    let atLeastOnePerformerInBox = false;
    const updatedPerformers = Object.keys(show.countPositions[count]).map(
      (key) => {
        const performer = show.countPositions[count][parseInt(key)];
        const isWithinBox =
          performer.x + config.performerSize >= topLeft.x &&
          performer.x <= bottomRight.x &&
          performer.y + config.performerSize >= topLeft.y &&
          performer.y <= bottomRight.y;
        if (isWithinBox) {
          atLeastOnePerformerInBox = true;
        }
        return {
          ...performer,
          selected: !completedSelector ? completedSelector : isWithinBox,
        };
      },
    );

    const newShow = getUpdatedShow(show, count, updatedPerformers);
    setShow(newShow);
    return atLeastOnePerformerInBox;
  };

  // callback passed to the 'play' button to play or pause the show execution
  const toggleShowPlaying = () => {
    if (showPlaying) {
      setShowPlaying(false);
    } else {
      // first,
      const updatedPerformers = Object.keys(show.countPositions[count]).map(
        (key) => {
          const performer = show.countPositions[count][parseInt(key)];
          return {
            ...performer,
            selected: false,
          };
        },
      );
      setShow({
        ...show,
        countPositions: {
          ...show.countPositions,
          [count]: updatedPerformers,
        },
      });
      setShowPlaying(true);
    }
  };

  const changeShowTitle = (title: string) => {
    setShow({
      ...show,
      title: title,
    });
  };

  // if the show being displayed is changed with setShow, update the show in user.shows
  useEffect(() => {
    setUser((prevUser) => ({
      ...prevUser,
      shows: {
        ...prevUser.shows,
        [show.id]: show,
      },
      selectedShowID: show.id,
    }));

    document.title = show.title + " - Drill Designer";
  }, [show]);

  // if count changes (during show playing) update the slider to match the count
  useEffect(
    function setSliderPositionIfCountChanges() {
      setSliderPosition([sliderPosition[0], count, sliderPosition[2]]);
    },
    [count],
  );

  // runs the play loop is showPlaying changes (play button is clicked)
  useEffect(
    function runPlayLoop() {
      // stopPlayLoopAsync is set in the cleanup function and because it's enclosed in the useEffect scope, the async loop will be able to detect the change and exit the loop
      let stopPlayLoopAsync = false;
      const playLoop = async () => {
        // if middle mark is at the end, start at the beginning. Else, continue where already at
        let nextCountToDisplay =
          sliderPosition[1] == sliderPosition[2]
            ? sliderPosition[0] + 1
            : sliderPosition[1] + 1;
        for (
          nextCountToDisplay;
          nextCountToDisplay <= sliderPosition[2];
          nextCountToDisplay++
        ) {
          // check if cleanup function set
          if (stopPlayLoopAsync) {
            return;
          }
          handleCountChange(nextCountToDisplay);
          await utils.pause(300);
        }

        // reached the end, set the play button back to 'play' from 'pause'
        setShowPlaying(false);

        // set back to the start of the segment
        handleCountChange(sliderPosition[0]);
      };

      if (showPlaying) {
        playLoop();
      }

      // if showPlaying has changed again (i.e. pause button clicked), set stopPlayLoopAsync to true so the asynch play loop function detects it
      return function playLoopCleanup() {
        stopPlayLoopAsync = true;
      };
    },
    [showPlaying],
  );

  return {
    show,
    user,
    positionPerformersInLine,
    saveState,
    loadState,
    count,
    handleCountSliderChange,
    toggleShowPlaying,
    setShowButtonCallback,
    addCountCallback,
    sliderPosition,
    showPlaying,
    selectPerformers,
    updatePerformersPositions,
    undo,
    redo,
    changeShowTitle,
  };
};
