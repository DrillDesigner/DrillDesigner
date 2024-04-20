import React from 'react';
import { Stage, Layer } from 'react-konva';
import PerformerComponent from './PerformerComponent';
import BackgroundComponent from './BackgroundComponent';
import config from '../config/AppConfig';
import { Show } from '../types/Show';

export interface StageComponentProps {
  width: number;
  height: number;
  show?: Show;
  count: number;
}

const StageComponent: React.FC<StageComponentProps> = ({ width, height, show: Show, count }) => {
  return (
    <Stage width={width} height={height}>
      <Layer>
        <BackgroundComponent
          imageSrc={config.backgroundImageSrc}
          width={width}
          height={height} 
        />
        {Show?.performers[count]!.map((performer) => (
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
