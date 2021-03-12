import { AfterViewInit, Component, HostListener, Input, OnInit, ViewChild  } from '@angular/core';
import { Node } from '../../models/node';
import { GlobalConstants } from '../../common/global-constants'

@Component({
  selector: 'app-graph-canvas',
  templateUrl: './graph-canvas.component.html',
  styleUrls: ['./graph-canvas.component.css']
})
export class GraphCanvasComponent implements OnInit {

  @ViewChild('canvasRef', {static: false}) canvasRef: any

  public width = GlobalConstants.canvasWidth
  public height = GlobalConstants.canvasHeight

  private ctx: CanvasRenderingContext2D

  intervalId = setInterval(() => this.updateAllLineConnections(), 5)

  @Input()
  nodeConnectionInfo: any

  @Input()
  nodeList: Node[]

  @HostListener('document:mousemove', ['$event'])
  onMouseMove = (e: any) => {
    if(this.nodeConnectionInfo.isConnectingNodes) {
      if (e.target.id === 'boundary' || e.target.id.substring(0, 4) === 'node') {
        this.write(e)
      }
    }
  }

  constructor() { 

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.render()
  }



  private render(): any {
    const canvasEl = this.canvasRef.nativeElement
    this.ctx = canvasEl.getContext('2d')

    canvasEl.width = this.width
    canvasEl.height = this.height
  }

  private write(res): any {
    this.ctx.clearRect(0, 0, this.width, this.height)
    const canvasEl = this.canvasRef.nativeElement
    const canvasRect = canvasEl.getBoundingClientRect()
    const nodePos = {
      x: this.nodeList[this.nodeConnectionInfo.index].currentPos.x - 3, //Substracting panel radius
      y: this.nodeList[this.nodeConnectionInfo.index].currentPos.y - 3
    }
    const prevPos = {
      x: res.clientX - canvasRect.left,
      y: res.clientY - canvasRect.top
    }
    this.updateCurrentLineConnection(nodePos, prevPos)
    this.updateAllLineConnections()
  }

  private updateCurrentLineConnection(nodePos, prevPos) {
    this.ctx.globalCompositeOperation='destination-over'
    this.ctx.lineWidth = 2
    this.ctx.lineCap = 'square'
    this.ctx.beginPath()
    this.ctx.moveTo(nodePos.x, nodePos.y)
    this.ctx.lineTo(prevPos.x, prevPos.y)
    this.ctx.stroke()
    this.ctx.closePath()

    this.ctx.globalCompositeOperation = 'destination-out'
    this.ctx.arc(nodePos.x, nodePos.y, GlobalConstants.nodeRadius, 0, Math.PI * 2, true)
    this.ctx.fill()
  }

  private updateAllLineConnections() {
    if(!this.nodeConnectionInfo.isConnectingNodes) {
      this.ctx.clearRect(0, 0, this.width, this.height)
    }
    for(let start of this.nodeList) {
      for(let end of start.connectionList) {
        this.drawConnection(start.currentPos, end.currentPos)
      }
    }
  }

  private drawConnection(start: any, end: any) {
    const canvasRect = this.canvasRef.nativeElement.getBoundingClientRect()
    this.ctx.globalCompositeOperation='destination-over'
    this.ctx.lineWidth = 2
    this.ctx.lineCap = 'square'
    this.ctx.beginPath()
    this.ctx.moveTo(start.x - 3, start.y - 3) //Substracting panel radius
    this.ctx.lineTo(end.x - 3, end.y - 3)
    this.ctx.stroke()
    this.ctx.closePath()
  }

  public stopNodeConnection(): void {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

}
