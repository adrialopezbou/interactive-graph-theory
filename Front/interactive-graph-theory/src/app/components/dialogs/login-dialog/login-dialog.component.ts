import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  form: FormGroup

  usernameField: FormControl
  passwordField: FormControl

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {username: string, password: string},
    private readonly databaseService: DatabaseService
  ) { 
    this.usernameField = new FormControl('', [Validators.required])
    this.passwordField = new FormControl('', [Validators.required])

    this.form = new FormGroup({
      username: this.usernameField,
      password: this.passwordField
    })
  }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe(event => {
      if(event.key === "Enter" && this.form.valid) {
        this.onSubmit()
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  onSubmit(): void {
    this.databaseService.authenticate(this.usernameField.value, this.passwordField.value).subscribe(result => {
      if(result !== null) {
        this.data.username = this.usernameField.value
        this.data.password = this.passwordField.value
        this.databaseService.setUserJwt(result, this.data.username)
        this.dialogRef.close(this.data)
      } else {
        alert('Username or password incorrect.')
      }
    })
    
  }

}
