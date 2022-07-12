import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = "http://localhost:8080/api/comments";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {
  }

  getAllComment(id: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(API_URL + `/allComment?id=${id}`);
  }

  getAll(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(API_URL + '/all');
  }
}
