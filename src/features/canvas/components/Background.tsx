import Konva from 'konva';
import { Stage, Layer, Star, Text } from 'react-konva';

// Set the stage
var width = 1054;
var height = 779;


var layer = new Konva.Layer();

var imageObj = new Image();
imageObj.src = '../assets/chart_border_nums.png';
var background = new Konva.Layer();
var back = new Konva.Image({
    image: imageObj
});
background.add(back);


  


const Background = () => {
    return (
        <Layer>
            {layer}
        </Layer>
    );
};

export { Background };