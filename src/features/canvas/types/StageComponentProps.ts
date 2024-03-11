import { Performer } from "./Performer";

export interface StageComponentProps {
  width: number;
  height: number;
  performers: Performer[];
  handleDragStart: (e: any) => void; // You should replace `any` with appropriate event type
  handleDragEnd: () => void;
}
