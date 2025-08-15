import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { POKEMON_DATA_V3 } from '../datas/pokemon.data';
import { POKEMON_WILDS_V3 } from '../datas/wilds.data';
import { PokemonLocation } from '../models/wilds.model';
import { TYPE_DISPLAY_DATA } from '../datas/type.data';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }

  private getBaseName(pokemonName: string): string {
    if (pokemonName.startsWith("대쓰여너")) {
      return "대쓰여너";
    }
    if (pokemonName.startsWith("안농")) {
      return "안농";
    }
    return pokemonName;
  }

  getAllPokemon(): Observable<Pokemon[]> {
    return of(POKEMON_DATA_V3);
  }

  findPokemonLocations(pokemonName: string) {
    const locations: PokemonLocation[] = [];

    const lowerCasePokemonName = pokemonName.toLowerCase();
    const uniqueLocations = new Set<string>();

    for (const locationData of POKEMON_WILDS_V3) {
      const locationName = locationData["locationName"];
      const regionDatas = locationData["regionDatas"];

      for (const regionData of regionDatas) {
        const locationStatus = regionData["locationStatus"]
        const areaDatas = regionData["areaDatas"];

        const allEncounters = areaDatas.flatMap(areaInfo =>
          areaInfo.encounters.map(encounter => ({
            ...encounter,
            area: areaInfo.area,
            region: locationName,
            condition: locationStatus
          }))
        );

        for (const encounter of allEncounters) {
          const baseName = this.getBaseName(encounter.name);

          if (baseName.toLowerCase() === lowerCasePokemonName) {
            const locationKey = `${locationName}|${locationStatus}|${encounter.area}`;

            if (!uniqueLocations.has(locationKey)) {
              uniqueLocations.add(locationKey);

              const isDefaultCondition = Object.keys(regionData).length === 1;
              locations.push({
                region: locationName,
                condition: isDefaultCondition ? "" : locationStatus,
                area: encounter.area,
                minLv: encounter.minLv,
                maxLv: encounter.maxLv,
                rate: encounter.rate,
              });
            }
          }
        }
      }
    }

    return locations;
  }

  engToKorTypeMapper(type: string) {
    return TYPE_DISPLAY_DATA[type];
  }

}
