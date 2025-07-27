import { Products } from './../../../Interface/products';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../Services/cart.service';
import { Cart } from '../../../Interface/cart';
import { log } from 'console';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  


  allCarts: any[] = [];


  constructor (private _CartService: CartService, private _ToastrService: ToastrService) {

  }

  ngOnInit(): void {
    if (typeof localStorage !== "undefined" ) {
      localStorage.setItem("currentPage", "/Cart")
    };

    this._CartService.getCartsWithProductDetails().subscribe({
      next: (res) => {
        this.allCarts = res;
        console.log(res);
        
      },

      error: (err) => {
        console.error(err);
      }
    })
  }




  removeProduct(productId: number) {

  }


  currentCount( productID: number, productCount: number) {

    this._CartService.updateProduct(productID, productCount).subscribe({
      next:  (res)=> { 
        console.log(res);
        // this.allCarts = res
        this._ToastrService.success("Item Updated Successfully");
      },
      error: (err) => { 
        console.log(err);
      }
    });
    
  }



  

  removeProductItem(productID: string) {
    this._CartService.removeProduct(productID).subscribe({
      next:  (res)=> { 
        console.log(res);
        this._ToastrService.error("Items Removed Successfully");
      },
      error: (err) => { 
        console.log(err);
      }
    });
  }




  clearAllCart() {
    this._CartService.clearCart().subscribe({
      next: (res)=> { 
        // console.log(res);
        this.allCarts = {} as any


        this._ToastrService.error("Cart Empty Successfully");
      },
      error: (err) => { 
        console.log(err);
      }
    })
  }


  
}
