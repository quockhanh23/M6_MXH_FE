import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post2} from "../models/post2";
import {LikePost} from "../models/likePost";

const API_URL = "http://localhost:8080/api/refs";

@Injectable({
  providedIn: 'root'
})
export class LikePostService {

  constructor(private httpClient: HttpClient) {
  }

  getAllLike(idPost: string): Observable<Post2[]> {
    return this.httpClient.get<Post2[]>(API_URL + `/getAllLike?id=${idPost}`);
  }

  create(likePost: LikePost, idPost: string, idUser: string): Observable<LikePost> {
    return this.httpClient.post<LikePost>(API_URL + `/createLike?idPost=${idPost}&idUser=${idUser}`, likePost);
  }

}
