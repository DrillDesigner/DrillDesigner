import { useState } from 'react';
import { Performer } from '../types/Performer';
import { UploadFile } from 'antd';
import config from '../config/AppConfig';
import * as FileSaver from 'file-saver';
import { message } from 'antd';
import { Show } from '../types/Show'; 

export const useShowState = (initialShow: Show) => {
  const [show, setShow] = useState<Show>(initialShow);
  const [position, setPosition] = useState<number>(0);
  const [count, setCount] = useState<number>(1);


  const addPerformer = () => {
    const newPerformer: Performer = {
      id: String(Object.keys(show.performers[count]).length + 1),
      x: Math.random() * config.canvasWidth,
      y: Math.random() * config.canvasHeight,
      rotation: Math.random() * 180,
      isDragging: false,
    };

    setShow((prevShow) => ({
      ...prevShow,
      performers: {
        ...prevShow.performers,
        [count]: [...prevShow.performers[count], newPerformer],
      },
    }));

    setPosition(Object.keys(show.performers[count]).length);
  };

  const positionPerformersInLine = (): void => {
    const distanceBetween = config.canvasWidth / show.performers[count].length;
    const updatedPerformers = Object.keys(show.performers[count]).map((key, index) => ({
      ...show.performers[count][parseInt(key)],
      x: distanceBetween * index,
      y: config.canvasHeight / 2,
    }));

    setShow((prevShow) => ({
      ...prevShow,
      performers: {
        ...prevShow.performers,
        [count]: updatedPerformers,
      },
    }));
    setPosition(0);
  };

  const saveState = (): void => {
    const serializedData = JSON.stringify(show);
    const blob = new Blob([serializedData], { type: 'application/json' });
    FileSaver.saveAs(blob, 'show.json');
  };

  const loadState = (file: UploadFile[]): void => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const jsonData = event.target?.result;
      try {
        const parsedData = JSON.parse(jsonData as string);
        setShow(parsedData);
        setPosition(0);
      } catch (error) {
        message.success(`Error parsing JSON: ${error}`);
      }
    };
    reader.readAsText(file[0].originFileObj as File);
  };

  return {
    show,
    position,
    addPerformer,
    positionPerformersInLine,
    saveState,
    loadState,
    set: count,
  };
};
