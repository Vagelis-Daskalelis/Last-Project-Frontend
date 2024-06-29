import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent implements OnInit{
  authService = inject(AuthService);
  isLoggedIn: boolean = false;

  UserArray : any[] = [];
  currentUserID = "";
  username: string ="";
  password: string ="";
  name: string="";
  surname: string="";
  email: string ="";
  
  constructor(private http: HttpClient ) 
  {
    this.getAllUsers();
  }


  ngOnInit(): void {
    this.authService.isLogged.subscribe(res =>{
      this.isLoggedIn = this.authService.isLoggedIn();
    });
  }


  getAllUsers() {
    this.http.get("http://localhost:3000/api/users")
    .subscribe((resultData: any)=>
    {
       
        console.log(resultData);
        this.UserArray = resultData.data;
    });
  }
  setUpdate(data: any) 
  {
   this.username = data.username;
   this.password = data.password;
   this.name = data.name;
   this.surname = data.surname;
   this.email = data.email;
   this.currentUserID = data._id;
  
  }
  UpdateRecords()
  {
    let bodyData = {
      "username" : this.username,
      "password" : this.password,
      "name" : this.name,
      "surname" : this.surname,
      "email" : this.email,
    };
    
    this.http.patch("http://localhost:3000/api/users"+ "/"+this.username,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("User Updated")
        this.getAllUsers();
      
    });
  }
  
  setDelete(data: any) {
    this.http.delete("http://localhost:3000/api/users"+ "/"+ data.username).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("User Deleted")
        this.getAllUsers();
   
    });
    }
    
  save()
  {
    if(this.currentUserID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }       
  }
register()
  {
    let bodyData = {
      "username" : this.username,
      "password" : this.password,
      "name" : this.name,
      "surname" : this.surname,
      "email" : this.email, 
  };
    this.http.post("http://localhost:3000/api/users",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("User Registered Successfully")
         //this.getAllEmployee();
        this.username = '';
        this.password = '';
        this.name = '';
        this.surname = '';
        this.email = '';
        this.getAllUsers();
    });
  }
}