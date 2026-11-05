import { Component } from '@angular/core'; //padrão do angular que importa o decorator.
import { RouterOutlet } from '@angular/router'; //padrão do angular que importa o recurso responsável por exibir o conteúdo das rotas.
import { Cabecalho } from './components/cabecalho/cabecalho'; //importa o componente do cabeçalho.

@Component({ //Aqui iniciai  a configuração do componente
  imports: [RouterOutlet, Cabecalho], //disponibiliza p routeroutlet e o componente do cabeçalho  para o template deste componente.
  selector: 'app-root',  //Identifica o componente principal - root.
  styleUrl: './app.scss', //idntifica o arquivo de estilo.
  templateUrl: './app.html', //Identifica o arquivo HTML do componente.
})

export class App { //declara e exporta o componente principal d aplicação.
  
}
