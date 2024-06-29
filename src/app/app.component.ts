import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { UserUpdateComponent } from './components/users/user-update.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RegisterComponent,LoginComponent,UserUpdateComponent,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  authService = inject(AuthService);
  isLoggedIn : boolean = this.authService.isLoggedIn();
  title = 'LastProjectFront';

  logout(){
    localStorage.removeItem("your_token");
    alert("You have loggedOut")
  }
}
