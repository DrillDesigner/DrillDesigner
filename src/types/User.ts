import { Show } from "./Show";

export interface User {
  id: number;
  name: string;
  shows: { [showID: number]: Show };
  selectedShowID: number;
}
