import React from 'react';
import { Stage, Layer, Text } from 'react-konva';
import PerformerComponent from './components/PerformerComponent';
import { Performer } from './types/Performer';
import { usePerformersState } from '../../utils/StateHandlingFunction';
import { generateShapes } from '../../utils/helpers';
import useImage from 'use-image';

interface StageComponentProps {
  width: number;
  height: number;
}

const INITIAL_STATE: Performer[] = generateShapes();


const StageComponent: React.FC<StageComponentProps> = ({ width, height }) => {
  const { performers, handleDragStart, handleDragEnd } = usePerformersState(INITIAL_STATE);

  return (
    <Stage width={width} height={height}>
      <Layer>
        <Text text="Try to drag a performer" />
        {performers.map((performer) => (
          <PerformerComponent
            key={performer.id}
            performer={performer}
            src={'https://www.buffalo.edu/content/www/studentlife/life-on-campus/clubs-and-activities/search/marching-band/_jcr_content/top/image_431416615_copy_1347151458.img.292.auto.jpg/1656522108396.jpg'}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default StageComponent;
