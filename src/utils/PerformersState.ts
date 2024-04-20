import { useState } from "react";
import { Performer } from "../types/Performer";
import { UploadFile } from "antd";
import config from "../config/AppConfig";
import * as FileSaver from "file-saver";
import { message } from "antd";
import { Show } from "../types/Show";

export const useShowState = (initialShow: Show) => {
  const [show, setShow] = useState<Show>(initialShow);
  const [count, setCount] = useState<number>(1);

  const positionPerformersInLine = (): void => {
    const distanceBetween = config.canvasWidth / show.performers[count].length;
    const updatedPerformers = Object.keys(show.performers[count]).map(
      (key, index) => ({
        ...show.performers[count][parseInt(key)],
        x: distanceBetween * index,
        y: config.canvasHeight / 2,
      }),
    );

    setShow((prevShow) => ({
      ...prevShow,
      performers: {
        ...prevShow.performers,
        [count]: updatedPerformers,
      },
    }));
  };

  const saveState = (): void => {
    const serializedData = JSON.stringify(show);
    const blob = new Blob([serializedData], { type: "application/json" });
    FileSaver.saveAs(blob, "show.json");
  };

  const loadState = (file: UploadFile[]): void => {
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
  };

  const handleCountChange = (count: number): void => {
    setCount(count);
  }

  const updatePositions = (id: string, x: number, y: number): void => {
    const updatedPerformers = show.performers[count].map((performer) => {
      console.log("Here!");
      if (performer.id === id) {
        console.log("here!!")
        return { ...performer, x, y };
      }
      return performer; 

    });

    setShow((prevShow) => ({
      ...prevShow,
      performers: {
        ...prevShow.performers,
        [count]: updatedPerformers,
      },
    }));
  };

  return {
    show,
    positionPerformersInLine,
    saveState,
    loadState,
    set: count,
    handleCountChange,
    updatePositions
  };
};
