import { Component,inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { srvSacola } from '../../services/sacola';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-sacola',
  styleUrl: './sacola.scss',
  templateUrl: './sacola.html',
})
export class Carrinho {
  readonly cmpSacola = inject(srvSacola);
}



