import { Performer } from "./Performer";

export interface Show {
  id: string;
  name: string;
  performers: { [count: number]: Performer[] };
  count: number; // this is the count, or position for all performers at a given time, that the show starts in. Defaults to 1. 'Show' object remembers what count to display
}
