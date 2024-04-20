import { Performer } from "./Performer";

export interface Show {
  id: string;
  name: string;
  performers: { [count: number]: Performer[] };
}
