import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';

const apiUrl = `http://localhost:3000/api/users`

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);
  isLogged = new BehaviorSubject<boolean>(false);

  registerService(registerObj: any){
    return this.http.post<any>(`${apiUrl}/`, registerObj);
  }

  loginService(loginObj: any){
    return this.http.post<any>(`${apiUrl}/login`, loginObj);
  }

  isLoggedIn(){
    return !!localStorage.getItem("your_token");
  }



  // logoutService(logoutObj : any){
  //   return this.http.post<any>(`${apiUrl}/logout`, logoutObj);
  // }

  // deleteStudent(username:string){
  //   return this.http.delete(`${apiUrl}`+"/"+ username);
  // }

}
