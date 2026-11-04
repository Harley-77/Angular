import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Sacola } from '../../services/sacola';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  imports: [AsyncPipe, CurrencyPipe, RouterLink], //pipe de moeda.
  styleUrl: './carrinho.scss',
  templateUrl: './carrinho.html',
})
export class Carrinho { // Declara e exporta a página da Sacola.
  readonly srvSacola = inject(Sacola); // Injeta o serviço da sacola pra ser utilizado pelo componente.
}



