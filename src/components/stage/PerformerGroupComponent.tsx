import React from "react";
import Konva from "konva";
import { Group } from "react-konva";
import { Performer } from "../../types/Performer";
import config from "../../config/AppConfig";
import PerformerComponent from "./PerformerComponent";

interface PerformerGroupComponentProps {
  performers?: Performer[];
  updatePerformersPositions: (
    performers: Performer[],
    addToUndoStack: boolean,
  ) => void;
}

const PerformerGroupComponent: React.FC<PerformerGroupComponentProps> = (
  props: PerformerGroupComponentProps,
) => {
  const offsetFromPointer: {
    [key: string]: { xOffset: number; yOffset: number };
  } = {};
  const handleDragStart = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage();
    const pointerPosition = stage!.getPointerPosition();
    props.performers?.forEach((performer) => {
      offsetFromPointer[performer.id] = {
        xOffset: performer.x - pointerPosition!.x,
        yOffset: performer.y - pointerPosition!.y,
      };
    });
  };

  const handleDragEnd = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage();
    const target = event.target;
    // what is this callback really doing?
    // update the positions to where they've been dragged

    const pointerPosition = stage!.getPointerPosition();
    const relativePosition = event.target.getRelativePointerPosition();

    if (pointerPosition && relativePosition) {
      const newX = pointerPosition.x - relativePosition.x;
      const newY = pointerPosition.y - relativePosition.y;

      const updatedPerformers = props.performers?.map((performer) => ({
        ...performer,
        x: newX + performer.x,
        y: newY + performer.y,
      }));

      props.updatePerformersPositions(updatedPerformers!, true);
    }
    target.absolutePosition({ x: 0, y: 0 });
  };

  return (
    <Group draggable onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      {props.performers?.map((performer) => (
        <PerformerComponent
          key={performer.id}
          performer={performer}
          imageSrc={config.performerImageHighlightedSrc}
          onUpdatePosition={props.updatePerformersPositions}
          selected={performer.selected}
        />
      ))}
    </Group>
  );
};

export default PerformerGroupComponent;
