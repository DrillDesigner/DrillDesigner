import { useState, useEffect } from "react";
import { UploadFile } from "antd";
import config from "../config/AppConfig";
import * as FileSaver from "file-saver";
import { message } from "antd";
import { Show } from "../types/Show";
import { User } from "../types/User";

export const useUserState = (user: User) => {
  
  const [show, setShow] = useState<Show>(user.shows[user.initialShowName]);
  const [count, setCount] = useState<number>(0);

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

  // Callback passed to slider component
  const handleCountChange = (count: number[]): void => {
    setCount(count[0]);
  };

  // Callback passed to 'Performers to line' button
  const positionPerformersInLine = (): void => {
    const distanceBetween = (config.canvasWidth - config.fieldWidthAdjustment * 2) / show.countPositions[count].length;
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
    const updatedPerformers = Object.keys(show.countPositions[count]).map((key) => {
      const performer = show.countPositions[count][parseInt(key)];
      if (key === id) {
        return { ...performer, x, y };
      } else {
        return performer;
      }
    });

    setShow((prevShow) => ({
      ...prevShow,
      countPositions: {
        ...prevShow.countPositions,
        [count]: updatedPerformers,
      },
    }));
  };

  const playShow = async () => {
    for (let i = 0; i < Object.keys(show.countPositions).length; i++) {
      setCount(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  const setShowButtonCallback = (showName: string): void => {
    setShow(user.shows[showName]);
  }

  useEffect(() => {
    user.shows[show.id] = show;
  }, [show, user.shows]);

  return {
    show,
    positionPerformersInLine,
    saveState,
    loadState,
    set: count,
    handleCountChange,
    updatePositions: updatePerformerPosition,
    playShow,
    setShowButtonCallback
  };
};
