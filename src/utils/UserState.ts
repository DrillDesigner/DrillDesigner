import { useState, useEffect } from "react";
import { Popover, UploadFile } from "antd";
import config from "../config/AppConfig";
import * as FileSaver from "file-saver";
import { message } from "antd";
import { Show } from "../types/Show";
import { User } from "../types/User";
import { setDefaultHighWaterMark } from "stream";
import { setFlagsFromString } from "v8";

export const useUserState = (user: User) => {
  const [show, setShow] = useState<Show>(user.shows[user.initialShowName]);
  const [count, setCount] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number[]>([0, 1, Object.keys(show.countPositions).length - 1]);
  const [showPlaying, setShowPlaying] = useState<boolean>(false);

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


  // Callback passed to slider component
  // if first or last slider positions are greater or less than the current count position, move the current count position to remain within the bounds
  const handleCountSliderChange = (sliderBounds: number[]): void => {
    let newBounds = [sliderBounds[0], sliderBounds[1], sliderBounds[2]];

    // set middle mark to newBounds, as sliderBounds from above may be invalid (start surpassing end)
    if(sliderBounds[0] > sliderBounds[1]) {
      newBounds[1] = newBounds[0];
    }
    if(sliderBounds[2] < sliderBounds[1]) {
      newBounds[1] = newBounds[2];
    }
    setSliderPosition(newBounds);

    // if the current count has changed, update it
    if(newBounds[1] != count){
      setCount(sliderBounds[1]); // set the count to the middle circle, which represents the count the show is currently at
    }
  };

  const handleCountChange = (newCount: number): void => {
    setCount(newCount);
  };

  const toggleShowPlaying = () => {
    console.log("in toggleShowPlaying, showPlaying is " + showPlaying + " going to change it to " + !showPlaying);
    if(showPlaying) {
      console.log("about to setShowPlaying to false(), changing the value of showPlaying which triggers the cleanup");
      setShowPlaying(false);
    }
    else
    {
      setShowPlaying(true);
    }
  };

  const setShowButtonCallback = (showName: string): void => {
    setShow(user.shows[showName]);
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
    setSliderPosition([sliderPosition[0], newCount, newCount])
  };

  useEffect(() => {
    user.shows[show.id] = show;
  }, [show, user.shows]);

  useEffect(() => {
    setSliderPosition([sliderPosition[0], count, sliderPosition[2]])
  }, [count]);

  useEffect(function runPlayLoop() {
    let isCancelled = false; 
    const playLoop = async () => {
      // if middle mark is at the end, start at the beginning. Else, continue where already at
      for (let i = sliderPosition[1] == sliderPosition[2] ? sliderPosition[0] : sliderPosition[1]; i <= sliderPosition[2]; i++) {
        console.log("In the for loop, isCancelled is: " + isCancelled);
        console.log("in the for loop, showPlaying is: " + showPlaying);
        if (isCancelled) {
          console.log("isCancelled condition is true");
          return; 
        }
        handleCountChange(i);
        await pause(300);
      }
    };

    if (showPlaying) {
      console.log("starting playLoop");
      playLoop();
      console.log("playLoop is now executing async");
    }
    
    return function playLoopCleanup() {
      console.log("isCancelled changed in cleanup");
      isCancelled = true;
    };
  }, [showPlaying]);


  const pause = async (milliseconds: number): Promise<void> => {
    if (milliseconds <= 0) {
      throw new Error('milliseconds must be a positive number');
    }
    await new Promise((resolve) => setTimeout(resolve, milliseconds));
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
    showPlaying
  };
};
