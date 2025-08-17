import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-stat',
  templateUrl: './pokemon-stat.component.html',
  styleUrls: ['./pokemon-stat.component.less'],
})
export class PokemonStatComponent {
  @Input() pokemonStats?: number[];
  maxStatValue = 255;
  statLabels = ['HP', '공격', '방어', '특공', '특방', '스피드', '총합'];
  statColors = [
    '#58BD5D',
    '#FF8A4B',
    '#FFC245',
    '#A54BFF',
    '#5D7FFF',
    '#FF5D5D',
    '#6A6A6A',
  ];

}
