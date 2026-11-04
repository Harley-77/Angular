import { Component, inject } from '@angular/core'; // Importa os recursos utilizados pelo componente.
import { CurrencyPipe } from '@angular/common'; // Importa o pipe para apresentação dos valores em reais.
import { RouterLink } from '@angular/router'; // Permite navegar novamente para a vitrine.
import { Pedido } from '../../services/pedido'; // Importa o service que contém o último pedido.
import { IPedido } from '../../models/pedido.interface'; // Importa a estrutura do pedido.

@Component({
    selector: 'app-pedido-confirmado',
    imports: [CurrencyPipe, RouterLink],
    templateUrl: './pedido-confirmado.html',
    styleUrl: './pedido-confirmado.scss'
})

export class PedidoConfirmado {
    // Injeta o service responsável por armazenar o pedido que acabou de ser finalizado.
    private readonly srvPedido = inject(Pedido);

    // Recupera o pedido armazenado no service. Pode ser null caso o usuário tente acessar diretamente pedido-confirmado sem ter realizado uma compra.
    readonly objPedido: IPedido | null =
        this.srvPedido.mtdObterPedido();
}
 