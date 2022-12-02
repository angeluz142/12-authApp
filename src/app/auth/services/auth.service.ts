import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map,catchError,tap } from "rxjs/operators";
import { of, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '../interfacecs/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!:Usuario;

  get usuario(){
    return {... this._usuario};
  }

  constructor(private httpcli: HttpClient) {}



  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth`;
    const body = {email,password};

    return this.httpcli.post<AuthResponse>(url,body)
    .pipe(
      tap(resp => {
        if(resp.ok){
          localStorage.setItem('token',resp.token!);
          // this._usuario = {
          //   name:resp.name!,
          //   uid:resp.uid!,
          //   email:resp.email
          // }
        }
      }),
      map(resp => resp.ok),
      //catchError(err => of(false))
      catchError(err => of(err.error.msg))
    );
  }

  validarToken():Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`;

    const headers = new HttpHeaders()
    .set('x-token',localStorage.getItem('token') || '');
   
    return this.httpcli.get<AuthResponse>(url,{headers})
      .pipe(
        map(resp =>{
          console.log(resp);
          
          localStorage.setItem('token',resp.token!);
          this._usuario = {
            name:resp.name!,
            uid:resp.uid!,
            email:resp.email!
          }
          return resp.ok;
        }),
        catchError(err => of(false))
      );
  }

  logOut(){
    if(localStorage.getItem('token'))
      localStorage.removeItem('token');
  }

  newUser(email:string,name:string,password:string){

    const url = `${this.baseUrl}/auth/new`;
    const body = {email,name,password};

    return this.httpcli.post<AuthResponse>(url,body)
    .pipe(
      tap(resp => {
        if(resp.ok){
          localStorage.setItem('token',resp.token!);
          // this._usuario = {
          //   name:resp.name!,
          //   uid:resp.uid!
          // }
        }
      }),
      map(resp => resp.ok),
      catchError(err => of(err.error.msg))
    );
  }
}
