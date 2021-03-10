import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Node } from 'src/app/models/node'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private userJwt: any = ''

  constructor(
    private http: HttpClient
  ) { }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Basic ' +
      btoa('username:password')); 
  }

  authenticate(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:8080/authenticate', {username: username, password: password})
  }

  storeUser(username: any, password: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/store-user', {username: username, password: password})
  }

  getGraph(id: number): Observable<any> {
    return this.http.get<any>('http://localhost:8081/get-graph/' + id, {headers:{'Authorization': 'Bearer ' + this.userJwt.jwt}})
  }

  getAllUserGraphs(): Observable<any> {
    return this.http.get<any>('http://localhost:8081/get-graphs', {headers:{'Authorization': 'Bearer ' + this.userJwt.jwt}})
  }

  storeGraph(graphName: string, paramsConfig: any, nodeList: Node[]): void {
    if(this.userJwt !== '') {
      let list = []
      for(let node of nodeList) {
        let connectionList = []
        for(let connection of node.connectionList) {
          connectionList.push(connection.id)
        }
        let dto = {
          id: node.id,
          isRoot: node.isRoot,
          xPos: node.currentPos.x,
          yPos: node.currentPos.y,
          connections: connectionList
        }
        list.push(dto)
      }
      this.http.post<any>('http://localhost:8081/store-graph', {
        name: graphName,
        directed: paramsConfig.directed,
        weighted: paramsConfig.weighted,
        binaryTree: paramsConfig.binaryTree,
        nodeDtos: list
      }, {headers:{'Authorization': 'Bearer ' + this.userJwt.jwt}}).subscribe()
    } else {
      alert('Please Log In to save your graph.')
    }
    
  }

  deleteGraph(id: any): Observable<any> {
    return this.http.delete<any>('http://localhost:8081/delete-graph/' + id, {headers:{'Authorization': 'Bearer ' + this.userJwt.jwt}})
  }

  setUserJwt(jwt: string): void {
    this.userJwt = jwt
  }

}
