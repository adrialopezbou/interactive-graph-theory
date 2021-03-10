import { Injectable } from "@angular/core"
import { AdjacentListItem } from "./adjacent-list-item"

@Injectable()
export class AlgorithmProcessing {
    

    nodeOrder: number[] = []

    constructor(
        private _n: number,
        private _g: Map<number, AdjacentListItem[]>,
        private _visited: Map<number, boolean>,
        private _root: number
    ) { }

    ngOnInit(): void {
    }

    processDfs(): number[] {
        this.dfs(this.root)
        return this.nodeOrder
    }

    dfs(id: number): void{
        if(this.visited.get(id)) {
            return
        }
        this.nodeOrder.push(id)
        this.visited.set(id, true)
        let neighbours = this.g.get(id)
        for(let next of neighbours) {
            this.dfs(next.nodeId)
            if(this.nodeOrder[this.nodeOrder.length-1] !== id && !this.isAllVisited(this.visited)) {
                this.nodeOrder.push(id)
            }
        }
    }

    isAllVisited(visited: Map<number, boolean>): boolean {
        let allVisited = true
        visited.forEach((value: boolean, key: number) => {
            if(!value) {
                allVisited = false
            }
        })
        return allVisited
    }

    public get root(): number {
        return this._root
    }
    public set root(value: number) {
        this._root = value
    }
    public get visited(): Map<number, boolean> {
        return this._visited
    }
    public set visited(value: Map<number, boolean>) {
        this._visited = value
    }
    public get g(): Map<number, AdjacentListItem[]> {
        return this._g
    }
    public set g(value: Map<number, AdjacentListItem[]>) {
        this._g = value
    }
    public get n(): number {
        return this._n
    }
    public set n(value: number) {
        this._n = value
    }
}
