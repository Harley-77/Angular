import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduto } from '../../models/produto.interface';
import { Produto } from '../../services/produto';
import { Sacola } from '../../services/sacola';

@Component({
  selector: 'app-detalhes-produto',
  imports: [CurrencyPipe, UpperCasePipe],
  styleUrl: './detalhes-produto.scss',
  templateUrl: './detalhes-produto.html'
})

export class DetalhesProduto implements OnInit {
  private readonly srvProduto = inject(Produto);
  private readonly srvSacola = inject(Sacola);
  private readonly srvRotaAtiva = inject(ActivatedRoute);
  private readonly srvRouter = inject(Router);

  varProduto: IProduto | null = null; //armazena o produto obtido pela API.
  blnCarregando: boolean = true;
  blnErro: boolean = false;

  ngOnInit(): void {
    this.mtdBuscarProduto();

  }

  mtdBuscarProduto(): void {
    const cstIdProduto: number = Number( // Aqui converto o parâmetro recebido pela URL para número.
      this.srvRotaAtiva.snapshot.paramMap.get('id') //Recupera o valor do parâmetro chamado id.
    );

    if (!cstIdProduto) { // Verifica se o ID recebido é inválido.
      this.blnErro = true;
      this.blnCarregando = false;
      return; // Interrompe o método.
    };

    this.srvProduto.mtdBuscarProdutoPorId(cstIdProduto).subscribe({ //Solicita à API o produto correspondente ao ID.
      next: (prmProduto: IProduto) => { // Executa quando a API responder corretamente.
        this.varProduto = prmProduto; // Armazena o produto retornado.
        this.blnCarregando = false; // Finaliza o carregamento.
      },

      error: (prmErro: unknown) => { // SAída para o caso de erro na requisição.
        console.error('Erro ao buscar o produto: ', prmErro);
        this.blnErro = true;
        this.blnCarregando = false;
      }
    });
  }

  mtdAdicionarSacola(): void { // Métido para adicionjar o produto exibido na sacola.
    if (this.varProduto) { // Garante que existe um produto antes de adicionar ele para a sacola.
      this.srvSacola.mtdAdicionarItem(this.varProduto,1);
    }
  }

  mtdVoltar(): void { // DEclara o método para voltar para a galeria.
    this.srvRouter.navigate(['/produtos']); // Navega novamente para a página de produtos
  }

}
