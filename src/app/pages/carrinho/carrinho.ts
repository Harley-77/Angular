import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Sacola } from '../../services/sacola';

@Component({
  selector: 'app-carrinho',
  imports: [AsyncPipe, CurrencyPipe], //pipe de moeda.
  styleUrl: './carrinho.scss',
  templateUrl: './carrinho.html',
})
export class Carrinho { // Declara e exporta a página da Sacola.
  readonly srvSacola = inject(Sacola); // Injeta o serviço da sacola pra ser utilizado pelo componente.
}



