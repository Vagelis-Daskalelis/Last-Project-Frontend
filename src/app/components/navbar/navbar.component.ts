import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  authService = inject(AuthService);
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.authService.isLogged.subscribe(res =>{
      this.isLoggedIn = this.authService.isLoggedIn();
    });
  }
  
  logout(){
    localStorage.removeItem("your_token");
    this.authService.isLogged.next(false);
    alert("You have loggedOut")
  }




}
