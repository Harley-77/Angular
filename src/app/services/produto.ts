import { Service, inject } from '@angular/core'; // Importa o decorator Service e a função inject do Angular.
import { HttpClient } from '@angular/common/http'; // Importa o HttpClient responsável pelas requisições HTTP que fazem as comunicações com as páginas.
import { Observable } from 'rxjs'; // Importa o Observable utilizado para trabalhar com os resultados assíncronos.
import { IProduto } from '../models/produto.interface'; // Importa nossa interface que representa os produtos da API.

@Service() // Declara que a classe abaixo é um serviço disponível para injeção de dependência.

//Esta classe é um serviço que pode participar da injeção de dependência
export class Produto { // Declara e exporta nosso serviço responsável pelas operações relacionadas aos produtos.
  
  //aqui digo ao angular para fornecer para esta proprieade uma instancia httpclient.
  private readonly srvHttp = inject(HttpClient); // Injeta o HttpClient que será utilizado para realizar as requisições HTTP.
  private readonly cstUrlApi: string = 'https://fakestoreapi.com/products'; // Define o endereço utilizado para consultar os produtos.

  mtdBuscarProdutos(): Observable<IProduto[]> { // Declara o método responsável por buscar todos os produtos - conexão com interface de produto.
    return this.srvHttp.get<IProduto[]>(this.cstUrlApi); // Executa uma requisição HTTP GET e retorna o Observable com a lista de produtos.
  }

  mtdBuscarProdutoPorId(prmIdProduto: number): Observable<IProduto> { // Declara o método que busca um produto específico pelo seu ID.
    const cstUrlProduto: string = `${this.cstUrlApi}/${prmIdProduto}`; // Monta a URL específica do produto usando o ID recebido.
    return this.srvHttp.get<IProduto>(cstUrlProduto); // Executa a requisição GET e retorna o Observable contendo um produto.
  }
}
