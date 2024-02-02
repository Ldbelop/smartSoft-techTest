import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type JSONReturn = {
  body: string,
  id: string | number
}
@Injectable({
  providedIn: 'root'
})


export class CrudMethodService {
  constructor(
    private http: HttpClient
  ) { }

  headers: HttpHeaders = new HttpHeaders(
    {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  )
  url: string = 'https://jsonplaceholder.typicode.com/posts';

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/posts')
  }

  createUser(title: string, body: string): Observable<JSONReturn>{
    return this.http.post<JSONReturn>(this.url, { body: JSON.stringify({ title: title, body: body, userId: 1})})
  }

  editUser(title: string, body: string, id: number): Observable<JSONReturn>{
    return this.http.put<JSONReturn>(`${this.url}/${id}`, { headers: this.headers, body: JSON.stringify({ id: id,title: title, body: body, userId: 1})})
  }

  deleteUser(id: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`)
  }
}

export interface User{
  userId: number,
  id: number,
  title: string,
  body: string
}
