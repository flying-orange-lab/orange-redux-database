// src/app/sprite-card/sprite-card.component.ts
import { Component, ChangeDetectorRef } from '@angular/core';
import { DataHandleService } from 'src/app/services/data-handle.service';
import { PokemonImageService } from 'src/app/services/pokemon-image.service';

@Component({
  selector: 'app-sprite-card',
  templateUrl: './sprite-card.component.html',
  styleUrls: ['./sprite-card.component.less']
})
export class SpriteCardComponent {
  gameVersion: string | null = null;
  isSplitting: boolean = false;
  progress: number = 0;

  constructor(
    public dataHandleService: DataHandleService,
    private pokemonImageService: PokemonImageService,
    private cdr: ChangeDetectorRef // ChangeDetectorRef 주입
  ) { }

  
  ngOnInit(): void {
    // 데이터 처리
    this.dataHandleService.gameVersion$.subscribe((version) => {
      this.gameVersion = version;
    });
  }

  onFileSelected(event: Event, extra: string): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    this.isSplitting = true;
    this.progress = 0;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = async (e: any) => {
      const img = new Image();
      img.onload = async () => {
        this.cdr.detectChanges(); // UI 업데이트

        try {
          await this.pokemonImageService.splitAndStoreImage(img, extra, (progress) => {
            this.progress = progress;
            this.cdr.detectChanges(); // 진행률 업데이트마다 UI 갱신
          });
          console.log(`이미지 저장 완료`);
        } catch (error) {
          console.error('이미지 처리 중 오류 발생', error);
        } finally {
          this.isSplitting = false;
          this.cdr.detectChanges(); // UI 업데이트
        }
      };
      img.src = e.target.result as string;
    };
    reader.readAsDataURL(file);
  }

  async onDeleteDb() {
    await this.pokemonImageService.deleteDatabase();
    alert('데이터베이스가 성공적으로 삭제되었습니다.');
  }
}
