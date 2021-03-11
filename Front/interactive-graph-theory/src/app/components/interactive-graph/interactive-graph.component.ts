import { Component, OnInit, ViewChild, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CdkDrag, CdkDragMove } from '@angular/cdk/drag-drop';
import { Node } from 'src/app/models/node'
import { GlobalConstants } from '../../common/global-constants'
import { GraphCanvasComponent } from '../graph-canvas/graph-canvas.component';
import { NodeListConverter } from 'src/app/models/node-list-converter';
import { AdjacentListItem } from 'src/app/models/adjacent-list-item';

@Component({
  selector: 'app-interactive-graph',
  templateUrl: './interactive-graph.component.html',
  styleUrls: ['./interactive-graph.component.css']
})
export class InteractiveGraphComponent implements OnInit {

  @ViewChild(GraphCanvasComponent) connectionCanvas: GraphCanvasComponent

  idCount: number = 0
  nodeList: Node[] = []

  adjacencyList: Map<number, AdjacentListItem[]> = new Map()

  nodeConnectionInfo: any = {
    isConnectingNodes : false
  }

  isPerformingSimulation: boolean = false

  isPerformingAutoSim: boolean = false

  nodeAnimationStatus: string[] = []

  nodeAnimationOrder: number[]

  animationStep: number = 0

  @Input()
  algthSelected: string

  @Output()
  adjacencyListEvent = new EventEmitter()

  @Output()
  visitedArrayEvent = new EventEmitter()

  @Output()
  autoSimulationEvent = new EventEmitter()

  @Output()
  simulationStoppedEvent = new EventEmitter()

  @Output()
  bfsQueueDataEvent = new EventEmitter()

