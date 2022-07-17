import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ShortNews} from "../../../models/short-news";
import {ShortNewService} from "../../../services/short-new.service";

@Component({
  selector: 'app-short-new',
  templateUrl: './short-new.component.html',
  styleUrls: ['./short-new.component.css']
})
export class ShortNewComponent implements OnInit {
  idUserLogIn = localStorage.getItem("USERID")
  shortNew?: ShortNews[]
  shortNew2?: ShortNews[]
  count = 0;

  constructor(private userService: UserService,
              private shortNewService: ShortNewService) {
  }

  ngOnInit(): void {
    this.allShortNews()
  }

  newDay() {
    this.shortNewService.newDay().subscribe(rs => {
      this.shortNew = rs
    })
  }

  allShortNews() {
    this.shortNewService.allShortNews().subscribe(rs => {
      this.count = rs.length
      this.shortNew2 = rs
    })
  }
}
