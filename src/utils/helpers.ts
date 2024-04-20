import config from "../config/AppConfig";

const helper = {
  generateShapes: (numPerformers: number) => {
    return [...Array(numPerformers)].map((_, i) => ({
      id: i.toString(),
      x: Math.random() * config.canvasWidth,
      y: Math.random() * config.canvasHeight,
      rotation: Math.random() * 180,
      isDragging: false,
    }));
  },

  randomLine: (numPerformers: number) => {
    return [...Array(numPerformers)].map((_, i) => ({
      id: i.toString(),
      x: Math.random() * config.canvasWidth,
      y: Math.random() * 0,
      rotation: Math.random() * 180,
      isDragging: false,
    }));
  },
};

export default helper;
