import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from '../Models/Product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Products';
  productList:Product[]=[]
  constructor(private http:HttpClient){

  }
  ngOnInit() {
  //  this.getAllProducts();
  }



  getAllProducts(){
    this.http.get("https://localhost:7294/api/Product").subscribe((res:any)=>{

      this.productList=res
    });
  }
}
