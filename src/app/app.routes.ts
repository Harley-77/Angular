import { Routes } from '@angular/router'; //é o padrão do angular para declarar as rotas.
import { GaleriaProdutos } from './pages/galeria-produtos/galeria-produtos'; //importa a página da galeria.

export const routes: Routes = [ //declara e exporta a lista de rotas da aplicação
    { //as chaves servem par aindicar o início da configuração da rota principal da aplicaçã.
        path: '', // caminho: definie que esta será a rota inicial da aplicação.
        component: GaleriaProdutos //Aqui determina que a página GelriaProdutos será exibida ness rota.
    }
];
