import React from 'react';
import { Stage, Layer, Text, Image } from 'react-konva';
import PerformerComponent from './PerformerComponent';
import { Performer } from '../types/Performer';
import { usePerformersState } from '../utils/StateHandlingFunction';
import helper from '../utils/helpers';
import { StageComponentProps } from '../types/StageComponentProps';
import BackgroundComponent from './BackgroundComponent'
import config from '../config/AppConfig';
import App from '../App';

const INITIAL_STATE: Performer[] = helper.generateShapes(config.defaultNumPerformers);

const StageComponent: React.FC<StageComponentProps> = ({ width, height }) => {
  const { performers } = usePerformersState(INITIAL_STATE);
  return (
    <Stage width={width} height={height}>
      <Layer>
        <BackgroundComponent
          imageSrc={config.backgroundImageSrc}
          width={width}
          height={height} // TODO: autosize
        />
        {performers.map((performer) => (
          <PerformerComponent
            key={performer.id}
            performer={performer}
            imageSrc={config.performerImageSrc}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default StageComponent;
