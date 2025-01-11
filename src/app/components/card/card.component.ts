import {Component, Input} from '@angular/core';
import {IProduct} from '../../interfaces/IProduct';
import {ButtonsComponent} from '../buttons/buttons.component';

@Component({
  selector: 'app-card',
  imports: [
    ButtonsComponent
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() myProduct!: IProduct;
}
