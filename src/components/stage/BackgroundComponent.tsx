import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";
import { KonvaEventObject } from "konva/lib/Node";

interface BackgroundComponentProps {
  imageSrc: string;
  width: number;
  height: number;
  onSelectorMouseDown: (evt: KonvaEventObject<MouseEvent>) => void;
  onSelectorMove: (evt: KonvaEventObject<MouseEvent>) => void;
  onSelectorMouseUp: (evt: KonvaEventObject<MouseEvent>) => void;
}

const BackgroundComponent = (props: BackgroundComponentProps) => {
  const [image] = useImage(props.imageSrc);

  return <Image 
    image={image} 
    width={props.width} 
    height={props.height}
    onMouseDown={props.onSelectorMouseDown}
    onMouseMove={props.onSelectorMove}
    onMouseUp={props.onSelectorMouseUp} />;
};

export default BackgroundComponent;
