import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {FriendNearbyComponent} from "./friend-relation/friend-nearby/friend-nearby.component";
import {NewsfeedComponent} from "./newsfeed/newsfeed.component";
import {FriendRequestComponent} from "./friend-relation/friend-request/friend-request.component";
import {ListFriendComponent} from "./friend-relation/list-friend/list-friend.component";
import {EditPasswordComponent} from "./edit-password/edit-password.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {NewsfeedDetailComponent} from "./newsfeed-detail/newsfeed-detail.component";
import {PeopleDetailComponent} from "./people-detail/people-detail.component";
import {TimelineAboutComponent} from "./user-detail/timeline-about/timeline-about.component";
import {TimelineFriendsComponent} from "./user-detail/timeline-friends/timeline-friends.component";

const routes: Routes = [
  {
    path: 'newsfeed',
    component: NewsfeedComponent,
    children: [{
      path: 'detail',
      component: NewsfeedDetailComponent
    }, {
      path: 'people-nearby',
      component: FriendNearbyComponent
    },
      {
        path: 'requests',
        component: FriendRequestComponent
      },
      {
        path: 'friends',
        component: ListFriendComponent
      }
    ]
  },
  {
    path: 'edit',
    component: EditProfileComponent
  },

  {
    path: '/listFriend',
    component: ListFriendComponent
  },

  {
    path: 'password',
    component: EditPasswordComponent
  },
  {
    path: 'user-detail',
    component: UserDetailComponent,
    children: [{
      path: 'timeline',
      component: TimelineAboutComponent
    },
      {
        path: 'timeline-friends',
        component: TimelineFriendsComponent
      }]
  },
  {
    path: 'people-detail/:id',
    component: PeopleDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
