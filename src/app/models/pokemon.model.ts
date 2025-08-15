export interface PokemonForm {
    formName: string;
    imageUrl: string;
    types: string[];
}

export interface Pokemon {
    id: number;
    name: string;
    koreanName: string;
    imageUrl?: string;
    types?: string[];
    form?: PokemonForm[];
}