import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ShortNews} from "../models/short-news";

const API_URL = "http://localhost:8080/api/news";

@Injectable({
  providedIn: 'root'
})
export class ShortNewService {

  constructor(private httpClient: HttpClient) {
  }

  newDay(): Observable<ShortNews[]> {
    return this.httpClient.get<ShortNews[]>(API_URL + '/newDay')
  }

  allShortNews(): Observable<ShortNews[]> {
    return this.httpClient.get<ShortNews[]>(API_URL + '/allShortNews')
  }

}
