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

  performersToLine: (numPerformers: number, yOffset = 0) => {
    const distanceBetween = config.canvasWidth / numPerformers;
    const startX = (config.canvasWidth - distanceBetween * (numPerformers - 1)) / 2;
    const centerY = config.canvasHeight / 2;
    let y = centerY + yOffset;
    y = Math.max(y, 0);
    y = Math.min(y, config.canvasHeight);


    return [...Array(numPerformers)].map((_, index) => ({
      id: index.toString(),
      x: startX + distanceBetween * index - config.fieldWidthAdjustment,
      y: y,
      rotation: Math.random() * 180,
      isDragging: false,
    }));
  },
};

export default helper;
