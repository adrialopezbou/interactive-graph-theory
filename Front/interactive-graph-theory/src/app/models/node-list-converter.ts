import { AdjacentListItem } from "./adjacent-list-item"
import { AlgorithmProcessing } from "./algorithm-processing"
import { Node } from './node'

export class NodeListConverter {

  public static getAdjacencyList(nodeList: Node[]): Map<number, AdjacentListItem[]> {
    let g: Map<number, AdjacentListItem[]> = new Map()
    for(let node of nodeList) {
      let connections: AdjacentListItem[] = []
      for(let cnt of node.connectionList) {
        connections.push(new AdjacentListItem(cnt.id, 0))
      }
      g.set(node.id, connections)
    }
    return g
  }
  

  public static transformToDfs(nodeList: Node[]): any {
    let n: number = nodeList.length //Number of nodes in the graph
    let g: Map<number, AdjacentListItem[]> = new Map() //Adjacent list
    let visited: Map<number, boolean> = new Map() //Visited array
    let root: number = null

    for(let node of nodeList) {
      let connections: AdjacentListItem[] = []
      for(let cnt of node.connectionList) {
        connections.push(new AdjacentListItem(cnt.id, 0))
      }
      g.set(node.id, connections)
      visited.set(node.id, false)
      if(node.isRoot) {
        root = node.id
      }
    }

    console.log({
      n: n,
      g: g,
      visited: visited,
      root: root
    })

    return new AlgorithmProcessing(n, g, visited, root).processDfs()
  }
}
