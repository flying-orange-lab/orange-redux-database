import { Component, inject } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonStatComponent } from '../pokemon-stat/pokemon-stat.component';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-pokedex-guide',
  templateUrl: './pokedex-guide.component.html',
  styleUrl: './pokedex-guide.component.less',
  imports: [PokemonStatComponent],
})
export class PokedexGuideComponent {
  private helperService = inject(HelperService);

  pokemon: Pokemon = {
    id: 0,
    name: 'substitute',
    koreanName: '대타출동',
    imageUrl: 'substitute.png',
  };
  currentPokemonStats: number[] = [100, 50, 80, 60, 80, 50, 420];

  get currentImageUrl() {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemon.imageUrl}`;
  }

  get displayId() {
    return '#' + String(this.pokemon.id).padStart(3, '0');
  }

  onCloseClick() {
    this.helperService.emitCloseHelper();
  }
}
