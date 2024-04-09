import { useState } from 'react';
import { Performer } from '../types/Performer';
import config from '../config/AppConfig';
import * as FileSaver from 'file-saver';

export const usePerformersState = (initialState: Performer[]) => {
  const [performers, setPerformers] = useState(initialState);

  const handleDragStart = (id: string) => {
    setPerformers((prevPerformers) =>
      prevPerformers.map((performer) =>
        performer.id === id ? { ...performer, isDragging: true } : performer
      )
    );
  };

  const handleDragEnd = () => {
    setPerformers((prevPerformers) =>
      prevPerformers.map((performer) => ({ ...performer, isDragging: false }))
    );
  };

  const addPerformer = () => {
    const newPerformer: Performer = {
      id: String(performers!.length + 1), 
      x: Math.random() * config.canvasWidth, 
      y: Math.random() * config.canvasHeight, 
      rotation: Math.random() * 180, 
      isDragging: false,
    };
    setPerformers((prevPerformers) => [...prevPerformers, newPerformer]);
  };

  const positionPerformersInLine = (): void => {
      const distanceBetween = (config.canvasWidth / performers.length);
      for (let i = 0; i < performers.length; i++) {
          performers[i].x = distanceBetween * i;
          performers[i].y = config.canvasHeight/2;
      }
      setPerformers((prevPerformers) => [...prevPerformers]);
  };

  const saveState = (): void => {
    const serializedData = JSON.stringify(performers);
    const blob = new Blob([serializedData], { type: 'application/json' });
    FileSaver.saveAs(blob, 'performers.json');
  };

  const loadState = (file: File): void => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsedData = JSON.parse(event.target!.result as string);
        setPerformers(parsedData);
      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
    };
    reader.readAsText(file);
  };


  return { performers, handleDragStart, handleDragEnd, addPerformer, positionPerformersInLine, saveState, loadState };
};
