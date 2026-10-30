import { Service, signal, computed } from '@angular/core';
import { IItemSacola } from '../models/item-sacola.interface';  // Importa a interfadfe que representa um item da sacola.
import { IProduto } from '../models/produto.interface';  // Importa a interface que representa um produto recebido da API.


@Service()  //Declara esta classe como um serviço do Angular.
export class srvSacola {
    private arrItensSacola = signal<IItemSacola[]>([]); // Porque usei o signal? com o signal, o angular passa a guardar não apnas o array com as informações, mas também passa a acompanhar as suas alterações. Sempre que o array for alterado, o angular vai atualizar a view automaticamente. Com isso a interface pode reagir às alterações da sacola de compras sem que seja necessário escrever código adicional para isso. -> Tradução: o signl diz que quero um estado reativo; esse estado armazenará um array de IItemSacola e o valor inicial será um array vazio []. É private pois apenos o próprio serviço pode alterar ele.

    readonly arrItensSacolaRO = this.arrItensSacola.asReadonly(); //aqui deixo o arry público par ser acessado por outros componentes

    // Cria um signal calculado com a quantidade total de itens na sacola.  Como depende de arritensSacola, sempre que a sacola mudar, o Angular recalcula automaticamente.
    readonly intQuantidadeTotal = computed (() =>
        this.arrItensSacola().reduce( // Pega o array atual armazenado no signal. O reduce() faz o angular percorfer todos o sitens e acumular suas quantidades.
            (prmTotal, prmItem) => // total é o valor acumulado até o ponto e item o item atual do array.
            prmTotal + prmItem.quantidade, // Soma  quantiade o item ao total acumulado.
            0 //define que o acumulado começa com zero
        ) // Calcula a quantidade total de itens na sacola somando as quantidades de cada item.
    );

    // Método que adiciona o produto clicado à sacola de compras.
    mtdAdicionarItem(prmProduto: IProduto, prmQuantidade: number): void { //prmProduto é o parametro de produto que queremos adicionar e prmQuantiade é a quantidade que queremos adicionar.
        
        this.arrItensSacola.update(prmItens => { // O update serve para atualizar o valor do signal. o parâmetro prmItens recebe o valor atual de arrItensSAcola. Tudo o que retorna se torna um ovo array armazenado no signal.

            // Verifica se o produto já está na sacola.
            const objItemExistente = prmItens.find(
                prmItem => prmItem.produto.id === prmProduto.id
            ); // Verifica se o produto já está na sacola.

            if (objItemExistente) { // Se objItem Existente recebeu um item, significa que o produto ja´está na sacola.
                return prmItens.map(prmItem => //O maop percorre todo o array atual e cria um novo array.
                    prmItem.produto.id === prmProduto.id //verifica se é o produto que quereos atualizar.
                    ? { // SE sim, cria uma nova versão desse item.
                        ...prmItem, //copia toda as propriedadess que o item já possui. 
                        quantidade: prmItem.quantidade + prmQuantidade // Altera apenas a quantidade.
                    } 
                    : prmItem // Se não foir o produto que estamos procurando, devolve o item sem nenhuma alteração
                );
            } else { // Se objItemExistente não recebeu nenhum item, significa que o produto ainda não está na sacola.

                return [ // Então retornamos um novo aray.
                    ...prmItens, //copia para o array todos os itens que já existiam na sacola.
                    { produto: prmProduto, quantidade: prmQuantidade } //informa o produto e a quantidade.
                ];
            }
        });

        console.log('Sacola:',JSON.stringify(this.arrItensSacola(),null,2));
        console.log('quantudade total:', this.intQuantidadeTotal());
    };

    // Método que retorna todos os itens da sacola de compras.
    mtdObterItens(): IItemSacola[] {
        return this.arrItensSacola(); // Retorna o array de itens da sacola.
    }
}
