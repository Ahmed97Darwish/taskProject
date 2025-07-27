import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../Services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../../Interface/products';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../Services/cart.service';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  productID!: string;
  productDetails!: Products;
  stars: number[] = [1, 2, 3, 4, 5];

  constructor (private _ProductsService: ProductsService, private _CartService: CartService, private _ActivatedRoute: ActivatedRoute, private _ToastrService: ToastrService) {}
  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next: (res: any) => {
        // console.log(res.params.productID);
        this.productID = res.params.productID;
        return this._ProductsService.getSpecProducts(this.productID).subscribe({
          next: (res) => {
            // console.log(res);
            this.productDetails = res;
            // console.log(this.productDetails);
            // this._ToastrService.success("Success");
          },
          error (err) {
            console.log(err);
            
          }
        });
      }
    });

  }


  addToCart(productID:number) {

    this._CartService.addProductToCart(productID).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success("Items Added Successfully To Cart")
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error(err.message)
      }

    });
  }

}
