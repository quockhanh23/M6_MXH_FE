import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {finalize, Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  selectedFile: File | null = null
  fb: any = null;
  fb1: any = null;
  downloadURL: Observable<string> | undefined;
  downloadURL1: Observable<string> | undefined;
  currentUser: any
  avatar: string = "";
  cover: string = "";
  url: string = "null";
  updateForm = new FormGroup({
    phone: new FormControl('', [Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
    fullName: new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+)$/i')]),
    address: new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+)$/i')]),
    favorite: new FormControl('', [Validators.required])
  });

  constructor(private router: Router,
              private userService: UserService,
              private storage: AngularFireStorage) {
    if (localStorage.getItem('currentUser') == null) {
      this.router.navigate([''])
    }
    // @ts-ignore
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.userService.getUserProfile(this.currentUser.id).subscribe(result => {
      this.currentUser = result;
      this.avatar = this.currentUser.avatar;
      this.cover = this.currentUser.cover;
      this.updateForm = new FormGroup({
        phone: new FormControl(this.currentUser.phone, [Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
        fullName: new FormControl(this.currentUser.fullName, [Validators.required]),
        address: new FormControl(this.currentUser.address, [Validators.required]),
        favorite: new FormControl(this.currentUser.favorite)
      });
    }, error => {
      console.log(error);
    })
  }

  ngOnInit(): void {

  }

  update(): void {
    this.currentUser.fullName = this.updateForm.value.fullName
    this.currentUser.phone = this.updateForm.value.phone
    this.currentUser.address = this.updateForm.value.address
    this.currentUser.favorite = this.updateForm.value.favorite
    if (this.fb != null) {
      this.currentUser.avatar = this.fb
    }
    if (this.fb1 != null) {
      this.currentUser.cover = this.fb1
    }
    this.userService.updateUserProfile(this.currentUser.id, this.currentUser).subscribe(result1 => {
      console.log("sửa thành công")
      this.router.navigate(['user/user-detail/timeline'])
    }, error => {
      console.log(error)
    });
    this.updateForm.reset();
  }

  onFileSelected(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/'])
  }

  onFileSelected1(event: any) {
    var n1 = Date.now();
    const file1 = event.target.files[0];
    const filePath1 = `RoomsImages/${n1}`;
    const fileRef1 = this.storage.ref(filePath1);
    const task1 = this.storage.upload(`RoomsImages/${n1}`, file1);
    task1
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL1 = fileRef1.getDownloadURL();
          this.downloadURL1.subscribe(url => {
            if (url) {
              this.fb1 = url;
            }
            console.log(this.fb1);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }
}
