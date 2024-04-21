import React, { useRef, useEffect, useState } from "react";
import { Image, Transformer } from "react-konva";
import useImage from "use-image";
import { Performer } from "../types/Performer";
import Konva from "konva";

interface PerformerComponentProps {
  performer: Performer;
  imageSrc: string;
  onUpdatePosition: (id: string, x: number, y: number) => void;
}

const PerformerComponent: React.FC<PerformerComponentProps> = ({
  performer,
  imageSrc,
  onUpdatePosition,
}) => {
  const [image] = useImage(imageSrc);
  const [isSelected, setSelected] = useState(false);
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([image]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected, image]);

  const handleSelect = () => {
    setSelected(true);
  };

  const handleDragEnd = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage();
    const position = stage!.getPointerPosition();

    if (position) {
      const { x, y } = position;
      onUpdatePosition(performer.id, x, y);
    }
    setSelected(false);
  };

  return (
    <>
      <Image
        x={performer.x}
        y={performer.y}
        image={image}
        draggable
        onDragEnd={handleDragEnd}
        onClick={handleSelect}
        onTap={handleSelect}
        width={20}
        height={20}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          enabledAnchors={["middle-left", "middle-right"]}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default PerformerComponent;
