import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {FriendRelationService} from "../../../services/friend-relation.service";
import {Router} from "@angular/router";
import {PostService} from "../../../services/post.service";
import {Post2} from "../../../models/post2";
import {LikePost} from "../../../models/likePost";
import {CommentService} from "../../../services/comment.service";
import {Comment} from "../../../models/comment";
import {LikePostService} from "../../../services/likePost.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  currentUser: string = "";
  idUser: string | undefined;
  idUserLogIn = localStorage.getItem("USERID")
  userDetail!: User;
  listFriend!: User[];
  users!: User[];
  post?: Post2[]
  post1?: Post2
  like?: LikePost[]
  likePost?: LikePost
  comment?: Comment[]

  createForm: FormGroup = new FormGroup({})


  constructor(private userService: UserService,
              private friendRelationService: FriendRelationService,
              private commentService: CommentService,
              private likePostService: LikePostService,
              private router: Router,
              private postService: PostService) {
    // @ts-ignore
    this.currentUser = localStorage.getItem("currentUser")
    console.log(this.currentUser);
    this.idUser = JSON.parse(this.currentUser).id;
    console.log(this.idUser);
  }

  ngOnInit(): void {
    this.userService.userDetail(this.idUser + "").subscribe(result => {
      this.userDetail = result;
      console.log("User: " + result);
    }, error => {
      console.log(error)
    });
    this.friendRelationService.getAllFriend(this.idUser + "").subscribe(result => {
      this.listFriend = result;
      console.log(result);
    }, error => {
      console.log(error)
    })
    this.allPostPublic()
    this.allPeople()
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/'])
  }

  allPostPublic() {
    this.postService.AllPost().subscribe(rs => {
      console.log("All post" + rs)
      this.post = rs
      console.log(this.post)
    })
  }

  createLike() {
    const likePost = {
      userLike: {
        id: this.idUser
      },
      post: {
        id: this.post?.length
      },
    }
    // @ts-ignore
    this.likePostService.create(likePost, '', '').subscribe(rs => {
      this.likePost = rs
    })
  }

  allPeople() {
    this.userService.allUser().subscribe(rs => {
      this.users = rs
    }, error => {
      console.log(error)
    })
  }

}
