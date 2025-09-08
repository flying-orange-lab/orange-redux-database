import { Injectable } from '@angular/core';
import { TYPE_EFFECTIVE_DATA, TYPE_LABEL } from '../datas/type.data';

@Injectable()
export class DefenseService {
  selectedTypes: string[] = [];
  calculatedResults: Record<string, string[]> = {};

  private typeData = TYPE_LABEL;

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
  }

  clearType() {
    this.selectedTypes = [];
  }

  updateDefense() {
    this.calculatedResults = {
      '4배 약점': [],
      '2배 약점': [],
      '1배 보통': [],
      '0.5배 저항': [],
      '0.25배 저항': [],
      '0배 무효': [],
    };
    if (this.selectedTypes.length === 0) {
      return;
    }

    for (const attackTypeKey of this.typeData) {
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

      this.calculatedResults[resultKey].push(attackTypeKey);
    }
  }
}
