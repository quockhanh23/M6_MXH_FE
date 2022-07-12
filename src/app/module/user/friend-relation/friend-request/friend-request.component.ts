import {Component, OnInit} from '@angular/core';
import {User} from "../../../../models/user";
import {FriendRelationService} from "../../../../services/friend-relation.service";
import {Router} from "@angular/router";
declare var $:any;
@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent implements OnInit {
  currentUser: string = "";
  idUser: string | undefined;
  listFriendRequest!: User[];
  usernameFriend: string | undefined;
  constructor(private friendRelationService: FriendRelationService,
              private router: Router) {
    // @ts-ignore
    this.currentUser = localStorage.getItem("currentUser")
    console.log(this.currentUser);
    this.idUser = JSON.parse(this.currentUser).id;
    console.log(this.idUser);
  }

  ngOnInit(): void {
    this.friendRelationService.findRequestById(this.idUser + "").subscribe(result => {
      this.listFriendRequest = result;
      console.log(result);
    }, error => {
      console.log(error)
    })
  }

  acceptFriend(idUserRequest: string | undefined, usernameFriend: string | undefined) {
    console.log(idUserRequest);
    this.usernameFriend = usernameFriend;
    // @ts-ignore
    this.friendRelationService.acceptFriend(this.idUser, idUserRequest).subscribe(() => {
      $('#confirmRequest').modal('show')
      setTimeout( () => {$('#confirmRequest').modal('hide');},3000);
      this.ngOnInit();
    });
  }

  deleteRequest(idUserRequest: string | undefined) {
    console.log(idUserRequest);
    // @ts-ignore
    this.friendRelationService.deleteRequest(this.idUser, idUserRequest).subscribe(() => {
      $('#deleteRequest').modal('show')
      setTimeout( () => {$('#deleteRequest').modal('hide');},3000);
      this.ngOnInit();
      // this.router.navigate(['user/requests']);
    });
  }
}
