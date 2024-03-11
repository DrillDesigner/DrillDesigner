import React, { useRef, useEffect, useState } from 'react';
import { Image, Transformer } from 'react-konva';
import useImage from 'use-image';
import { Performer } from '../types/Performer';

interface PerformerComponentProps {
  performer: Performer;
  src: string;
}

const PerformerComponent: React.FC<PerformerComponentProps> = ({ performer, src }) => {
  const [image] = useImage(src);
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
