import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";
import { KonvaEventObject } from "konva/lib/Node";

interface BackgroundComponentProps {
  imageSrc: string;
  width: number;
  height: number;
}

const BackgroundComponent = (props: BackgroundComponentProps) => {
  const [image] = useImage(props.imageSrc);

  return <Image 
    image={image} 
    width={props.width} 
    height={props.height}
    />;
};

export default BackgroundComponent;
