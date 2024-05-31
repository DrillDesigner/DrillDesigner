import { Show } from "./Show";

export interface User {
  id: string;
  name: string;
  shows: { [showName: string]: Show };
  initialShowName: string;
}
