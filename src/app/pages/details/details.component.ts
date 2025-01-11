import {Component, inject} from '@angular/core';
import {IProduct} from '../../interfaces/IProduct';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {ButtonsComponent} from '../../components/buttons/buttons.component';

@Component({
  selector: 'app-details',
  imports: [
    ButtonsComponent
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductService);

  myProduct!: IProduct;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( async (params: any) => {
      let id : string = params.id as string;

      try{
        this.myProduct = await this.productService.getById(id);
      }catch(err){
        console.log("Error al llamar a la API: "+err);
      }
    });
  }
}
