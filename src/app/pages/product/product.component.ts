import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {IProduct} from '../../interfaces/IProduct';

@Component({
  selector: 'app-update',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  productForm: FormGroup;
  tipo: string = "Añadir";

  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductService);
  router = inject(Router);


  constructor(){
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0.01)]),
      stock: new FormControl('', )
    }, []);
  }

  ngOnInit(): void{
    this.activatedRoute.params.subscribe(async (params: any) =>{
      if(params.id){
        //pedir product por id
        this.tipo = "Actualizar";
        const response = await this.productService.getById(params.id);

        this.productForm = new FormGroup({
          id: new FormControl(response.id, []),
          name: new FormControl(response.name, [Validators.required]),
          description: new FormControl(response.description, [Validators.required]),
          price: new FormControl(response.price, [Validators.required, Validators.min(0.01)]),
          stock: new FormControl(response.stock)
        }, []);
      }
    });
  }

  async getDataForm() {

    let product: IProduct = this.productForm.value;

    if(product.name != ''){

      if(product.id){
        //Actualizar
        const response = await this.productService.update(product);

        if (response.id) {
          alert(`El producto ${response.name} se ha actualizado correctamente`);
          this.router.navigate(['/home']);
        } else {
          alert(`Ha ocurrido un problema en la actualizacion`);
        }
      }
      else{
        //Insertar
        const response = await this.productService.insert(product);
        if(response.id){
          alert(`La producto ${response.name} se ha añadido correctamente`);
          this.router.navigate(['/home']);
        }
        else {
          alert(`Ha ocurrido un problema en la insercion`);
        }
      }
    }else{
      alert(`Debe de rellenar todos los campos`);
    }
  }

}
