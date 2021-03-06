import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {FriendNearbyComponent} from './friend-relation/friend-nearby/friend-nearby.component';
import {NewsfeedComponent} from './newsfeed/newsfeed.component';
import {FriendRequestComponent} from "./friend-relation/friend-request/friend-request.component";
import {ListFriendComponent} from './friend-relation/list-friend/list-friend.component';
import {EditPasswordComponent} from './edit-password/edit-password.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {PeopleDetailComponent} from './people-detail/people-detail.component';
import {NewsfeedDetailComponent} from './newsfeed-detail/newsfeed-detail.component';
import {TimelineAboutComponent} from './user-detail/timeline-about/timeline-about.component';
import {TimelineFriendsComponent} from './user-detail/timeline-friends/timeline-friends.component';
import {MyPostComponent} from './my-post/my-post.component';
import {FriendListComponent} from "./friend-list/friend-list.component";
import {ShortNewComponent} from "./short-new/short-new.component";
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    EditProfileComponent,
    EditPasswordComponent,
    FriendNearbyComponent,
    NewsfeedComponent,
    FriendRequestComponent,
    ListFriendComponent,
    UserDetailComponent,
    PeopleDetailComponent,
    NewsfeedDetailComponent,
    TimelineAboutComponent,
    TimelineFriendsComponent,
    MyPostComponent,
    FriendListComponent,
    ShortNewComponent
  ],
  exports: [
    EditProfileComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbTooltipModule
    ]
})
export class UserModule {
}
