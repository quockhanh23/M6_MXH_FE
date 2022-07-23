import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ShortNews} from "../../../models/short-news";
import {ShortNewService} from "../../../services/short-new.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-short-new',
  templateUrl: './short-new.component.html',
  styleUrls: ['./short-new.component.css']
})
export class ShortNewComponent implements OnInit {
  idUserLogIn = localStorage.getItem("USERID")
  shortNew?: ShortNews[]
  shortNew2?: ShortNews[]
  shortNew3?: ShortNews
  count = 0;

  shortNewForm: FormGroup = new FormGroup({
    content: new FormControl("",),
    image: new FormControl("",)
  })

  constructor(private userService: UserService,
              private shortNewService: ShortNewService) {
  }

  ngOnInit(): void {
    this.newDay()
    this.allShortNews()
  }

  newDay() {
    this.shortNewService.newDay().subscribe(rs => {
      this.shortNew = rs
    })
  }

  allShortNews() {
    console.log("vào hàm allShortNews")
    this.shortNewService.allShortNews().subscribe(rs => {
      this.count = rs.length
      this.shortNew2 = rs
      console.log("Kiểu dữ liệu: " + JSON.stringify(rs))
    })
  }

  createShortNew() {
    console.log("vào hàm createShortNew")
    const newShort = {
      content: this.shortNewForm.value.content,
      image: this.shortNewForm.value.image,
      user: {
        id: this.idUserLogIn
      }
    }

    console.log(newShort)
    // @ts-ignore
    this.shortNewService.createShortNew(newShort, this.idUserLogIn).subscribe(rs => {
      this.shortNew3 = rs
      this.ngOnInit()
    }, error => {
      console.log("Lỗi: " + error)
    })
  }
}
