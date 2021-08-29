import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { NotficationService } from '../../shared/notfication.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  //[x: string]: any;
  //notficationService: any;

  constructor( public service : UserService,
    public notificationService: NotficationService,
    public dialogRef: MatDialogRef<UserComponent>) { }
  maxDate =  new Date(new Date().setDate(new Date().getDate()-1));

  bloodGroups = [
    {id: 1, value: 'B+'},
    {id: 2, value: 'B-'},
    {id: 3, value: 'A+'},
    {id: 4, value: 'A-'},
    {id: 5, value: 'AB+'},
    {id: 6, value: 'AB-'},
    {id: 7, value: 'O+'},
    {id: 8, value: 'O-'}
  ];

  genders = [
    {id: 1, value: 'Male'},
    {id: 2, value: 'Female'},
    {id: 3, value: 'Others'},
  ];

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit(){
    if(this.service.form.valid){
      if(!this.service.form.get('$key').value)
        this.service.insertUser(this.service.form.value);
      else
        this.service.updateUser(this.service.form.value);
      this.service.insertUser(this.service.form.value);
      //console.log(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success('Submitted Sucessfully');
      this.onClose();
    }
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

  ngOnInit() {
    this.service.getUsers();
  }
}