  @Output()
  bfsQueueUpdateEvent = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
    this.loadGraph(GlobalConstants.defaultGraph)
    this.updateAdjacencyList()
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.algthSelected && changes.algthSelected.currentValue) {
      this.stopSim()
    }
  }

  startSim(): void {
    this.isPerformingSimulation = true
    switch(this.algthSelected) {
      case 'dfs': {
        this.nodeAnimationOrder = NodeListConverter.transformToDfs(this.nodeList)
        break
      }
      case 'bfs': {
        let result = NodeListConverter.transformToBfs(this.nodeList)
        this.nodeAnimationOrder = result.nodeOrder
        console.log(result)
        this.bfsQueueDataEvent.emit(result.queueOrder)
        break
      }
    }
    this.nodeAnimationStatus = new Array(this.nodeList.length).fill('')
    let id = this.nodeAnimationOrder[this.animationStep]
    let index = this.findNodeIndexById(id, this.nodeList)
    this.nodeAnimationStatus[index] = 'visiting'
    this.visitedArrayEvent.emit(index)
  }

  autoSim(): void {
    this.isPerformingAutoSim = true
    this.animationStep = 0
    this.nodeAnimationStatus = new Array(this.nodeList.length).fill('')
    let id = this.nodeAnimationOrder[this.animationStep]
    let index = this.findNodeIndexById(id, this.nodeList)
    this.nodeAnimationStatus[index] = 'visiting'
    this.simulationStoppedEvent.emit()
    this.visitedArrayEvent.emit(index)
    this.bfsQueueUpdateEvent.emit(0)
    this.autoSimulationEvent.emit(true);

    (async () => {
      for (let i=0; i<this.nodeAnimationOrder.length; i++) {
        await simStepTimeout(1000)
        if(this.isPerformingAutoSim) {
          this.nextAnimationState()
        } else {
          break;
        }
      }
    })()

    function simStepTimeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  }

  stopSim(): void {
    this.isPerformingSimulation = false
    this.isPerformingAutoSim = false
    this.nodeAnimationStatus = []
    this.animationStep = 0
    this.simulationStoppedEvent.emit()
    this.autoSimulationEvent.emit(false)
  }

  previousStep(): void {
    if(this.isPerformingAutoSim){
      this.isPerformingAutoSim = false
      this.autoSimulationEvent.emit(false)
    }
    this.previousAnimationState()
  }

  previousAnimationState(): void {
    if(this.animationStep != 0) {
      this.animationStep--
      let id = this.nodeAnimationOrder[this.animationStep]
      let index = this.findNodeIndexById(id, this.nodeList)
      this.nodeAnimationStatus[index] = 'visiting'
      let previousId = this.nodeAnimationOrder[this.animationStep + 1]
      let previousIndex = this.findNodeIndexById(previousId, this.nodeList)
      if(this.findConcurrences(this.animationStep, previousId, this.nodeAnimationOrder) > 0) { //Changes state if it is the first time the node is visited
        this.nodeAnimationStatus[previousIndex] = 'visited'
      } else {
        this.nodeAnimationStatus[previousIndex] = ''
        this.visitedArrayEvent.emit(previousIndex)
      }
      if(this.algthSelected === 'bfs') {
        this.bfsQueueUpdateEvent.emit(this.animationStep)
      }
    }
  }

  nextStep(): void {
    if(this.isPerformingAutoSim){
      this.isPerformingAutoSim = false
      this.autoSimulationEvent.emit(false)
    }
    this.nextAnimationState()
  }

  nextAnimationState(): void {
    if(this.animationStep < this.nodeAnimationOrder.length - 1) {
      this.animationStep++
      let id = this.nodeAnimationOrder[this.animationStep]
      let index = this.findNodeIndexById(id, this.nodeList)
      if(this.nodeAnimationStatus[index] === '') {
        this.visitedArrayEvent.emit(id)
      }
      this.nodeAnimationStatus[index] = 'visiting'
      let previousId = this.nodeAnimationOrder[this.animationStep - 1]
      let previousIndex = this.findNodeIndexById(previousId, this.nodeList)
      this.nodeAnimationStatus[previousIndex] = 'visited'
      if(this.algthSelected === 'bfs') {
        this.bfsQueueUpdateEvent.emit(this.animationStep)
      }
    } else {
      this.autoSimulationEvent.emit(false)
    }
  }

  findConcurrences(index: number, id: number, list: any[]): number {
    let count = 0
    for(let i=0; i<=index; i++) {
      if(list[i] === id) {
        count++
      }
    }
    return count
  }

  findNodeIndexById(id: number, nodeList: any[]): number {
    for(let i=0; i<nodeList.length; i++) {
      if(nodeList[i].id === id) {
        return i
      }
    }
    return null
  }

  onClickBoundary(event:MouseEvent): void {
    if(this.nodeConnectionInfo.isConnectingNodes) { //Making connection with another node
      this.nodeConnectionInfo = {
        isConnectingNodes : false
      }
      this.connectionCanvas.stopNodeConnection()
    } else { //New node created
      if(!this.isPerformingSimulation) {
        if(event.button === 0) {
          let elementClickedId: string = (event.target as Element).id
          if(elementClickedId === 'boundary') {
            let boundaryEl = document.getElementById('boundary').getBoundingClientRect()
            let firstNode = false
            if(this.nodeList.length === 0) {
              firstNode = true
            }
            this.nodeList.push(new Node(this.idCount, [], firstNode, {x: event.clientX - boundaryEl.left, y: event.clientY - boundaryEl.top}, 
              false))
            this.idCount++
            this.updateAdjacencyList()
          }
        }
      }
    }
  }
  
  loadInitialPosition(index: number): void {
    let node = document.getElementById('node' + index)
    let boundaryEl = document.getElementById('boundary').getBoundingClientRect()
    node.style.marginLeft = this.nodeList[index].initPos.x - GlobalConstants.nodeRadius + 'px'
    node.style.marginTop = this.nodeList[index].initPos.y - GlobalConstants.nodeRadius + 'px'
    this.nodeList[index].currentPos = {
      x: node.getBoundingClientRect().left + GlobalConstants.nodeRadius - boundaryEl.left,
      y: node.getBoundingClientRect().top + GlobalConstants.nodeRadius - boundaryEl.top
    }
  }

  onNodeMouseUp(index: number): void {
    if(this.nodeConnectionInfo.isConnectingNodes) { //Nodes added to both lists. May change depending on graph type
      let notConnected = this.nodeList[index].connectionList.filter(node => 
      node.id === this.nodeList[this.nodeConnectionInfo.index].id)
      if(notConnected.length == 0) { //Make connection only if they are not already connected
        this.nodeList[index].connectionList.push(this.nodeList[this.nodeConnectionInfo.index])
        this.nodeList[this.nodeConnectionInfo.index].connectionList.push(this.nodeList[index])
        this.updateAdjacencyList()
        }
      }
  }

  startNewConnection(index: number): void {
    this.nodeList[index].isConnecting = true
    this.nodeConnectionInfo = {
      isConnectingNodes: true,
      index: index
    }
  }

  setAsRoot(index: number): void {
    for(let node of this.nodeList) {
      if(node.isRoot) {
        node.isRoot = false
        break
      }
    }
    this.nodeList[index].isRoot = true
  }

  deleteNode(index: number): void {
    for(let i of this.nodeList[index].connectionList) {
      i.connectionList = i.connectionList.filter(node => 
        node.id !== this.nodeList[index].id)
    }
    this.nodeList.splice(index, 1)
    this.updateAdjacencyList()
  }

  onDrag(event: CdkDragMove, index: number): void {
     let nodeRect = event.source.element.nativeElement.getBoundingClientRect()
     this.nodeList[index].currentPos = {
       x: nodeRect.left + GlobalConstants.nodeRadius,
       y: nodeRect.top + GlobalConstants.nodeRadius
     }
  }

  public loadGraph(graph: any) {
    this.resetAnimation()
    let nodeList: Node[] = []
    let nodeMap = new Map<number, Node>()
    for(let node of graph.nodes) {
      let newNode = new Node(this.idCount, [], node.root, {x: node.xpos, y:node.ypos}, false)
      nodeMap.set(node.id, newNode)
      this.idCount++
    }
    for(let entry of nodeMap.entries()) {
      let node = entry[1]
      let connectionList: Node[] = []
      for(let connection of graph.nodes[this.findNodeIndexById(entry[0], graph.nodes)].connectionList) {
        connectionList.push(nodeMap.get(connection.endNode))  
      }
      node.connectionList = connectionList
      nodeList.push(node)
    }
    this.nodeList = nodeList
  }
  
  resetAnimation() {
    this.isPerformingSimulation = false
    this.nodeAnimationStatus = []
    this.nodeAnimationOrder = []
    this.animationStep = 0
  }

  public getNodeList(): Node[] {
    return this.nodeList
  }

  public setNodeList(nodeList: Node[]): void {
    this.nodeList = nodeList
    for(let i = 0; i < this.nodeList.length; i++) {
      this.loadInitialPosition(i)
    }
  }

  setIdCount(startingId: number) {
    this.idCount = startingId
  }

  updateAdjacencyList(): void {
    this.adjacencyList = NodeListConverter.getAdjacencyList(this.nodeList)
    let data: any = {
      adjacencyList: Array.from(this.adjacencyList.values())
    }
    this.adjacencyListEvent.emit(data)
  }

}
