import {Component, inject, Input} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-buttons',
  imports: [
    RouterLink
  ],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {
  @Input() myId: number = 0;
  @Input() parent: string = "";

  productService = inject(ProductService);
  router = inject(Router);

  async removeProduct(id: number) :Promise<void> {
    let confirmation = confirm('Esta usted seguro que quiere borrar el producto: '+this.myId);
    if(confirmation){
      let response = await this.productService.delete(id);
      if(response.id){
        alert("Se ha borrado correctamente la serie "+response.name);
        if(this.parent == 'view'){
          this.router.navigate(['/home']);
        }
      }
    }
  }
}
