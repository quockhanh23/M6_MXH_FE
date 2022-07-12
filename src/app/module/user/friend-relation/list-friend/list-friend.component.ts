import {Component, OnInit} from '@angular/core';
import {User} from "../../../../models/user";
import {FriendRelationService} from "../../../../services/friend-relation.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-list-friend',
  templateUrl: './list-friend.component.html',
  styleUrls: ['./list-friend.component.css']
})
export class ListFriendComponent implements OnInit {
  currentUser: string = "";
  idUser: string | undefined;
  listFriend!: User[];
  usernameFriend: string | undefined;

  constructor(private friendRelationService: FriendRelationService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    // @ts-ignore
    this.currentUser = localStorage.getItem("currentUser")
    console.log(this.currentUser);
    this.idUser = JSON.parse(this.currentUser).id;
    console.log(this.idUser);
  }

  ngOnInit(): void {
    this.friendRelationService.getAllFriend(this.idUser + "").subscribe(result => {
      this.listFriend = result;
      console.log(result);
    }, error => {
      console.log(error)
    });
  }

  cancelRelationship(idFriend: string | undefined, username: string | undefined) {
    this.usernameFriend = username;
    // @ts-ignore
    this.friendRelationService.unFriend(this.idUser, idFriend).subscribe(() => {
      $('#unFriendSuccess').modal('show')
      setTimeout(() => {
        $('#unFriendSuccess').modal('hide');
      }, 3000);
      this.ngOnInit();
      // this.router.navigate(['user/friends']);
    });
  }
}


