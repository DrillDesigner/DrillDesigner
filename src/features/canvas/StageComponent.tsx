import React from 'react';
import { Stage, Layer, Text } from 'react-konva';
import PerformerComponent from './components/PerformerComponent';
import { Performer } from './types/Performer';
import { usePerformersState } from '../../utils/StateHandlingFunction';
import { generateShapes } from '../../utils/helpers';
import useImage from 'use-image';
import BackgroundImage from './assets/chart_border_nums.png'
import Background from './components/Background'

interface StageComponentProps {
  width: number;
  height: number;
}

const INITIAL_STATE: Performer[] = generateShapes();


const StageComponent: React.FC<StageComponentProps> = ({ width, height }) => {
  const { performers, handleDragStart, handleDragEnd } = usePerformersState(INITIAL_STATE);
  const [image] = useImage(BackgroundImage)
  return (
    <Stage width={width} height={height}>
      <Layer>
        <Text text="Try to drag a performer" />
        {performers.map((performer) => (
          <PerformerComponent
            key={performer.id}
            performer={performer}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default StageComponent;
