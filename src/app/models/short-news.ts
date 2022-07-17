import {User} from "./user";

export interface ShortNews {
  id?: string
  content?: string
  createAt?: string
  expired?: string
  remaining?: string
  toDay?: string
  image?: string
  user?: User
}
