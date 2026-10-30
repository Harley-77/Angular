import { IProduto } from "./produto.interface";

export interface IItemSacola {
  produto: IProduto; //é o produto em si que foi adicionado à sacola de compras.
  quantidade: number; // É q quantidade comprada do produto que foi adicionado à sacola de compras.
}