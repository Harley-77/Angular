import { ICheckout } from "./checkout.interface";
import { IItemSacola } from "./item-sacola.interface";

export IPedido { //COnstrói a interface do pedido
    cliente: ICheckout; // Dados do cliente informado no formulário do checkout.
    itens: IItemSacola; // Itens do carrinho;
    quantidadeTotal: number; // Quantidade total de itens do pedido;
    valorTotal: number; // Valor total do pedido;
}