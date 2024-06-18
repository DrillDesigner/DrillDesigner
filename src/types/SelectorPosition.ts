export interface SelectorPosition {
  positionStart: {x: number, y: number};
  positionNow: {x: number, y: number}; // only ever set on mousedown event and not starting on a Performer
}
