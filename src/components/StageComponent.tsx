import React from 'react';
import { Stage, Layer, Text, Image } from 'react-konva';
import PerformerComponent from './PerformerComponent';
import { Performer } from '../types/Performer';
import { usePerformersState } from '../utils/StateHandlingFunction';
import { generateShapes } from '../utils/helpers';
import { StageComponentProps } from '../types/StageComponentProps';
import BackgroundComponent from './BackgroundComponent'

const INITIAL_STATE: Performer[] = generateShapes();

const StageComponent: React.FC<StageComponentProps> = ({ width, height }) => {
  const { performers, handleDragStart, handleDragEnd } = usePerformersState(INITIAL_STATE);
  return (
    <Stage width={width} height={height}>
      <Layer>
        <BackgroundComponent
          imagePath={'./assets/ChartBorderNums.png'}
          width={width}
          height={height} // TODO: autosize
        />
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
