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
      console.log("L???i: " + error)
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

  // T???t c??? post
  allPostPublic() {
    console.log("v??o h??m allPostPublic")
    this.postService.AllPost().subscribe(rs => {
      console.log("All post: " + rs)
      this.post = rs
      console.log("Ki???u d??? li???u: " + JSON.stringify(rs))
      this.allComment()
    }, error => {
      console.log("L???i: " + error)
    })
  }

  // T???o, x??a like
  createLike(idPost: any) {
    console.log("v??o h??m createLike")
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
      console.log("L???i: " + error)
    })
  }

  // T???o, x??a dislike
  createDisLike(idPost: any) {
    console.log("v??o h??m createDisLike")
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
      console.log("L???i: " + error)
    })
  }

  // T???o, x??a th??? tim
  createHeart(idPost: any) {
    console.log("v??o h??m createHeart")
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
      console.log("L???i: " + error)
    })
  }

  // T???o post
  createPost(idUser: any) {
    console.log("v??o h??m createPost")
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
      console.log("L???i: " + error)
    })
  }

  // Hi???n th??? 10 ng?????i b??n ph???i
  allPeople() {
    this.userService.allUser().subscribe(rs => {
      this.users = rs
    }, error => {
      console.log("L???i: " + error)
    })
  }

  // Hi???n th??? t???t c??? comment c???a b??i vi???t
  allComment() {
    console.log("v??o h??m allComment")
    this.commentService.getAll().subscribe(rs => {
      // @ts-ignore
      this.comment = rs
      console.log("comment: " + rs)
    }, error => {
      console.log("L???i: " + error)
    })
  }

  // T???o comment
  createComment(idPost: any) {
    console.log("v??o h??m createComment")
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
      console.log("???? v??o")
      // @ts-ignore
      this.commentOne = rs
      console.log("???? v??o" + rs)
    }, error => {
      console.log("L???i: " + error)
    })
    this.ngOnInit()
  }

  createLikeComment(idComment: any) {
    console.log("v??o h??m createLikeComment")
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
      console.log("L???i: " + error)
    })
    this.ngOnInit()
  }

  createDisLikeComment(idComment: any) {
    console.log("v??o h??m createDisLikeComment")
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
      console.log("L???i: " + error)
    })
    this.ngOnInit()
  }

  sendRequestFriend(idUser: any, idFriends: any) {
    console.log("v??o h??m sendRequestFriend")
    this.friendRelationService.sendRequestFriend(idUser, idFriends).subscribe(rs => {
      console.log("ok sendRequestFriend")
      this.ngOnInit()
    })
  }

  getListFriends(idUser: any) {
    console.log("V??o h??m getListFriends" + idUser)
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
    console.log("V??o h??m allAnswerComment")
    this.answerCommentService.getAll().subscribe(rs => {
      this.answerComments = rs
      console.log("Oke")
    })
  }

  createAnswerComment(idComment: any) {
    console.log("v??o h??m createAnswerComment")
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
      console.log("???? v??o")
      // @ts-ignore
      this.commentOne = rs
      this.ngOnInit()
    }, error => {
      console.log("L???i: " + error)
    })
  }

  allFriend(idUser: any) {
    console.log("V??o h??m getListFriends" + idUser)
    this.friendRelationService.listFriend(idUser).subscribe(rs => {
      this.friendRelations3 = rs
      this.countFriend = rs.length
      console.log("Oke" + rs)
    })
  }

  checkComment() {
    this.checkOneComment = true;
  }

  deleteComment(idComment: any, idPost: any) {
    this.commentService.deleteComment(this.idUserLogIn,idComment, idPost).subscribe(rs => {
      this.ngOnInit()
    }, error => {
      console.log(error)
    })
  }
}
