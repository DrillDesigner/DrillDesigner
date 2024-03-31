import React, { useRef, useEffect, useState } from 'react';
import { Image, Transformer } from 'react-konva';
import useImage from 'use-image';
import { Performer } from '../types/Performer';
import PerformerImage from '../assets/PerformerEmoji.png'

interface PerformerComponentProps {
  performer: Performer;
}

const PerformerComponent: React.FC<PerformerComponentProps> = ({ performer }) => {
  const [image] = useImage(PerformerImage);
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

  const handleDragEnd = (e: any) => {
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
        width={30}
        height={30}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          enabledAnchors={['middle-left', 'middle-right']}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
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
