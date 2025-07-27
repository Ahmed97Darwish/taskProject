import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../Interface/products';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(allProducts: Products[], searchTerm: string): Products[] {
    return allProducts.filter((p) => {
      return p.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

}
