import { Component, QueryList, ViewChildren } from '@angular/core';
import { POKEMON_WILDS_V3 } from 'src/app/datas/wilds.data';
import { WildRegionComponent } from './wild-region/wild-region.component';
import { PokemonCatchService } from 'src/app/services/pokemon-catch.service';

@Component({
  selector: 'app-wild',
  templateUrl: './wild.component.html',
  styleUrls: ['./wild.component.less']
})
export class WildComponent {
  wildData = POKEMON_WILDS_V3
  pokemonCatchStatus: { [id: number]: boolean } = {};

  @ViewChildren(WildRegionComponent) wildRegionComponents!: QueryList<WildRegionComponent>;

  constructor(private pokemonCatchService: PokemonCatchService) { }

  ngOnInit(): void {
    // 모든 포켓몬의 포획 상태를 한 번에 불러옴
    this.loadAllPokemonCatchStatus();
  }


  toggleChild(index: number): void {
    // QueryList는 배열처럼 인덱스로 접근 가능합니다.
    const component = this.wildRegionComponents.get(index);
    if (component) {
      component.toggleExpanded();
    }
    this.scrollToSection(index);
  }

  async loadAllPokemonCatchStatus(): Promise<void> {
    const allCaughtPokemon = await this.pokemonCatchService.pokemonCatch.toArray();
    allCaughtPokemon.forEach(entry => {
      this.pokemonCatchStatus[entry.id] = entry.isCaught;
    });
  }


  async handlePokemonCaught(event: { id: number, status: boolean }): Promise<void> {
    await this.pokemonCatchService.catchPokemon(event.id, event.status);
    this.pokemonCatchStatus[event.id] = event.status;
  }

  scrollToSection(index: number): void {
    const element = document.getElementById(`location-section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }


}
