import { Performer } from "../types/Performer";
import config from "../config/AppConfig";

function generateShapes() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * config.canvasWidth,
    y: Math.random() * config.canvasHeight,
    rotation: Math.random() * 180,
    isDragging: false,
  }));
}

export {generateShapes};

