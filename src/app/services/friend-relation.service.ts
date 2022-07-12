import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {FriendRelation} from "../models/friend-relation";

const API_URL = "http://localhost:8080/api/friends";

@Injectable({
  providedIn: 'root'
})
export class FriendRelationService {
  constructor(private httpClient: HttpClient) {
  }

  getAllNotFriend(id: string): Observable<User[]> {
    return this.httpClient.get<User[]>(API_URL + `/notFriend/${id}`);
  }

  addFriend(idU: string, idFriend: string): Observable<any> {
    return this.httpClient.post<FriendRelation>(API_URL + `/${idU}/${idFriend}`, {});
  }

  findRequestById(idU: string): Observable<User[]> {
    return this.httpClient.get<User[]>(API_URL + `/friendRequest/${idU}`);
  }

  acceptFriend(idU: string, idRequest: string): Observable<FriendRelation> {
    return this.httpClient.get<FriendRelation>(API_URL + `/acceptance/${idU}/${idRequest}`);
  }

  deleteRequest(idU: string, idRequest: string): Observable<FriendRelation> {
    return this.httpClient.delete<FriendRelation>(API_URL + `/${idRequest}/${idU}`);
  }

  getAllFriend(idU: string): Observable<User[]> {
    return this.httpClient.get<User[]>(API_URL + `/${idU}`);
  }

  getListMutualFriend(idU: string, idPeople: string): Observable<User[]> {
    return this.httpClient.get<User[]>(API_URL + `/listMutualFriend/${idU}/${idPeople}`);
  }

  unFriend(idU: string, idFriend: string): Observable<FriendRelation> {
    return this.httpClient.delete<FriendRelation>(API_URL + `/${idFriend}/${idU}`);
  }
}
