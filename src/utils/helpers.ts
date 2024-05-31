import config from "../config/AppConfig";

const helper = {
  randomPerformerLocations: (numPerformers: number) => {
    return [...Array(numPerformers)].map((_, i) => ({
      id: i.toString(),
      x: Math.random() * config.canvasWidth + config.fieldWidthAdjustment,
      y: Math.random() * config.canvasHeight + config.fieldHeightAdjustment,
      isDragging: false,
    }));
  },

  performersToLine: (numPerformers: number, yOffset = 0) => {
    const distanceBetween =
      (config.canvasWidth - config.fieldWidthAdjustment * 2) / numPerformers;
    const centerY = config.canvasHeight / 2;
    let y = centerY + yOffset;
    y = Math.max(y, 0);
    y = Math.min(y, config.canvasHeight);

    return [...Array(numPerformers)].map((_, index) => ({
      id: index.toString(),
      x: distanceBetween * index + config.fieldWidthAdjustment,
      y: y,
      isDragging: false,
    }));
  },
};

export default helper;
