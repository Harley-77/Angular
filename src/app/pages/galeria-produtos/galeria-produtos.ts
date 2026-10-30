import { Component, OnInit, inject } from '@angular/core'; // Importa os recursos do Angular utilizados pelo componente. Não mudei nome pois vem do angular core.
import { IProduto } from '../../models/produto.interface'; // Importa a interface que define a estrutura dos produtos.
import { Produto } from '../../services/produto'; // Importa nosso serviço responsável pela comunicação com a API.
import { CurrencyPipe } from '@angular/common'; //importa o pipe de formtação de moeda do angular.
import { srvSacola } from '../../services/sacola'; // Importa serviço responsável pela sacola de compras.

@Component({ // Inicia a configuração do componente.

  selector: 'app-galeria-produtos', // Define o nome da tag HTML utilizada para representar este componente.
  imports: [CurrencyPipe], // define os recursos externos que virão - moeda
  templateUrl: './galeria-produtos.html', // Define qual é o arquivo HTML associado ao componente.
  styleUrl: './galeria-produtos.scss' // Define qual é o arquivo SCSS associado ao componente.

})

export class GaleriaProdutos implements OnInit { // Declara o componente e implementa a interface OnInit.

  //privae: o membro somente poderá ser acessado internamente pel classe
  private readonly srvProduto = inject(Produto); // Solicita ao Angular uma instância da lista de produtos.
  readonly srvSacolaRO = inject(srvSacola); // Solicita ao Angular uma instância do da sacola de compras.

  arrProdutos: IProduto[] = []; // Array que armazenará os produtos recebidos da API.
  blnCarregando: boolean = true; // Variácvel booleana que controla se a mensagem de carregamento deverá ser apresentada ou não. padrão sim=carregando.
  blnErro: boolean = false; // Variável booleana que controla se ocorreu algum erro durante a consulta da API. Padrão não - sem erros.
  
  ngOnInit(): void { // Método do ciclo de vida executado pelo Angular após a inicialização do componente

    this.mtdBuscarProdutos(); // Chama nosso método responsável por consultar os produtos.
  }

  mtdBuscarProdutos(): void { // Declara o método responsável por buscar os produtos na API.
  
    this.blnCarregando = true; // Limpa um possível estado de carregamento anterior.
    this.blnErro = false; // Limpa um possível estado de erro anterior.
    this.srvProduto.mtdBuscarProdutos().subscribe({ // Chama o serviço e se inscreve no Observable retornado por ele. Diz ao angular que eu quero ser avisado quando a resposta do observable chegar.

      next: (prmProdutos: IProduto[]) => { // Executa este bloco quando os produtos forem recebidos com sucesso.

        this.arrProdutos = prmProdutos; // Armazena os produtos recebidos no array utilizado pela página.
        this.blnCarregando = false; // Informa que o carregamento terminou com sucesso.

      },

      error: (prmErro: unknown) => { // Executa este bloco se ocorrer algum erro durante a requisição.
        console.error('Erro ao buscar produtos:', prmErro); // Mostra informações sobre o erro no console do navegador.
        this.blnErro = true; // Ativa o estado de erro da página.
        this.blnCarregando = false; // Informa que a tentativa de carregamento terminou.

      }

    });

  }

  //método que adiciona o produto à sacola de compras. Recebe como parâmetro o produto selecionado.
  mtdAdicionarSacola(prmProduto: IProduto): void {
    this.srvSacolaRO.mtdAdicionarItem(prmProduto, 1); // Chama o método do serviço da sacola para adicionar o produto com quantidade 1.
  }
}