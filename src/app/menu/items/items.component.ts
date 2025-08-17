import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeItem } from 'src/app/models/item.model';
import { DataHandleService } from 'src/app/services/data-handle.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.less'],
    standalone: false
})
export class ItemsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private itemService = inject(ItemService);
  private dataHandleService = inject(DataHandleService);

  itemDatas: PokeItem[] = [];
  expandedLocation: number | null = null;
  private takenItemsMap = new Map<string, boolean>();

  ngOnInit(): void {
    // 데이터 처리
    const gameVersion = this.route.snapshot.paramMap.get('gameVersion')!;
    this.dataHandleService.setGameVersion(gameVersion);
    this.itemDatas = this.dataHandleService.itemDatas;

    if (this.itemDatas) {
      // 포켓몬 포획 정보
      this.loadAllTakenItems();
    }
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
