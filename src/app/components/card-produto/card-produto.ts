import { Component, Input, inject } from '@angular/core'; // Importa os recursos utilizados pelo componente.
import { CurrencyPipe } from '@angular/common'; // Importa o pipe responsável pela formatação monetária.
import { IProduto } from '../../models/produto.interface'; // Importa a interface utilizada para representar um produto.
import { Sacola } from '../../services/sacola'; // Importa o serviço responsável pelo gerenciamento da sacola.
import { Router } from '@angular/router'; //IMporta o serviço responsável pela navegação entre as páginas.

@Component({ // Inicia a configuração do componente.
  selector: 'app-card-produto', // Define a tag HTML utilizada para representar este componente.
  imports: [CurrencyPipe], // Disponibiliza o CurrencyPipe para utilização no HTML.
  templateUrl: './card-produto.html', // Define o arquivo HTML utilizado pelo componente.
  styleUrl: './card-produto.scss' // Define o arquivo SCSS utilizado pelo componente.
})

export class CardProduto { // Declara e exporta o componente CardProduto.
  private readonly srvSacola = inject(Sacola); // Injeta o serviço responsável pela sacola.
  private readonly srvRouter = inject(Router); // Injeta o serviço de navegação.
  @Input({ required: true }) varProduto!: IProduto; // Recebe da GaleriaProdutos o produto que será exibido neste card. OU seja, recebe um valor que foi enviado pelo componente pai. É required pois somente faz sentido criar quando tem um produto - não teria que exibir um card sem produto. IMPORTANTE: o Ponto de exclamação "!" indica que a propriedade não possui alor na sua criação, mas o angular irá fornecer esse alor através do INPUT; sem isos, poderia acontrecer se receber mensagem de erro de propriedade não inicializada.

  

  mtdAdicionarSacola(): void { // Declara o método executado quando o usuário clicar no botão de adicionar.
    this.srvSacola.mtdAdicionarItem(this.varProduto, 1); // Adiciona uma unidade do produto atual à sacola.
  };

  mtdAbrirDetalhes(): void {
    this.srvRouter.navigate(['/produtos', this.varProduto.id]); // Passa p ID do produto para o serviço de rota para navegar para o detalhe do produto.
  }
}
