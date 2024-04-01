import { useState } from 'react';
import { Performer } from '../types/Performer';

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

  const addPerformer = (performer: Performer) => {
    setPerformers((prevPerformers) => [...prevPerformers, performer]);
  };

  return { performers, handleDragStart, handleDragEnd, addPerformer };
};
