import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as $ from 'jquery'
import * as slick from 'slick-carousel';
import { Node } from 'src/app/models/node'
import { DatabaseService } from 'src/app/services/database.service';
import { InteractiveGraphComponent } from '../interactive-graph/interactive-graph.component';
import { LoadGraphDialogComponent } from '../dialogs/load-graph-dialog/load-graph-dialog.component';
import { LoginDialogComponent } from '../dialogs/login-dialog/login-dialog.component';
import { SaveGraphDialogComponent } from '../dialogs/save-graph-dialog/save-graph-dialog.component'
import { NewGraphDialogComponent } from '../dialogs/new-graph-dialog/new-graph-dialog.component';
import { GlobalConstants } from 'src/app/common/global-constants';
import { SigninDialogComponent } from '../dialogs/signin-dialog/signin-dialog.component';
import { AdjacentListItem } from 'src/app/models/adjacent-list-item';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @ViewChild(InteractiveGraphComponent) interactiveGraph: InteractiveGraphComponent

  algthList: any[] = [
    {value: 'dfs', viewValue: 'Depth First Search'},
    {value: 'bfs', viewValue: 'Breath First Search'}
  ];

  algthSelected = 'dfs'

  /* slides = [
    {img: "https://via.placeholder.com/600.png/09f/fff"},
    {img: "https://via.placeholder.com/600.png/021/fff"},
    {img: "https://via.placeholder.com/600.png/321/fff"},
    {img: "https://via.placeholder.com/600.png/422/fff"},
    {img: "https://via.placeholder.com/600.png/654/fff"}
  ];
  slideConfig = {"slidesToShow": 4, "slidesToScroll": 4}; */

  graphName: string = ''

  graphList = []

  adjacencyListData = {
    adjacencyList : []
  }

  logged = false

  private username: string = ''
  private password: string = ''

  paramsConfig = {
    directed: false,
    weighted: false,
    binaryTree: false
  }

  configSelected = true //SEE IF THIS VARIABLE IS USEFUL

  constructor(
    private readonly databaseService: DatabaseService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void { 
  }

  getGraph(id: number) {
    this.databaseService.getGraph(id).subscribe(result => {
      this.paramsConfig.directed = result.directed
      this.paramsConfig.weighted = result.weighted
      this.paramsConfig.binaryTree = result.binaryTree
      this.interactiveGraph.loadGraph(result)
    })
  }

  getAllUserGraphs(): any {
    this.databaseService.getAllUserGraphs().subscribe(result => {
      let graphList = []
      for(let graph of result) {
        graphList.push({
          id: graph.id,
          name: graph.name,
        })
      }
      return graphList
    })
  }

  openSigninDialog(): void {
    const dialogRef = this.dialog.open(SigninDialogComponent, {
      data: {username: this.username, password: this.password}
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.databaseService.storeUser(result.username, result.password).subscribe(user => {
          if(user !== null) {
            this.databaseService.authenticate(result.username, result.password).subscribe(credentials => {
              this.username = result.username
              this.password = result.password
              this.logged = true
              alert("User created successfully.")
            })
          } else {
            alert("This username already exist.")
          }
        })
      }
    })

  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      data: {username: this.username, password: this.password}
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.username = result.username
        this.password = result.password
        this.logged = true
      }
    })
  }

  openNewGraphDialog(): void {
    const dialogRef = this.dialog.open(NewGraphDialogComponent, {
      data: {
        directed: this.paramsConfig.directed,
        weighted: this.paramsConfig.weighted,
        binaryTree: this.paramsConfig.binaryTree
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.paramsConfig.directed = result.directed
        this.paramsConfig.weighted = result.weighted
        this.paramsConfig.binaryTree = result.binaryTree
        this.configSelected = true 
        this.interactiveGraph.setNodeList([])
        this.algthSelected = ''
      }
    })
  }

  openSaveGraphDialog(): void {
    if(!this.logged) {
      alert('Please, log in to save your graph.')
    } else {
      if(this.interactiveGraph.getNodeList().length === 0) {
        alert('Please, insert at least one node to the graph before saving it.')
      } else {
        const dialogRef = this.dialog.open(SaveGraphDialogComponent, {
          data: {name: this.graphName}
        })
    
        dialogRef.afterClosed().subscribe(result => {
          if(result !== undefined) {
            this.graphName = result.name;
            this.storeGraph()
            alert('Graph saved successfully.')
          }
        })
      }
    }
  }
    

  openLoadGraphDialog(): void {
    if(!this.logged) {
      alert('Please log in to load your graphs')
    } else {
      this.databaseService.getAllUserGraphs().subscribe(result => {
        let graphList = []
        for(let graph of result) {
          graphList.push({
            id: graph.id,
            name: graph.name,
          })
        }
        if(graphList.length === 0){
          alert('You don\'t have any graphs saved')
        } else {
          const dialogRef = this.dialog.open(LoadGraphDialogComponent, {
            data: {graphList: graphList, id: undefined}
          });
      
          dialogRef.afterClosed().subscribe(result => {
            if(result !== undefined) {
              this.getGraph(result.id)
            }
          })
        }
      })
    }
    
  }

  storeGraph() {
    this.databaseService.storeGraph(this.graphName, this.paramsConfig, this.interactiveGraph.getNodeList())
  }

  updateAdjacencyList(data: any): void {
    this.adjacencyListData = data
  }

  getUsername(): string {
    return this.username
  }

  logOut(): void {
    this.databaseService.setUserJwt('')
    this.logged = false
  }
  
  /* addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }
  
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  
  slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  } */  

}
