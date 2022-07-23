import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {FriendRelationService} from "../../../services/friend-relation.service";
import {Router} from "@angular/router";
import {PostService} from "../../../services/post.service";
import {LikePost} from "../../../models/likePost";
import {CommentService} from "../../../services/comment.service";
import {Comment} from "../../../models/comment";
import {LikePostService} from "../../../services/likePost.service";
import {FormControl, FormGroup} from "@angular/forms";
import {DisLikePost} from "../../../models/dis-like-post";
import {IconHeart} from "../../../models/icon-heart";
import {LikeCommentService} from "../../../services/like-comment.service";
import {LikeComment} from "../../../models/like-comment";
import {DisLikeComment} from "../../../models/dis-like-comment";
import {FriendRelation} from "../../../models/friend-relation";
import {AnswerCommentService} from "../../../services/answer-comment.service";
import {AnswerComment} from "../../../models/answer-comment";
import {Post2} from "../../../models/post2";

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
  heart?: IconHeart
  commentLike?: LikeComment
  dislikeComment?: DisLikeComment
  friendRelations?: FriendRelation[];
  friendRelations2?: FriendRelation[];
  friendRelations3?: FriendRelation[];
  countFriend?: any
  answerComments?: AnswerComment[]
  check = true
  checkRequestFriend = false
  checkOneComment = false

  commentCreateForm: FormGroup = new FormGroup({
    content: new FormControl("",)
  })

  answerCommentsForm: FormGroup = new FormGroup({
    content: new FormControl("",)
  })

  newPostForm: FormGroup = new FormGroup({
    content: new FormControl("",)
  })

  constructor(private userService: UserService,
              private friendRelationService: FriendRelationService,
              private commentService: CommentService,
              private likePostService: LikePostService,
              private likeCommentService: LikeCommentService,
              private answerCommentService: AnswerCommentService,
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
      console.log("Lỗi: " + error)
    });
    this.friendRelationService.getAllFriend(this.idUser + "").subscribe(result => {
      this.listFriend = result;
      console.log(result);
    }, error => {
      console.log(error)
    })
    this.allPostPublic()
    this.allPeople()
    this.getListFriends(this.idUserLogIn)
    this.allAnswerComment()
    this.allFriend(this.idUserLogIn)
  }

  // Tất cả post
  allPostPublic() {
    console.log("vào hàm allPostPublic")
    this.postService.AllPost().subscribe(rs => {
      console.log("All post: " + rs)
      this.post = rs
      console.log("Kiểu dữ liệu: " + JSON.stringify(rs))
      this.allComment()
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  // Tạo, xóa like
  createLike(idPost: any) {
    console.log("vào hàm createLike")
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
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  // Tạo, xóa dislike
  createDisLike(idPost: any) {
    console.log("vào hàm createDisLike")
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
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  // Tạo, xóa thả tim
  createHeart(idPost: any) {
    console.log("vào hàm createHeart")
    const heart = {
      userLike: {
        id: this.idUser
      },
      post: {
        id: idPost
      },
    }
    console.log(heart)
    // @ts-ignore
    this.likePostService.createHeart(heart, idPost, this.idUser).subscribe(rs => {
      this.disLikePost = rs
      console.log(rs)
      this.ngOnInit()
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  // Tạo post
  createPost(idUser: any) {
    console.log("vào hàm createPost")
    const post1 = {
      content: this.newPostForm.value.content,
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
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  // Hiển thị 10 người bên phải
  allPeople() {
    this.userService.allUser().subscribe(rs => {
      this.users = rs
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  // Hiển thị tất cả comment của bài viết
  allComment() {
    console.log("vào hàm allComment")
    this.commentService.getAll().subscribe(rs => {
      // @ts-ignore
      this.comment = rs
      console.log("comment: " + rs)
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  // Tạo comment
  createComment(idPost: any) {
    console.log("vào hàm createComment")
    const comment = {
      content: this.commentCreateForm.value.content,
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
    }, error => {
      console.log("Lỗi: " + error)
    })
    this.ngOnInit()
  }

  createLikeComment(idComment: any) {
    console.log("vào hàm createLikeComment")
    const commentLike = {
      userLike: {
        id: this.idUser
      },
      comment: {
        id: idComment
      },
    }
    console.log(commentLike)
    // @ts-ignore
    this.likeCommentService.createLikeComment(commentLike, idComment, this.idUser).subscribe(rs => {
      this.disLikePost = rs
      console.log(rs)
      this.ngOnInit()
    }, error => {
      console.log("Lỗi: " + error)
    })
    this.ngOnInit()
  }

  createDisLikeComment(idComment: any) {
    console.log("vào hàm createDisLikeComment")
    const dislikeComment = {
      userLike: {
        id: this.idUser
      },
      comment: {
        id: idComment
      },
    }
    console.log(dislikeComment)
    // @ts-ignore
    this.likeCommentService.createDisLikeComment(dislikeComment, idComment, this.idUser).subscribe(rs => {
      this.disLikePost = rs
      console.log(rs)
      this.ngOnInit()
    }, error => {
      console.log("Lỗi: " + error)
    })
    this.ngOnInit()
  }

  sendRequestFriend(idUser: any, idFriends: any) {
    console.log("vào hàm sendRequestFriend")
    this.friendRelationService.sendRequestFriend(idUser, idFriends).subscribe(rs => {
      console.log("ok sendRequestFriend")
      this.ngOnInit()
    })
  }

  getListFriends(idUser: any) {
    console.log("Vào hàm getListFriends" + idUser)
    this.friendRelationService.listFriend(idUser).subscribe(rs => {
      this.friendRelations = rs
    })
  }

  getAllPeople() {
    this.friendRelationService.AllFriendRelation().subscribe(rs => {
      this.friendRelations2 = rs;
    })
  }

  allAnswerComment() {
    console.log("Vào hàm allAnswerComment")
    this.answerCommentService.getAll().subscribe(rs => {
      this.answerComments = rs
      console.log("Oke")
    })
  }

  createAnswerComment(idComment: any) {
    console.log("vào hàm createAnswerComment")
    const answerComment = {
      content: this.answerCommentsForm.value.content,
      user: {
        id: this.idUser
      },
      comment: {
        id: idComment
      }
    }
    // @ts-ignore
    this.answerCommentService.save(answerComment, this.idUser, idComment).subscribe(rs => {
      console.log("Đã vào")
      // @ts-ignore
      this.commentOne = rs
      this.ngOnInit()
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  allFriend(idUser: any) {
    console.log("Vào hàm getListFriends" + idUser)
    this.friendRelationService.listFriend(idUser).subscribe(rs => {
      this.friendRelations3 = rs
      this.countFriend = rs.length
      console.log("Oke" + rs)
    })
  }

  checkComment() {
    this.checkOneComment = true;
  }

}
