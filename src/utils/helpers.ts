import config from "../config/AppConfig";

const helper = {
  generateShapes: (numPerformers: number) => {
    return [...Array(numPerformers)].map((_, i) => ({
      id: i.toString(),
      x: i === 0 ? 0 : Math.random() * config.canvasWidth,
      y: i === 0 ? 0 : Math.random() * config.canvasHeight,
      rotation: Math.random() * 180,
      isDragging: false,
    }));
  },

  randomLine: (numPerformers: number) => {
    return [...Array(numPerformers)].map((_, i) => ({
      id: i.toString(),
      x: Math.random() * config.canvasWidth,
      y: Math.random() * config.canvasHeight,
      rotation: Math.random() * 180,
      isDragging: false,
    }));
  },
};

export default helper;
