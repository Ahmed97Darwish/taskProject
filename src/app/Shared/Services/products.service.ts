import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../Base/Environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  
 
  constructor( private _HttpClient: HttpClient) { 
    if (typeof localStorage !== "undefined") {
      if (localStorage.getItem("")!== null) {
        console.log("Test");
        
      }
    }
  }

  getAllProducts(): Observable<any>{
    return this._HttpClient.get(`${Environment.baseUrl}/products`);
  }

  getSpecProducts(productID: string): Observable<any>{
    return this._HttpClient.get(`${Environment.baseUrl}/products/${productID}`);
  }



}
