import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-location',
  templateUrl: './pokemon-location.component.html',
  styleUrls: ['./pokemon-location.component.less']
})
export class PokemonLocationComponent implements OnChanges {
  @Input() pokemonName = ''; // 포켓몬 이름을 입력으로 받음
  
  pokemonLocations: any[] = []; // 조회된 위치 정보를 저장할 배열

  constructor(private pokemonService: PokemonService) { }

  ngOnChanges(changes: SimpleChanges): void {
    // pokemonName 입력 값이 변경될 때마다 위치 정보를 다시 조회합니다.
    if (changes['pokemonName'] && this.pokemonName) {
      this.searchLocations();
    }
  }

  private searchLocations(): void {
    // 서비스의 findPokemonLocations 메서드를 직접 호출하여 데이터를 가져옵니다.
    this.pokemonLocations = this.pokemonService.findPokemonLocations(this.pokemonName);
  }


}
