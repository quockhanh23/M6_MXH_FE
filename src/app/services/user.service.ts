import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "../models/user";

const API_URL = environment.apiUrl;
const API_LOGIN = "http://localhost:8080/api/users"
const API_ALL_USER = "http://localhost:8080/api/allUser"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  listUser(idUser: any): Observable<User[]> {
    return this.http.get<User[]>(API_URL + '/allUser');
  }

  allUser(): Observable<User[]> {
    return this.http.get<User[]>(API_ALL_USER)
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(API_URL + '/register', user);
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(API_LOGIN + '/login', user);
  }

  matchPassword(user: User): Observable<User> {
    return this.http.post<User>(API_URL + '/matchPassword', user);
  }

  userDetail(id: string): Observable<User> {
    return this.http.get<User>(API_URL + `/users/${id}`);
  }

  getUserProfile(id: string): Observable<User> {
    return this.http.get<User>(API_URL + `/users/${id}`);
  }

  updateUserProfile(id: number, user: User): Observable<User> {
    return this.http.put<User>(API_URL + `/users/${id}`, user);
  }
}
