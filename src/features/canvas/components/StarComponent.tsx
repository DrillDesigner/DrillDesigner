// StarComponent.tsx
import React from 'react';
import { Star } from 'react-konva';

interface StarComponentProps {
  star: {
    id: string;
    x: number;
    y: number;
    rotation: number;
    isDragging: boolean;
  };
  handleDragStart: (e: any) => void; // Replace `any` with appropriate event type
  handleDragEnd: () => void;
}

const StarComponent: React.FC<StarComponentProps> = ({ star, handleDragStart, handleDragEnd }) => {
  return (
    <Star
      key={star.id}
      id={star.id}
      x={star.x}
      y={star.y}
      numPoints={5}
      innerRadius={20}
      outerRadius={40}
      fill="#89b717"
      opacity={0.8}
      draggable
      rotation={star.rotation}
      shadowColor="black"
      shadowBlur={10}
      shadowOpacity={0.6}
      shadowOffsetX={star.isDragging ? 10 : 5}
      shadowOffsetY={star.isDragging ? 10 : 5}
      scaleX={star.isDragging ? 1.2 : 1}
      scaleY={star.isDragging ? 1.2 : 1}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    />
  );
};

export default StarComponent;
