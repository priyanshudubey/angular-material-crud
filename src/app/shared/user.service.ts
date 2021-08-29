import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public firebase: AngularFireDatabase, public datePipe: DatePipe) { }

  userList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key : new FormControl(null),
    name : new FormControl('', Validators.required),
    dob : new FormControl('', Validators.required),
    gender : new FormControl(''),
    birthPlace : new FormControl(''),
    bloodGroup : new FormControl(''),
    height : new FormControl(''),
    weight : new FormControl('')
  });

  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      name: '',
      dob: '',
      gender: '',
      birthPlace: '',
      bloodGroup: '',
      height: '',
      weight: ''
    });
  }
  getUsers(){
    this.userList = this.firebase.list('users');
    //this.userList = this.firebase.list('Systems')
    return this.userList.snapshotChanges();
  }

  insertUser(user){
    this.userList.push({
      name: user.name,
      dob : user.dob == "" ? "" : this.datePipe.transform(user.dob, 'yyyy-MM-dd'),
      gender : user.gender,
      birthPlace : user.birthPlace,
      bloodGroup : user.bloodGroup,
      height : user.height,
      weight : user.weight
    });
  }

  updateUser(user){
    this.userList.update(user.$key,
      {
        name: user.name,
        dob : user.dob == "" ? "" : this.datePipe.transform(user.dob, 'yyyy-MM-dd'),
        gender : user.gender,
        birthPlace : user.birthPlace,
        bloodGroup : user.bloodGroup,
        height : user.height,
        weight : user.weight
      });
  }

  deleteUser($key: string){
    this.userList.remove($key);
  }

  populateForm(user) {
    this.form.setValue(user);
  }

}

