import { inject, Injectable } from '@angular/core';
import Dexie from 'dexie';
import { DataHandleService } from './data-handle.service';

export interface TakenItem {
  locationIndex: number;
  itemIndex: number;
}

@Injectable({
  providedIn: 'root',
})
export class ItemService extends Dexie {
  private dataHandleService = inject(DataHandleService);
  takenItems!: Dexie.Table<TakenItem, [number, number]>;

  constructor() {
    super('ItemDB');
  }

  async init() {
    let prefix = '';
    if (this.dataHandleService.getGameVersion() != 'orange_v3') {
      prefix = `${this.dataHandleService.getGameVersion()}_`;
    }

    this.version(1).stores({
      [`${prefix}takenItems`]: '[locationIndex+itemIndex]',
    });

    this.takenItems = this.table(`${prefix}takenItems`);
    await this.open();
  }

  /**
   * 아이템이 획득되었는지 확인
   */
  async isItemTaken(
    locationIndex: number,
    itemIndex: number,
  ): Promise<boolean> {
    const item = await this.takenItems.get([locationIndex, itemIndex]);
    return !!item;
  }

  /**
   * 아이템 획득 상태를 토글
   */
  async toggleItemTaken(
    locationIndex: number,
    itemIndex: number,
  ): Promise<void> {
    const isTaken = await this.isItemTaken(locationIndex, itemIndex);

    if (isTaken) {
      await this.takenItems.delete([locationIndex, itemIndex]);
    } else {
      await this.takenItems.put({ locationIndex, itemIndex });
    }
  }
}
