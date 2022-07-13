import {User} from "./user";

export interface Post2 {
  id?: string
  content?: string
  status?: string
  user?: User
  createAt?: string
  numberLike?: string;
  numberDisLike?: string;
  comment?: Comment
  image?: string
}
