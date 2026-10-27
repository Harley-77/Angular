export interface IProduto { //aqui se definie a estrutura que todo objeto produto recebido da API deverá possuir.
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: IProdutoRating;
}

export interface IProdutoRating { // Aqui se definie a estrutura que todo objeto rating recebido da API deverá possuir.
    rate: number; //nota média do produto
    count: number; //Quntidade de avaliações do produto
}
