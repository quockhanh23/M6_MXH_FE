import {User} from "./user";
import {Post2} from "./post2";

export interface Like {
  id?: string
  user?: User
  post?: Post2
}
