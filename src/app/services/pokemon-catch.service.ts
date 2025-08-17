import { Injectable } from '@angular/core';
import Dexie from 'dexie';

interface Catch {
  id: number;
  isCaught: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PokemonCatchService extends Dexie {
  pokemonCatch: Dexie.Table<Catch, number>;

  constructor() {
    super('PokemonCatchDB');
    this.version(1).stores({
      gotcha: 'id', // 'id'가 프라이머리 키(primary key)
    });
    this.pokemonCatch = this.table('gotcha');
  }

  async catchPokemon(id: number, status: boolean) {
    const key = this.pokemonCatch.put({ id: id, isCaught: status });
  }
}
