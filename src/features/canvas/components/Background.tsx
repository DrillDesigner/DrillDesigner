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
    var background = new Konva.Rect({
        x: 0,
        y: 0,
        width: 50,
        height: 50,
        fillLinearGradientStartPoint: { x: 0, y: 0 },
        // fillLinearGradientEndPoint: { x: stage.width(), y: stage.height() },
        // gradient into transparent color, so we can see CSS styles
        fillLinearGradientColorStops: [
          0,
          'yellow',
          0.5,
          'blue',
          0.6,
          'rgba(0, 0, 0, 0)',
        ],
        // remove background from hit graph for better perf
        // because we don't need any events on the background
        listening: false,
      });
    var layer = new Konva.Layer();
    layer.add(background);
    return (
        <Layer>
            {layer}
        </Layer>
    );
};

export default Background;