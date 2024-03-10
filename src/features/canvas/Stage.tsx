// StageComponent.tsx
import React from 'react';
import { Stage, Layer } from 'react-konva';
import StarComponent from './components/StarComponent'; 

interface Star {
  id: string;
  x: number;
  y: number;
  rotation: number;
  isDragging: boolean;
}

interface StageComponentProps {
  width: number;
  height: number;
  stars: Star[];
  handleDragStart: (e: any) => void; // You should replace `any` with appropriate event type
  handleDragEnd: () => void;
}

const StageComponent: React.FC<StageComponentProps> = ({ width, height, stars, handleDragStart, handleDragEnd }) => {
  return (
    <Stage width={width} height={height}>
      <Layer>
        {stars.map((star) => (
          <StarComponent
            key={star.id}
            star={star}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default StageComponent;
