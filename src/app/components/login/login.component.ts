import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit{

  
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  registerForm !: FormGroup;
  loginForm !: FormGroup;
  isLoggedIn : boolean = this.authService.isLoggedIn();

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['',Validators.required],
      email: ['',Validators.compose([Validators.required,Validators.email])],
    })
  }


  register(){
    this.authService.registerService(this.registerForm.value)
    .subscribe({
      next:(res)=>{
        alert("User Created")
        this.registerForm.reset();
      },
      error:(err)=> {
        console.log(err)
        alert("User NOT created")
      }
    })
  }

  login(){
    if(this.isLoggedIn){alert("already logged")}else{
    this.authService.loginService(this.loginForm.value)
    .subscribe({
      next:(res)=>{
        alert("Login is Success");
        localStorage.setItem("your_token", res.token);
        this.authService.isLogged.next(true);
        this.loginForm.reset();
      },
      error:(err)=>{
        console.log(err);
        alert("Login Unsuccessful")
      }
    })}
  }

  logout(){
    localStorage.removeItem("your_token");
  }
}
