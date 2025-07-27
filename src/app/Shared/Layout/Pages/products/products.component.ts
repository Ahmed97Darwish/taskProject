import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FlowbiteService } from '../../../Services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { isPlatformBrowser } from '@angular/common';
import { ProductsService } from '../../../Services/products.service';
import { Products } from '../../../Interface/products';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../Services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FilterPipe } from '../../../Pipes/filter.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, FilterPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  allProducts: Products[] = [];
  isLoading: boolean = false;
  filterTerm: string = "";
  
  constructor(private _ProductsService: ProductsService, private _ToastrService: ToastrService, private _Router: Router, private _CartService: CartService, private flowbiteService: FlowbiteService, @Inject(PLATFORM_ID) private x: object) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    if (typeof localStorage !== "undefined" ) {
      localStorage.setItem("currentPage", "/Products");
    }

    this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        // console.log(res);
        this.allProducts = res;
        // console.log(`${this.allProducts}`);
        
      },
      error: (err)=> {
        console.log(err);
      }
    });
  }


  addToCart(productID:number) {

    this.isLoading = true;

    this._CartService.addProductToCart(productID).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this._ToastrService.success("Items Added Successfully To Cart")
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        this._ToastrService.error(err.message)
      }
    });

  }

}