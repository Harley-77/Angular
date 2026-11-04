import { Component, inject } from '@angular/core'; 
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'; // Importa os recursos necessários para criar e validar o formulário.
import { RouterLink } from '@angular/router'; // Permite criar links de navegação no HTML.
import { ICheckout } from '../../models/checkout.interface'; //IMporta a interface do checkout
import { email } from '@angular/forms/signals';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, RouterLink], // Disponibiliza os formulários reativos e o RouterLink para o HTML.
  styleUrl: './checkout.scss',
  templateUrl: './checkout.html',
})

export class Checkout {
  
  // Construção do formulário.
  private readonly srvFormBuilder = inject(FormBuilder); // Injeta o FormBuilder, responsável por facilitar a criação do formulário.

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
    }
    //Caso váildo, monta um objeto seguindo a mesma estrutura n ainterface do ICheckout.
    const objCheckout: ICheckout = {
      nomeCompleto: this.frmCheckout.controls.nomeCompleto.value, // recupera o nome do forulário.
      email: this.frmCheckout.controls.email.value, // recupera o email do forulário.
      endereco: this.frmCheckout.controls.endereco.value // recupera o endereço do forulário.
    }
    // Log para identifiar se o objeto foi montado corretamente.
    console.log('Dados do checkout: ',objCheckout)
  }
}
