import Konva from 'konva';
import { Stage, Layer, Star, Text, Image } from 'react-konva';
import BackgroundImage from './assets/ChartBorderNums.png'
import useImage from 'use-image';
import { BackgroundComponentProps } from '../types/BackgroundComponentProps';


const BackgroundComponent = (props : BackgroundComponentProps) => {
  const[image] = useImage(props.imagePath)
  return <Image 
          image={image} 
          width={props.width}
          height={props.height}
         />;
};

export default BackgroundComponent;