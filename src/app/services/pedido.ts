import { Service } from '@angular/core';
import { IPedido } from '../models/pedido.interface';

@Service()
export class Pedido {
    // Armazena o último pedido realizado, começando com null.
    private objPedidoFinalizado: IPedido | null = null;

    // Puxa os dados do último pedido e os guarda.
    mtdSalvarPedido(prmPedido: IPedido): void {
        this.objPedidoFinalizado = prmPedido;
    };

    // Retorna o último pedido realizado.
    mtdObterPedido(): IPedido | null {
        return this.objPedidoFinalizado;
    };
}
