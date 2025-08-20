import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-stat',
  templateUrl: './pokemon-stat.component.html',
  styleUrls: ['./pokemon-stat.component.less'],
  standalone: false,
})
export class PokemonStatComponent implements OnInit {
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
  error = '';
  ngOnInit() {
    // 디버그용 코드
    if (this.pokemonStats) {
      const sums = this.pokemonStats.reduce((a, c) => a + c, 0);
      if (sums != this.pokemonStats[this.pokemonStats.length - 1] * 2) {
        this.error = `다름 ${sums - this.pokemonStats[this.pokemonStats.length - 1]}`;
      }
    }
  }
}
