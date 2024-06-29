import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  registerForm !: FormGroup;
  loginForm !: FormGroup;
  isLoggedIn : boolean = this.authService.isLoggedIn();

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['',Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
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
    this.authService.loginService(this.loginForm.value)
    .subscribe({
      next:(res)=>{
        alert("Login is Success");
        localStorage.setItem("your_token", res.data._id);
        //this.router.navigate
        this.loginForm.reset();
      },
      error:(err)=>{
        console.log(err);
        alert("Login Unsuccessful")
      }
    })
  }

  logout(){
    localStorage.removeItem("your_token");
  }
}
