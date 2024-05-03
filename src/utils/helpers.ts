import config from "../config/AppConfig";

const helper = {
  randomPerformerLocations: (numPerformers: number) => {
    return [...Array(numPerformers)].map((_, i) => ({
      id: i.toString(),
      x:
        i === 0
          ? 10
          : Math.random() * config.fieldWidth + config.fieldWidthAdjustment, // get random x, scale to field width, add adjustment so always within bounds
      y:
        i === 0
          ? 35
          : Math.random() * config.fieldHeight + config.fieldHeightAdjustment, // same as x above
      rotation: Math.random() * 180,
      isDragging: false,
    }));
  },

  performersToLine: (numPerformers: number) => {
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
