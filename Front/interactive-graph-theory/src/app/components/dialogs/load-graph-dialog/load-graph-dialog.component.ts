import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-load-graph-dialog',
  templateUrl: './load-graph-dialog.component.html',
  styleUrls: ['./load-graph-dialog.component.css']
})
export class LoadGraphDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoadGraphDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {graphList: any[], id: number},
    private readonly databaseService: DatabaseService
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  selectGraph(index: number): void {
    console.log(index)
    this.data.id = this.data.graphList[index].id
    this.dialogRef.close(this.data)
  }

  deleteGraph(index: number): void {
    this.databaseService.deleteGraph(this.data.graphList[index].id).subscribe(result => {
      this.databaseService.getAllUserGraphs().subscribe(graphs => {
        let graphList = []
        for(let graph of graphs) {
          graphList.push({
            id: graph.id,
            name: graph.name,
          })
        }
        if(graphList.length === 0) {
          this.dialogRef.close()
        }
        this.data.graphList = graphList
        })
    })
    
  }

}
