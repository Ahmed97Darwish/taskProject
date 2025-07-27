import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { forkJoin, Observable, of, map } from 'rxjs';
import { Environment } from '../Base/Environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  myToken: any = localStorage.getItem("userToken");
  // myToken: any = {"myToken": localStorage.getItem("userToken")};

  constructor(private _HttpClient: HttpClient) { }
  // ngOnInit(): void {
  //   // throw new Error('Method not implemented.');
  // }


  addProductToCart(productID: number):Observable<any> {

    return this._HttpClient.post(`${Environment.baseUrl}/carts`, {
      "productID": productID
    }, 
    {
      headers: this.myToken
    });
     
  }


  updateProduct(productID: number, count: number):Observable<any> {

    return this._HttpClient.put(`${Environment.baseUrl}/carts/${productID}`, {
      "count":  count
    }, 
    {
      headers: this.myToken
    });

  }


  getCart(): Observable<any> {
    const cached = localStorage.getItem('cartData');
    if (cached) {
      return of(JSON.parse(cached)); // return data from localStorage
    }

    return this._HttpClient.get(`${Environment.baseUrl}/carts`).pipe(
      tap(data => {
        localStorage.setItem('cartData', JSON.stringify(data));
      })
    );
  }

  removeProduct(productID: string):Observable<any> {

    return this._HttpClient.delete(`${Environment.baseUrl}/carts/${productID}`, {
      headers: this.myToken
    });

  }


  clearCart():Observable<any> {

    return this._HttpClient.delete(`${Environment.baseUrl}/carts/`, {
      headers: this.myToken
    });

  }

  getCartsWithProductDetails(): Observable<any[]> {
    return forkJoin({


        carts: this._HttpClient.get<any[]>(`${Environment.baseUrl}/carts`),
        products: this._HttpClient.get<any[]>(`${Environment.baseUrl}/products`)



      }).pipe(
          map(({ carts, products }) => {
            return carts.map(cart => ({
              ...cart,
              products: cart.products.map((cp: { productId: number; quantity: number; }) => {
                  const product = products.find(p => p.id === cp.productId);
                  return {
                    id: product?.id,
                    title: product?.title,
                    image: product?.image,
                    price: product?.price,
                    quantity: cp.quantity
                  };
              })
            }));
      })
    );
  }




}
