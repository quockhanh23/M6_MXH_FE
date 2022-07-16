import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {FriendRelationService} from "../../../services/friend-relation.service";
import {FriendRelation} from "../../../models/friend-relation";

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

  idUserLogIn = localStorage.getItem("USERID")
  listFriend?: FriendRelation[];

  constructor(private userService: UserService,
              private friendRelationService: FriendRelationService,) {
  }

  ngOnInit(): void {
    this.getListFriends(this.idUserLogIn)

  }

  getListFriends(idUser: any) {

    console.log("Vào hàm getListFriends" + idUser)
    this.friendRelationService.listFriend(idUser).subscribe(rs => {
      this.listFriend = rs
      console.log("Oke" + rs)
    })
  }

}
