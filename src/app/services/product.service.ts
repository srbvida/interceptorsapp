import { HttpClient } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {IProduct} from '../interfaces/IProduct';
import {lastValueFrom, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpClient = inject(HttpClient);
  private baseUrl :string = 'http://localhost:8080/api';

  constructor() {  }



  getAll() : Promise<IProduct[]> {
    return lastValueFrom(this.httpClient.get<IProduct[]>(`${this.baseUrl}/products`));
  }

  getById(id: string): Promise<IProduct> {
    return lastValueFrom(this.httpClient.get<IProduct>(`${this.baseUrl}/products/${id}`));
  }


  insert(product: IProduct): Promise<IProduct>{
    return lastValueFrom(this.httpClient.post<IProduct>(`${this.baseUrl}/product`, product));
  }

  update(product: IProduct): Promise<IProduct>{
    return lastValueFrom(this.httpClient.put<IProduct>(`${this.baseUrl}/product`, product));
  }

  delete(id: number) : Promise<IProduct>{
    return lastValueFrom(this.httpClient.delete<IProduct>(`${this.baseUrl}/product/${id}`));
  }
}
