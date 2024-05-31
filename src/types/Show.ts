import { Performer } from "./Performer";

export interface Show {
  id: string;
  countPositions: { [count: number]: Performer[] }; // key value where key is the count of a show and value is an array of Performer's with their current positions at that count
  count: number; // this is the count, or position for all performers at a given time, that the show starts in. Defaults to 1. 'Show' object remembers what count to display
}
