export interface IProduto { // Declara e exporta a interface que representa um produto da API.
  id: number; // Armazena o identificador numérico único do produto.
  title: string; // Armazena o título ou nome do produto.
  price: number; // Armazena o preço do produto.
  description: string; // Armazena a descrição detalhada do produto.
  category: string; // Armazena a categoria à qual o produto pertence.
  image: string; // Armazena o endereço da imagem do produto.
  rating: IProdutoRating; // Armazena as informações de avaliação do produto.
}

export interface IProdutoRating { // Declara e exporta a interface que representa a avaliação do produto.
  rate: number; // Armazena a nota média recebida pelo produto.
  count: number; // Armazena a quantidade de avaliações recebidas.
}