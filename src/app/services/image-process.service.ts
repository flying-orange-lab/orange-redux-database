import { Injectable } from '@angular/core';

// BlobObject 인터페이스는 다른 서비스에서도 사용되므로 외부에 정의하는 것이 좋습니다.
export interface BlobObject {
  key: string;
  blob: Blob;
}

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {
  private generationData = [
    { gen: 1, limit: 151, startY: 31, height: 1145, numRows: Math.floor(1145 / 143) },
    { gen: 2, limit: 100, startY: 1207, height: 716, numRows: Math.floor(716 / 143) },
    { gen: 3, limit: 135, startY: 1954, height: 1002, numRows: Math.floor(1002 / 143) },
    { gen: 4, limit: 110, startY: 2987, height: 859, numRows: Math.floor(859 / 143) },
    { gen: 5, limit: 157, startY: 3877, height: 1150, numRows: Math.floor(1150 / 143) },
  ];

  private tileWidth = 64;
  private tileHeight = 143; // 헤더를 포함한 원본 타일의 높이
  private headerHeight = 15;
  private croppedHeight = this.tileHeight - this.headerHeight;
  private halfHeight = this.croppedHeight / 2;
  private separator = 1;



  private toBlobAsync(canvas: HTMLCanvasElement): Promise<Blob> {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create blob from canvas.'));
        }
      }, "image/png");
    });
  }


  private makeColorTransparent(ctx: CanvasRenderingContext2D, r: number, g: number, b: number): void {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      if (data[i] === r && data[i + 1] === g && data[i + 2] === b) {
        data[i + 3] = 0;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  private isTileSolidColor(img: HTMLImageElement, sx: number, sy: number, sWidth: number, sHeight: number, r: number, g: number, b: number): boolean {
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) throw new Error('2D context not available on canvas.');

    tempCanvas.width = sWidth;
    tempCanvas.height = sHeight;
    tempCtx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight);

    const imageData = tempCtx.getImageData(0, 0, sWidth, sHeight);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      if (data[i] !== r || data[i + 1] !== g || data[i + 2] !== b) {
        return false;
      }
    }
    return true;
  }

  async splitImageBySwitch(img: HTMLImageElement, extra: string): Promise<BlobObject[]> {
    console.log(`분리시작(${extra})`);

    switch (extra) {
      case "pink":
        return await this.splitImage(img, "");
      case "red":
        return await this.splitImage(img, "-female");
      case "forms":
        return await this.splitImageForm(img);
    }

    throw new Error('Call error');
  }
  

  async splitImage(img: HTMLImageElement, suffix_value: string): Promise<BlobObject[]> {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error('2D context not available on canvas.');

    canvas.width = this.tileWidth;
    canvas.height = this.halfHeight;

    let count = 0;
    let countMinus = 0;
    const allBlobPromises: Promise<BlobObject>[] = [];

    for (const gen of this.generationData) {
      const limit = gen.limit;
      let genCount = 0;
      for (let row = 0; row < gen.numRows; row++) {
        for (let col = 0; col < 20; col++) {
          genCount++;
          if (genCount > limit) continue;

          const sx = col * (this.tileWidth + this.separator) + this.separator;
          const sy_front = gen.startY + row * this.tileHeight + this.headerHeight;
          const sWidth = this.tileWidth;
          const sHeight_full = (this.tileHeight - this.headerHeight);

          if (this.isTileSolidColor(img, sx, sy_front, sWidth, sHeight_full, 144, 176, 176)) {
            continue;
          }

          count++;
          let suffix = null;
          if ([414, 415, 427, 554].includes(count)) {
            countMinus += 1;
            switch (count) {
              case 414: // 루가루암 한밤
              case 415: // 루가루암 황혼
                suffix = count - 413;
                break;
              case 427: // 스트린더 로우폼
                suffix = count - 426;
                break;
              case 554: // 대쓰여너 청색근
                suffix = count - 553;
                break;
            }
          }
          let imageKey = String(count - countMinus).padStart(3, "0");
          if (suffix != null) {
            imageKey = `${imageKey}-${String(suffix)}`;
          }

          // --- 앞면 스프라이트 (상단 절반) ---
          const sHeight_front = this.halfHeight;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, sx, sy_front, sWidth, sHeight_front, 0, 0, canvas.width, canvas.height);
          this.makeColorTransparent(ctx, 144, 176, 176);
          allBlobPromises.push(
            this.toBlobAsync(canvas).then((blob) => (
              { key: "front-" + imageKey + suffix_value, blob: blob }
            ))
          );

          // --- 뒷면 스프라이트 (하단 절반) ---
          const sy_back = sy_front + this.halfHeight;
          const sHeight_back = this.halfHeight;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, sx, sy_back, sWidth, sHeight_back, 0, 0, canvas.width, canvas.height);
          this.makeColorTransparent(ctx, 144, 176, 176);
          allBlobPromises.push(
            this.toBlobAsync(canvas).then((blob) => (
              { key: "back-" + imageKey + suffix_value, blob: blob }
            ))
          );
        }
      }
    }

    const blobObjects = await Promise.all(allBlobPromises);
    return blobObjects;
  }

  async splitImageForm(img: HTMLImageElement): Promise<BlobObject[]> {
    console.log("분리 시작(Form)");

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error('2D context not available on canvas.');

    canvas.width = this.tileWidth;
    canvas.height = this.halfHeight;

    let count = 0;
    const allBlobPromises: Promise<BlobObject>[] = [];

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 20; col++) {
        count++;

        let keyNum = 0;
        let suffix_value = 0;
        if ([28, 29, 30].includes(count)) {
          keyNum = 351;
          suffix_value = 27;
        } else if ([31, 32, 33].includes(count)) {
          keyNum = 386;
          suffix_value = 30;
        } else if ([38, 39, 40, 41, 42].includes(count)) {
          keyNum = 479;
          suffix_value = 37;
        } else if ([43].includes(count)) {
          keyNum = 487;
          suffix_value = 42;
        } else if ([44].includes(count)) {
          keyNum = 492;
          suffix_value = 43;
        } else if ([61].includes(count)) {
          keyNum = 555;
          suffix_value = 60;
        } else if ([68].includes(count)) {
          keyNum = 641;
          suffix_value = 67;
        } else if ([69].includes(count)) {
          keyNum = 642;
          suffix_value = 68;
        } else if ([70].includes(count)) {
          keyNum = 645;
          suffix_value = 69;
        } else if ([71, 72].includes(count)) {
          keyNum = 646;
          suffix_value = 70;
        } else if ([73].includes(count)) {
          keyNum = 647;
          suffix_value = 72;
        } else if ([74].includes(count)) {
          keyNum = 648;
          suffix_value = 73;
        }

        if (keyNum == 0) {
          continue;
        }

        let imageKey = String(keyNum) + "-" + String(count - suffix_value);


        const startY = 33;

        const sx = col * (this.tileWidth + this.separator) + this.separator;
        const sy_front = startY + row * this.tileHeight + this.headerHeight;
        const sWidth = this.tileWidth;

        // --- 앞면 스프라이트 (상단 절반) ---
        const sHeight_front = this.halfHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, sx, sy_front, sWidth, sHeight_front, 0, 0, canvas.width, canvas.height); this.makeColorTransparent(ctx, 144, 176, 176);
        allBlobPromises.push(
          this.toBlobAsync(canvas).then((blob) => (
            { key: "front-" + imageKey, blob: blob }
          ))
        );

        // --- 뒷면 스프라이트 (하단 절반) ---
        const sy_back = sy_front + this.halfHeight;
        const sHeight_back = this.halfHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, sx, sy_back, sWidth, sHeight_back, 0, 0, canvas.width, canvas.height);
        this.makeColorTransparent(ctx, 144, 176, 176);
        allBlobPromises.push(
          this.toBlobAsync(canvas).then((blob) => (
            { key: "back-" + imageKey, blob: blob }
          ))
        );
      }
    }

    const blobObjects = await Promise.all(allBlobPromises);
    return blobObjects;
  }
}