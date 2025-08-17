export interface PokemonForm {
  formName: string;
  imageUrl: string;
  types: string[];
  abilities?: string[];
  stats?: number[];
  statsOrigin?: number[];
  evolutionCondition?: string;
  wildItems?: string;
  extra?: string;
}

export interface Pokemon {
  id: number;
  name: string;
  koreanName: string;
  imageUrl?: string;
  types?: string[];
  abilities?: string[];
  stats?: number[];
  statsOrigin?: number[];
  evolutionCondition?: string;
  wildItems?: string;
  extra?: string;
  form?: PokemonForm[];
}
