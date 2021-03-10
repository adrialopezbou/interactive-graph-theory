import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-signin-dialog',
  templateUrl: './signin-dialog.component.html',
  styleUrls: ['./signin-dialog.component.css']
})
export class SigninDialogComponent implements OnInit {

  form: FormGroup

  usernameField: FormControl

  passwordField: FormControl

  passwordCompareField: FormControl

  constructor(
    public dialogRef: MatDialogRef<SigninDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {username: string, password: string}) {
      this.usernameField = new FormControl('', [Validators.required])
      this.passwordField = new FormControl('', [Validators.required])
      this.passwordCompareField = new FormControl('', [Validators.required]) 

      this.form = new FormGroup({
        username: this.usernameField,
        password: this.passwordField,
        passwordCompare: this.passwordCompareField
      })
    }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.data.username = this.usernameField.value
    this.data.password = this.passwordField.value
    this.dialogRef.close(this.data);
  }

}
