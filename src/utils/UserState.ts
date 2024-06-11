import { useState, useEffect } from "react";
import { Popover, UploadFile } from "antd";
import config from "../config/AppConfig";
import * as FileSaver from "file-saver";
import { message } from "antd";
import { Show } from "../types/Show";
import { User } from "../types/User";
import utils from "./Utils";
import { KonvaEventObject } from "konva/lib/Node";
import { SelectorPosition } from "../types/SelectorPosition";

export const useUserState = (user: User) => {
  const [show, setShow] = useState<Show>(user.shows[user.initialShowName]);
  const [count, setCount] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number[]>([
    0,
    1,
    Object.keys(show.countPositions).length - 1,
  ]);
  const [showPlaying, setShowPlaying] = useState<boolean>(false);
  const [selectorPosition, setSelectorPosition] = useState<SelectorPosition>({positionNow: {x: -1, y: -1}, positionStart: {x: -1, y: -1}});

  const saveState = (): void => {
    const serializedData = JSON.stringify(show);
    const blob = new Blob([serializedData], { type: "application/json" });
    FileSaver.saveAs(blob, "show.json");
  };

  // Callback passed to upload button
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

    setShow((prevShow) => ({
      ...prevShow,
      countPositions: {
        ...prevShow.countPositions,
        [count]: updatedPerformers,
      },
    }));
  };

  const updatePerformerPosition = (id: string, x: number, y: number): void => {
    const updatedPerformers = Object.keys(show.countPositions[count]).map(
      (key) => {
        const performer = show.countPositions[count][parseInt(key)];
        if (key === id) {
          return { ...performer, x, y };
        } else {
          return performer;
        }
      },
    );

    setShow((prevShow) => ({
      ...prevShow,
      countPositions: {
        ...prevShow.countPositions,
        [count]: updatedPerformers,
      },
    }));
  };

  const setShowButtonCallback = (showName: string): void => {
    setCount(0);
    setShow(user.shows[showName]);
  };

  // Callback passed to slider component
  // if first or last slider positions are greater or less than the current count position, move the current count position to remain within the bounds
  const handleCountSliderChange = (sliderBounds: number[]): void => {
    let newBounds = [sliderBounds[0], sliderBounds[1], sliderBounds[2]];

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

  // callback passed to slider onChange to set the count
  const handleCountChange = (newCount: number): void => {
    setCount(newCount);
  };

  // callback passed to the 'play' button to play or pause the show execution
  const toggleShowPlaying = () => {
    if (showPlaying) {
      setShowPlaying(false);
    } else {
      setShowPlaying(true);
    }
  };

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

  useEffect(() => {
    user.shows[show.id] = show;
  }, [show, user.shows]);

  useEffect(
    function setSliderPositionIfCountChanges() {
      setSliderPosition([sliderPosition[0], count, sliderPosition[2]]);
    },
    [count],
  );

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



  const onSelectorMouseDown = (mouseEvent: KonvaEventObject<MouseEvent>): void => {
    const x = mouseEvent.evt.offsetX;
    const y = mouseEvent.evt.offsetY;

  // Create a new SelectorPosition object based on the mouse coordinates
    const positionToSet: SelectorPosition = {
      positionNow: { x, y },
      positionStart: { x, y },
    };
    setSelectorPosition(positionToSet);
  };

  const onSelectorMove = (mouseEvent: KonvaEventObject<MouseEvent>): void => {
    
  };

  const onSelectorMouseUp = (mouseEvent: KonvaEventObject<MouseEvent>): void =>  {
    
  };

  return {
    show,
    positionPerformersInLine,
    saveState,
    loadState,
    set: count,
    handleCountChange: handleCountSliderChange,
    updatePositions: updatePerformerPosition,
    toggleShowPlaying,
    setShowButtonCallback,
    addCountCallback,
    sliderPosition,
    showPlaying,
    onSelectorMouseDown,
    onSelectorMouseUp,
    onSelectorMove,
    selectorPosition
  };
};
