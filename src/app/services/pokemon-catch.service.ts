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
    this.version(2)
      .stores({
        gotcha: 'id',
        another_red_gotcha: 'id',
      })
      .upgrade(async (tx) => {
        const storeNames = ['gotcha', 'another_red_gotcha'];

        for (const storeName of storeNames) {
          const oldGotchaData = await tx.table(storeName).toArray();
          for (const row of oldGotchaData) {
            await tx.table(storeName).put(row);
          }
        }
      });

    const prefix = this.dataHandleService.DBprefix;
    this.pokemonCatch = this.table(`${prefix}gotcha`);
    await this.open();
  }

  async catchPokemon(id: number, status: boolean) {
    this.pokemonCatch.put({ id: id, isCaught: status });
  }
}
