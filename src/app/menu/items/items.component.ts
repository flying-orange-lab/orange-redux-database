import { Component } from '@angular/core';
import { ITEM_DATA_V3 } from 'src/app/datas/item.data';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.less'],
})
export class ItemsComponent {
  itemDatas = ITEM_DATA_V3;
  expandedLocation: number | null = null;
  private takenItemsMap: Map<string, boolean> = new Map();

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadAllTakenItems();
  }

  async loadAllTakenItems(): Promise<void> {
    for (let i = 0; i < this.itemDatas.length; i++) {
      for (let j = 0; j < this.itemDatas[i].itemList.length; j++) {
        const isTaken = await this.itemService.isItemTaken(i, j);
        if (isTaken) {
          this.takenItemsMap.set(`${i}-${j}`, true);
        }
      }
    }
  }

  isItemTaken(locationIndex: number, itemIndex: number): boolean {
    return this.takenItemsMap.has(`${locationIndex}-${itemIndex}`);
  }

  async toggleItemStatus(
    locationIndex: number,
    itemIndex: number
  ): Promise<void> {
    const key = `${locationIndex}-${itemIndex}`;
    const isCurrentlyTaken = this.isItemTaken(locationIndex, itemIndex);

    // IndexedDB에 상태 업데이트 요청
    await this.itemService.toggleItemTaken(locationIndex, itemIndex);

    // 로컬 상태(Map) 업데이트
    if (isCurrentlyTaken) {
      this.takenItemsMap.delete(key);
    } else {
      this.takenItemsMap.set(key, true);
    }
  }
  toggleExpand(locationIndex: number): void {
    if (this.expandedLocation === locationIndex) {
      this.expandedLocation = null; // 이미 열려 있으면 닫기
    } else {
      this.expandedLocation = locationIndex; // 다른 서랍 열기
    }
  }
}
