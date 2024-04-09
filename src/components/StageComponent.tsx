import React from 'react';
import { Stage, Layer, Text, Image } from 'react-konva';
import PerformerComponent from './PerformerComponent';
import { Performer } from '../types/Performer';
import helper from '../utils/helpers';
import BackgroundComponent from './BackgroundComponent'
import config from '../config/AppConfig';
import {useState} from 'react';


export interface StageComponentProps {
  width: number;
  height: number;
  performers?: Performer[]; // TODO: 
  handleDragStart?: (e: any) => void; // You should replace `any` with appropriate event type
  handleDragEnd?: () => void;
}

const StageComponent: React.FC<StageComponentProps> = ({ width, height, performers }) => {

  return (
    <Stage width={width} height={height}>
      <Layer>
        <BackgroundComponent
          imageSrc={config.backgroundImageSrc}
          width={width}
          height={height} 
        />
        {performers!.map((performer) => (
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
