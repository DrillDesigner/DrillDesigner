import React from "react";
import Konva from "konva";
import { Image } from "react-konva";
import useImage from "use-image";
import { Performer } from "../../types/Performer";
import config from "../../config/AppConfig";

interface PerformerComponentProps {
  performer: Performer;
  imageSrc: string;
  onUpdatePosition: (
    updatedPerformers: Performer[],
    addToUndoStack: boolean,
  ) => void;
  selected: boolean;
}

const PerformerComponent: React.FC<PerformerComponentProps> = (
  props: PerformerComponentProps,
) => {
  const [image] = useImage(props.imageSrc);
  const handleDragEnd = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage();
    const pointerPosition = stage!.getPointerPosition();
    const relativePosition = event.target.getRelativePointerPosition();

    if (pointerPosition && relativePosition) {
      const newX = pointerPosition.x - relativePosition.x;
      const newY = pointerPosition.y - relativePosition.y;

      const updatedPerformer = {
        ...props.performer,
        x: newX,
        y: newY,
      };

      props.onUpdatePosition([updatedPerformer], true);
    }
  };

  return (
    <>
      <Image
        x={props.performer.x}
        y={props.performer.y}
        image={image}
        selected={props.selected}
        draggable={!props.selected} // if selected, the individual performer shouldn't be draggable, only the group
        onDragEnd={handleDragEnd}
        width={config.performerSize}
        height={config.performerSize}
      />
    </>
  );
};

export default PerformerComponent;
