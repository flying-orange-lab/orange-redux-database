import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { ImageProcessingService } from './image-process.service';

interface ImageBlob {
  id: string; // 키가 string 타입
  data: Blob;
}


@Injectable({
  providedIn: 'root'
})
export class PokemonImageService extends Dexie {
  pokemonImages: Dexie.Table<ImageBlob, string>;

  constructor(private imageProcessingService: ImageProcessingService) {
    super('PokemonImageDB');
    this.version(1).stores({
      images: 'id' // 'id'가 프라이머리 키(primary key)
    })
    this.pokemonImages = this.table('images');

  }

  /**
   * 이미지를 IndexedDB에 캐싱합니다.
   * @param id 이미지의 고유 키 (예: '640.png')
   * @param blob 이미지 Blob 데이터
   */
  async putImage(id: string, blob: Blob): Promise<string> {
    const key = this.pokemonImages.put({ id, data: blob });
    return key;
  }

  /**
   * IndexedDB에서 이미지를 가져옵니다.
   * @param id 이미지의 고유 키
   * @returns Promise<Blob | undefined>
   */
  async getImage(id: string): Promise<Blob | undefined> {
    const image = await this.pokemonImages.get(id);
    return image?.data;
  }

  /**
   * IndexedDB에 특정 이미지가 존재하는지 확인합니다.
   * @param id 이미지의 고유 키
   * @returns Promise<boolean>
   */
  async hasImage(id: string): Promise<boolean> {
    const count = await this.pokemonImages.where('id').equals(id).count();
    return count > 0;
  }

  async deleteDatabase(): Promise<void> {
    await this.delete(); // this는 Dexie 인스턴스입니다.
    console.log('데이터베이스가 삭제되었습니다.');
  }

  // 모든 이미지 분리 및 저장 로직을 서비스 메서드로 이동
  async splitAndStoreImage(img: HTMLImageElement, extra: string, onProgress: (progress: number) => void): Promise<void> {
    const blobObjects = await this.imageProcessingService.splitImageBySwitch(img, extra);
    let putCount = 0;

    // 이 부분을 트랜잭션으로 수정하여 성능을 개선합니다.
    await this.transaction('rw', this.pokemonImages, async () => {
      for (const { key, blob } of blobObjects) {
        await this.pokemonImages.put({ id: key, data: blob });
        putCount++;
        const progress = Math.floor((putCount / blobObjects.length) * 100);
        onProgress(progress);
      }
    });

    console.log("분리 및 저장 완료");
  }
}