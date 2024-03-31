import Konva from 'konva';
import { Stage, Layer, Star, Text, Image } from 'react-konva';
import useImage from 'use-image';

interface BackgroundComponentProps {
  imagePath: string;
  width: number;
  height: number;
}

const BackgroundComponent = (props : BackgroundComponentProps) => {
  const[image] = useImage(props.imagePath)
  return <Image 
          image={image} 
          width={props.width}
          height={props.height}
         />;
};

export default BackgroundComponent;