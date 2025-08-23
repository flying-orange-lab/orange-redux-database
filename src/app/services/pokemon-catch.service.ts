import { inject, Injectable } from '@angular/core';
import Dexie from 'dexie';
import { DataHandleService } from './data-handle.service';

interface Catch {
  id: number;
  isCaught: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PokemonCatchService extends Dexie {
  private dataHandleService = inject(DataHandleService);
  pokemonCatch!: Dexie.Table<Catch, number>;

  constructor() {
    super('PokemonCatchDB');
  }

  async init() {
    let prefix = '';
    if (this.dataHandleService.getGameVersion() != 'orange_v3') {
      prefix = `${this.dataHandleService.getGameVersion()}_`;
    }

    this.version(1).stores({
      [`${prefix}gotcha`]: 'id',
    });

    this.pokemonCatch = this.table(`${prefix}gotcha`);
    await this.open();
  }

  async catchPokemon(id: number, status: boolean) {
    const key = this.pokemonCatch.put({ id: id, isCaught: status });
  }
}
