import { Component, Input } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-wild-region',
  templateUrl: './wild-region.component.html',
  styleUrls: ['./wild-region.component.less']
})
export class WildRegionComponent {
  @Input() regionDatas!: any[];

  isExpanded: boolean = false;
  selectedRegion: any;

  constructor(private pokemonService: PokemonService) { }


  ngOnInit(): void {
    if (this.regionDatas && this.regionDatas.length > 0) {
      this.selectedRegion = this.regionDatas[0];
    }    
  }

  public toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  selectRegion(region: any): void {
    this.selectedRegion = region;
  }

  getPokemonId(pokemonName: string) {
    const pokemon = this.pokemonService.findPokemon(pokemonName);
    return pokemon?.id
  }


}
