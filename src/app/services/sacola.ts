import { Service } from '@angular/core'; // Importa o decorator utilizado para declarar o serviço.
import { BehaviorSubject, Observable } from 'rxjs'; // Importa o BehaviorSubject e o Observable do RxJS.
import { map } from 'rxjs/operators'; // Importa o operador map utilizado para transformar os dados emitidos pelo Observable.
import { IItemSacola } from '../models/item-sacola.interface'; // Importa a interface que representa um item da sacola.
import { IProduto } from '../models/produto.interface'; // Importa a interface que representa um produto da API.

@Service() // Declara esta classe como um serviço disponível para toda a aplicação.

export class Sacola { // Declara e exporta o serviço responsável por gerenciar a sacola.

    private readonly sbjItensSacola = new BehaviorSubject<IItemSacola[]>([]); // Cria o estado inicial da sacola começando com um array vazio - uso do subject.
    
    readonly obsItensSacola$: Observable<IItemSacola[]> = // Declara o Observable público que será utilizado pelos componentes.
        this.sbjItensSacola.asObservable(); // Impede que os componentes alterem diretamente o BehaviorSubject.
    
    readonly obsQuantidadeTotal$: Observable<number> = // Declara um Observable público que emitirá a quantidade total da sacola. É importante para grantir que apenas o service altere o estado da sacola. O uso do $ indica que a propriedade é um observable.
        this.obsItensSacola$.pipe( // Inicia a transformação das emissões do Observable de itens.
            map((prmItens: IItemSacola[]) => // Recebe o array atual de itens sempre que a sacola for modificada.
                prmItens.reduce( // Percorre os itens da sacola e acumula suas quantidades.
                    (prmTotal: number, prmItem: IItemSacola) => // Recebe o total acumulado e o item atual.
                        prmTotal + prmItem.quantidade, // Soma a quantidade do item ao total acumulado.
                    0 // Determina que a soma deverá começar em zero.
                )
            )
        );

    mtdAdicionarItem( // Declara o método responsável por adicionar um produto à sacola.
        prmProduto: IProduto, // Recebe o produto selecionado pelo usuário.
        prmQuantidade: number // Recebe a quantidade que deverá ser adicionada.
    ): void { // Informa que o método não devolve nenhum valor.
        const cstItensAtuais: IItemSacola[] = // Declara uma constante com os itens atuais da sacola.
            this.sbjItensSacola.getValue(); // Obtém o último valor armazenado pelo BehaviorSubject.

        const cstItemExistente: IItemSacola | undefined = // Declara uma constante que poderá receber o item encontrado.
            cstItensAtuais.find( // Procura no array um produto com o mesmo identificador.
                (prmItem: IItemSacola) => // Recebe cada item durante a procura.
                    prmItem.produto.id === prmProduto.id // Compara o ID do item com o ID do produto selecionado.
            );

        let arrItensAtualizados: IItemSacola[]; // Declara o array que receberá o novo estado da sacola.
        if (cstItemExistente) { // Verifica se o produto já existe na sacola.
            arrItensAtualizados = cstItensAtuais.map( // Cria um novo array percorrendo os itens atuais.
                (prmItem: IItemSacola) => // Recebe o item atual durante o map.
                    prmItem.produto.id === prmProduto.id // Verifica se este é o produto que deverá ser atualizado.
                        ? { // Se for o produto, cria um novo objeto atualizado.
                            ...prmItem, // Copia as propriedades existentes do item.
                            quantidade: prmItem.quantidade + prmQuantidade // Soma a nova quantidade à quantidade existente.
                        }
                        : prmItem // Mantém os demais itens sem alteração.
            );

        } else { // Executa quando o produto ainda não existe na sacola.
            arrItensAtualizados = [ // Cria um novo array para representar o novo estado.
                ...cstItensAtuais, // Copia todos os itens que já estavam na sacola.
                { // Cria o novo item que será adicionado.
                    produto: prmProduto, // Armazena o produto recebido.
                    quantidade: prmQuantidade // Armazena a quantidade recebida.
                }
            ];
        }

        this.sbjItensSacola.next(arrItensAtualizados); // Publica o novo estado para todos os componentes inscritos.
    }

    mtdObterItens(): IItemSacola[] { // Declara o método que devolve os itens atuais da sacola.
        return this.sbjItensSacola.getValue(); // Retorna o último array armazenado no BehaviorSubject.
    }
}