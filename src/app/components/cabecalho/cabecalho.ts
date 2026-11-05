import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Sacola } from '../../services/sacola';

@Component({
  selector: 'app-cabecalho',
  imports: [AsyncPipe,RouterLink,RouterLinkActive],
  styleUrl: './cabecalho.scss',
  templateUrl: './cabecalho.html',
})

export class Cabecalho { // Injeta o serviço da sacola para acessar o Observable
  readonly srvSacola = inject(Sacola); // responsável pela quantidade total de produtos.
}
