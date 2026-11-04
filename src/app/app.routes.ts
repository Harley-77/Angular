import { Routes } from '@angular/router'; //é o padrão do angular para declarar as rotas.
import { GaleriaProdutos } from './pages/galeria-produtos/galeria-produtos'; //importa a página da galeria.
import { DetalhesProduto } from './pages/detalhes-produto/detalhes-produto'; // Página dos detalhes de produtos;
import { Carrinho } from './pages/carrinho/carrinho'; // IMporta a página responsável pela sacola de produtos.
import { Checkout } from './pages/checkout/checkout'; // IMporta a página do Checkout com os formul´rios.
import { PedidoConfirmado } from './pages/pedido-confirmado/pedido-confirmado';

export const routes: Routes = [ //declara e exporta a lista de rotas da aplicação
    { // Configuração ad rota raiz.
        path: '', // representa o endereço inicial da aplicação.
        redirectTo: 'produtos', // redireciona o usuário para a galeria
        pathMatch: 'full', // exige que a url  esteja completamente vazia para realizar o redirecionmento.
    },

    { //inicia a configuração da rota para a galeria
        path: 'produtos', // define o endereço produtos
        component: GaleriaProdutos // Determina qual a página que sera aprsentada
    },

    { // Configura a rota de detalhes do produto
        path: 'produtos/:id', // definie a rota a prtir da id do produto.
        component: DetalhesProduto // determina que esa url exibirá a página d detalhes
    },

    { // Inicia a configuração da rota da sacola
        path: 'sacola', // definie o endereço d sacola.
        component: Carrinho // determina que será esa a URL da página da sacola.
    },

    { // Inicia a configuração da rota do checkout.
        path: 'checkout', // Define o endereço do Checkout.
        component: Checkout // Determina a URL da página do checkout.
    },

    { // Navegação par a confirmação do pedido.
        path: 'pedido confirmado',
        component: PedidoConfirmado
    }
];
