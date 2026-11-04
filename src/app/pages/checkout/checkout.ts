import { Component, inject } from '@angular/core'; 
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'; // Importa os recursos necessários para criar e validar o formulário.
import { RouterLink } from '@angular/router'; // Permite criar links de navegação no HTML.
import { ICheckout } from '../../models/checkout.interface'; //IMporta a interface do checkout
import { email } from '@angular/forms/signals';
import { Sacola } from '../../services/sacola';
import { IPedido } from '../../models/pedido.interface';
import { IItemSacola } from '../../models/item-sacola.interface';
import { Router } from '@angular/router';
import { Pedido } from '../../services/pedido';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, RouterLink], // Disponibiliza os formulários reativos e o RouterLink para o HTML.
  styleUrl: './checkout.scss',
  templateUrl: './checkout.html',
})

export class Checkout {
  
  // Construção do formulário.
  private readonly srvFormBuilder = inject(FormBuilder); // Injeta o FormBuilder, responsável por facilitar a criação do formulário.
  private readonly srvSacola = inject(Sacola); // Traz a sacola
  private readonly srvPedido = inject(Pedido); //Traz o último pedido.
  private readonly srvRouter = inject(Router); 

  readonly frmCheckout = this.srvFormBuilder.nonNullable.group({ // Cria o formulário e define seus três campos. Vantagem: ele é o responsável pelo estado completo do dormulário, melhor que usar variáveis.
    // REGRAS: Nome obrigatório e com pelo menos 3 caracteres. NonNullable impede null.
    // Lista de campos do formulário:
    nomeCompleto: [
      '',
      [
        Validators.required,
        Validators.minLength(3) // tamanho 
      ]
    ],

    // E-mail obrigatório e com formato válido.
    email: [
      '',
      [
        Validators.required,
        Validators.email //formato email
      ]
    ],

    // Endereço obrigatório e com pelo menos 5 caracteres.
    endereco: [
      '',
      [
        Validators.required,
        Validators.minLength(5)
      ]
    ]
  });

  mtdFinalizarCompra(): void {
    // Verifica novamentye se o formul´rio est´ainváldio. Mesmo com o botão desabilitado por segurança da lógica. A regra do negócio não depende só do botão.
    if (this.frmCheckout.invalid) { 
      this.frmCheckout.markAllAsTouched(); // Marca todos os campos como mexidos para exibir erros..
      return; // Sai do método.
    };
    const arrItensPedido: IItemSacola[] = this.srvSacola.mtdObterItens(); // Carrega os itens da sacola
    
    const intQuantidadeTotal: number = arrItensPedido.reduce( // Somar a quantidade de itens da sacola
      (prmTotal: number, prmItem: IItemSacola) => // parametros item e total representa m o item e o total da sacola, rspectivamente
        prmTotal + prmItem.quantidade,
      0 // O totla começa com zero.
    );

    const numValorTotal: number = arrItensPedido.reduce( //Calcula o valor total do pedido.
      (prmTotal: number, prmItem: IItemSacola) => 
        prmTotal + // valor total.
      (prmItem.produto.price * prmItem.quantidade), //Para cada item: preço unitário x quantidade depois soma ao total
      0 //valor inicial é zero
    );

    //Caso váildo, monta um objeto seguindo a mesma estrutura n ainterface do ICheckout.
    const objCheckout: ICheckout = {
      nomeCompleto: this.frmCheckout.controls.nomeCompleto.value, // recupera o nome do forulário.
      email: this.frmCheckout.controls.email.value, // recupera o email do forulário.
      endereco: this.frmCheckout.controls.endereco.value // recupera o endereço do forulário.
    };

    // Agora juntou cliente + itens + totais em um único Pedido.
    const objPedido: IPedido = { // Monta um objeto com os dados do pedido.
      cliente: objCheckout, // Cliente: dados dod formulário.
      itens: arrItensPedido, // Itens: produtos e quantidades da sacola.
      quantidadeTotal: intQuantidadeTotal, // Soma de itens pedidos calculados acima.
      valorTotal: numValorTotal // Valor total dos itens pedidos calculados acima.
    };

    this.srvPedido.mtdSalvarPedido(objPedido); // Guarda o pedido completo antes de limpar a sacola;

    // Log para identifiar se o objeto foi montado corretamente.
    console.log('Dados do pedido: ',objPedido);

    
    this.srvSacola.mtdLimparSacola(); // Limpa os dados da sacola após salvar o pedido.
  
    //Navega para o resumo do pedido.
    this.srvRouter.navigate(['./pedido-confirmado']);
  };
}
