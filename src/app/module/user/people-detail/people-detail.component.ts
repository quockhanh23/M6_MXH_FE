import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {FriendRelationService} from "../../../services/friend-relation.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.css']
})
export class PeopleDetailComponent implements OnInit {
  currentUser: any
  peopleDetail : any
  myAvatar: string = "";
  cover: string = "";
  url: string = "null";
  friendList : User[]|undefined;
  mutualFriend :User[]|undefined;
  constructor(private router: Router,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private friendRelationService: FriendRelationService
  ) {
    if (localStorage.getItem('currentUser') == null) {
      this.router.navigate([''])
    }
    // @ts-ignore
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.myAvatar = this.currentUser.avatar;
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const people = paramMap.get('id');
      this.userService.getUserProfile(people + "").subscribe(result => {
        // @ts-ignore
        this.peopleDetail = result;
        console.log(this.peopleDetail)
        this.cover=this.peopleDetail.cover;
        console.log(this.cover)
        this.friendRelationService.getAllFriend(this.peopleDetail.id+"").subscribe(result => {
          this.friendList = result
          console.log(this.friendList)
          this.friendRelationService.getListMutualFriend(this.currentUser.id+"",this.peopleDetail.id+"").subscribe(result => {
            this.mutualFriend = result
            console.log(this.mutualFriend)
          }, error => {
            console.log(error);
          })
        }, error => {
          console.log(error);
        })
      }, error => {
        console.log(error);
      })
    });
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/'])
  }

  ngOnInit(): void {
  }

}

