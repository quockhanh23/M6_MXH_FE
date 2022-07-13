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
import {DisLikePost} from "../../../models/dis-like-post";

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
  commentOne?: Comment
  disLikePost?: DisLikePost

  commentCreate: FormGroup = new FormGroup({
    content: new FormControl("",)
  })

  newPost: FormGroup = new FormGroup({
    content: new FormControl("",)
  })


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

  allPostPublic() {
    this.postService.AllPost().subscribe(rs => {
      console.log("All post" + rs)
      this.post = rs
      console.log(this.post)
      this.allComment()
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  createLike(idPost: any) {
    console.log("vào hàm like")
    const likePost = {
      userLike: {
        id: this.idUser
      },
      post: {
        id: idPost
      },
    }
    console.log(likePost)
    // @ts-ignore
    this.likePostService.createLike(likePost, idPost, this.idUser).subscribe(rs => {
      this.likePost = rs
      this.ngOnInit()
    })
  }

  createDisLike(idPost: any) {
    console.log("vào hàm DisLike")
    const disLikePost = {
      userLike: {
        id: this.idUser
      },
      post: {
        id: idPost
      },
    }
    console.log(disLikePost)
    // @ts-ignore
    this.likePostService.createDisLike(disLikePost, idPost, this.idUser).subscribe(rs => {
      this.disLikePost = rs
      console.log(rs)
      this.ngOnInit()
    })
  }

  createPost(idUser: any) {
    console.log("vào hàm createPost")
    const post1 = {
      content: this.newPost.value.content,
      user: {
        id: this.idUser
      },
    }
    console.log(post1)
    // @ts-ignore
    this.postService.createPost(post1, idUser).subscribe(rs => {
      this.post1 = rs
      console.log(rs)
      this.ngOnInit()
    })
  }

  allPeople() {
    this.userService.allUser().subscribe(rs => {
      this.users = rs
    }, error => {
      console.log(error)
    })
  }

  allComment() {
    console.log("vào hàm comment")
    this.commentService.getAll().subscribe(rs => {
      // @ts-ignore
      this.comment = rs
      console.log("comment: " + rs)
    })
  }

  createComment(idPost: any) {
    console.log("vào hàm")
    const comment = {
      content: this.commentCreate.value.content,
      user: {
        id: this.idUser
      },
      post: {
        id: this.post?.length
      }
    }
    // @ts-ignore
    this.commentService.save(comment, this.idUser, idPost).subscribe(rs => {
      console.log("Đã vào")
      // @ts-ignore
      this.commentOne = rs
      console.log("Đã vào" + rs)
    })
    this.ngOnInit()
  }
}
