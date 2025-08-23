import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  TYPE_DISPLAY_DATA,
  TYPE_EFFECTIVE_DATA,
} from 'src/app/datas/type.data';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-defense',
  templateUrl: './defense.component.html',
  styleUrls: ['./defense.component.less'],
  imports: [NgClass],
})
export class DefenseComponent implements OnInit {
  private route = inject(ActivatedRoute);

  typeData = TYPE_DISPLAY_DATA;
  showInitialMessage = true;
  selectedTypes: string[] = [];
  calculatedResults: Record<string, { type: string; typeKey: string }[]> = {};

  selectLabel = [
    'normal',
    'fire',
    'water',
    'grass',
    'electric',
    'ice',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ghost',
    'dark',
    'dragon',
    'steel',
    'fairy',
  ];
  resultLabel = [
    '4배 약점',
    '2배 약점',
    '1배 보통',
    '0.5배 저항',
    '0.25배 저항',
    '0배 무효',
  ];

  ngOnInit(): void {
    // URL 파라미터가 있다면 검색을 실행합니다.
    this.route.queryParams.subscribe((params) => {
      if (params['type']) {
        const queryTypes = Array.isArray(params['type'])
          ? params['type']
          : [params['type']];
        this.selectedTypes = queryTypes;
        this.updateResults();
      }
    });
  }

  selectType(typeKey: string): void {
    const index = this.selectedTypes.indexOf(typeKey);

    if (index > -1) {
      this.selectedTypes.splice(index, 1);
    } else {
      if (this.selectedTypes.length < 2) {
        this.selectedTypes.push(typeKey);
      } else {
        this.selectedTypes.shift();
        this.selectedTypes.push(typeKey);
      }
    }
    this.updateResults();
  }
  clearSelection(): void {
    this.selectedTypes = [];
    this.updateResults();
  }

  isSelected(typeKey: string): boolean {
    return this.selectedTypes.includes(typeKey);
  }

  updateResults() {
    this.calculatedResults = {
      '4배 약점': [],
      '2배 약점': [],
      '1배 보통': [],
      '0.5배 저항': [],
      '0.25배 저항': [],
      '0배 무효': [],
    };
    if (this.selectedTypes.length === 0) {
      this.showInitialMessage = true;
      return;
    }

    for (const attackTypeKey in this.typeData) {
      let finalMultiplier = 1;
      // 선택된 각 방어 타입에 대해 공격 상성을 곱합니다.
      this.selectedTypes.forEach((defenseTypeKey) => {
        const currentRatios = TYPE_EFFECTIVE_DATA[defenseTypeKey];
        if (currentRatios) {
          const attackRatio = currentRatios[attackTypeKey];
          if (attackRatio !== undefined) {
            finalMultiplier *= attackRatio;
          }
        }
      });

      // 결과 분류
      let resultKey = '';
      if (finalMultiplier === 4) {
        resultKey = '4배 약점';
      } else if (finalMultiplier === 2) {
        resultKey = '2배 약점';
      } else if (finalMultiplier === 1) {
        resultKey = '1배 보통';
      } else if (finalMultiplier === 0.5) {
        resultKey = '0.5배 저항';
      } else if (finalMultiplier === 0.25) {
        resultKey = '0.25배 저항';
      } else if (finalMultiplier === 0) {
        resultKey = '0배 무효';
      }

      this.calculatedResults[resultKey].push({
        type: this.typeData[attackTypeKey],
        typeKey: attackTypeKey,
      });
    }
  }
}
