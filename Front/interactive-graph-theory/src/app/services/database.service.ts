import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Node } from 'src/app/models/node'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private userJwt: any = ''

  private username: string = ''

  private eventCallback = new Subject<string>(); 
  eventCallback$ = this.eventCallback.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  checkIfLogged(): string {
    if(localStorage.getItem("id_token") !== undefined) {
      this.userJwt = JSON.parse(localStorage.getItem("id_token"))
      this.username = localStorage.getItem("username")
      this.eventCallback.next(this.username);
      return this.username
    }
    return null
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Basic ' +
      btoa('username:password')); 
  }

  authenticate(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:8083/authenticate', {username: username, password: password})
  }

  logout() {
    localStorage.removeItem("id_token")
    localStorage.removeItem("username")
    this.userJwt = ''
    this.username = ''
  }

  storeUser(username: any, password: any): Observable<any> {
    return this.http.post<any>('http://localhost:8083/store-user', {username: username, password: password})
  }

  getGraph(id: number): Observable<any> {
    return this.http.get<any>('http://localhost:8083/get-graph/' + id, {headers:{'Authorization': 'Bearer ' + this.userJwt.jwt}})
  }

  getAllUserGraphs(): Observable<any> {
    console.log(this.userJwt)
    return this.http.get<any>('http://localhost:8083/get-graphs', {headers:{'Authorization': 'Bearer ' + this.userJwt.jwt}})
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
      this.http.post<any>('http://localhost:8083/store-graph', {
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
    return this.http.delete<any>('http://localhost:8083/delete-graph/' + id, {headers:{'Authorization': 'Bearer ' + this.userJwt.jwt}})
  }

  setUserJwt(jwt: string, username: string): void {
    localStorage.setItem('id_token', JSON.stringify(jwt))
    localStorage.setItem('username', username)
    this.userJwt = jwt
  }
}
