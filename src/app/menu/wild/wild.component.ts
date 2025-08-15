import { Component, QueryList, ViewChildren } from '@angular/core';
import { POKEMON_WILDS_V3 } from 'src/app/datas/wilds.data';
import { WildRegionComponent } from './wild-region/wild-region.component';

@Component({
  selector: 'app-wild',
  templateUrl: './wild.component.html',
  styleUrls: ['./wild.component.less']
})
export class WildComponent {
  wildData = POKEMON_WILDS_V3

  @ViewChildren(WildRegionComponent) wildRegionComponents!: QueryList<WildRegionComponent>;

  constructor() { }
  
  toggleChild(index: number): void {
    // QueryList는 배열처럼 인덱스로 접근 가능합니다.
    const component = this.wildRegionComponents.get(index);
    if (component) {
      component.toggleExpanded();
    }
  }

}
