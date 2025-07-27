import { Routes } from '@angular/router';
import { HomeComponent } from './Shared/Layout/Pages/home/home.component';
import { NotFoundComponent } from './Shared/Layout/Additions/not-found/not-found.component';
import { ProductsComponent } from './Shared/Layout/Pages/products/products.component';
import { CartComponent } from './Shared/Layout/Pages/cart/cart.component';
import { ProductDetailsComponent } from './Shared/Layout/Additions/product-details/product-details.component';

export const routes: Routes = [
    {path: "", redirectTo: "Home", pathMatch: "full"},
    {path: "Home", component: HomeComponent, title: "Home"},
    {path: "Products", component: ProductsComponent, title: "Products"},
    {path: "productDetails/:productID", component: ProductDetailsComponent, title: "Products Details"},
    {path: "Cart", component: CartComponent, title: "Cart"},
    {path: "**", component: NotFoundComponent, title: "Not Found"},
];
