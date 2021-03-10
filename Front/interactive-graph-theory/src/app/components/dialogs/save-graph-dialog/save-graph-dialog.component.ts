import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-save-graph-dialog',
  templateUrl: './save-graph-dialog.component.html',
  styleUrls: ['./save-graph-dialog.component.css']
})
export class SaveGraphDialogComponent implements OnInit {

  form: FormGroup

  graphNameField: FormControl

  constructor(
    public dialogRef: MatDialogRef<SaveGraphDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {name: string}) {
      this.graphNameField = new FormControl('', [Validators.required])

      this.form = new FormGroup({
        name: this.graphNameField
      })
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.data.name = this.graphNameField.value
    this.dialogRef.close(this.data);
  }

}
