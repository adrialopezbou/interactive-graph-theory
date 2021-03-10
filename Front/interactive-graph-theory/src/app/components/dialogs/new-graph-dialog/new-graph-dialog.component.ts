import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-graph-dialog',
  templateUrl: './new-graph-dialog.component.html',
  styleUrls: ['./new-graph-dialog.component.css']
})
export class NewGraphDialogComponent implements OnInit {

  direction: string = 'undirected'
  weight: string = 'unweighted'
  connections: string = 'none'

  constructor(
    public dialogRef: MatDialogRef<NewGraphDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      directed: boolean,
      weighted: boolean,
      binaryTree: boolean
    }) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if(this.direction === 'directed') {
      this.data.directed = true
    } else {
      this.data.directed = false
    }

    if(this.weight === 'weighted') {
      this.data.weighted = true
    } else {
      this.data.weighted = false
    }

    if(this.connections === 'binary') {
      this.data.binaryTree = true
    } else {
      this.data.binaryTree = false
    }
    this.dialogRef.close(this.data);
  }

}
