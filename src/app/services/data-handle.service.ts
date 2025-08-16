import { Injectable } from '@angular/core';
import { POKEMON_WILDS_V3 } from '../datas/oranageV3/wilds.data';
import { POKEMON_DATA_V3 } from '../datas/oranageV3/pokemon.data';
import { ITEM_DATA_V3 } from '../datas/oranageV3/item.data';
import { BehaviorSubject } from 'rxjs';
import { POKEMON_WILDS_ANOTHER_RED } from '../datas/another_red/wilds.data';
import { POKEMON_DATA_ANOTHER_RED } from '../datas/another_red/pokemon.data';


@Injectable({
  providedIn: 'root'
})
export class DataHandleService {
    private gameVersionSubject = new BehaviorSubject<string | null>(null);
    gameVersion$ = this.gameVersionSubject.asObservable();

    setGameVersion(version: string) {
        this.gameVersionSubject.next(version);
    }

    getGameVersion(): string | null {
        return this.gameVersionSubject.value;
    }

    get wildDatas(){
        switch (this.gameVersionSubject.value) {
            case "orange_v3":
                return POKEMON_WILDS_V3
            case "another_red":
                return POKEMON_WILDS_ANOTHER_RED
        }

        throw new Error('No service support')
    }

    get itemDatas(){
        switch (this.gameVersionSubject.value) {
            case "orange_v3":
                return ITEM_DATA_V3
        }

        throw new Error('No service support')
    }

    get pokemonDatas() {
        switch (this.gameVersionSubject.value) {
            case "orange_v3":
                return POKEMON_DATA_V3
            case "another_red":
                return POKEMON_DATA_ANOTHER_RED
        }

        throw new Error('No service support')

    }

}
