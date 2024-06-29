import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  authService = inject(AuthService);
  isLoggedIn: boolean = false;

  ProductArray : any[] = [];
  currentProductID = "";
  product: string ="";
  cost: number = 0;
  description: string ="";
  quantity: number = 0;
  
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
    this.http.get("http://localhost:3000/api/products")
    .subscribe((resultData: any)=>
    {
       
        console.log(resultData);
        this.ProductArray = resultData.data;
    });
  }
  setUpdate(data: any) 
  {
   this.product = data.product;
   this.cost = data.cost;
   this.description = data.description;
   this.quantity = data.quantity;
   this.currentProductID = data._id;
  
  }
  UpdateRecords()
  {
    let bodyData = {
      "product" : this.product,
      "cost" : this.cost,
      "description" : this.description,
      "quantity" : this.quantity
    };
    
    this.http.patch("http://localhost:3000/api/products"+ "/"+this.product,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("User Updated")
        this.getAllUsers();
      
    });
  }
  
  setDelete(data: any) {
    this.http.delete("http://localhost:3000/api/products"+ "/"+ data.product).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Product Deleted")
        this.getAllUsers();
   
    });
    }
    
  save()
  {
    if(this.currentProductID == '')
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
      "product" : this.product,
      "cost" : this.cost,
      "description" : this.description,
      "quantity" : this.quantity
  };
    this.http.post("http://localhost:3000/api/products",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Product Registered Successfully")
         //this.getAllEmployee();
        this.product = '';
        this.cost = 0;
        this.description = '';
        this.quantity = 0;
        this.getAllUsers();
    });
  }
}

