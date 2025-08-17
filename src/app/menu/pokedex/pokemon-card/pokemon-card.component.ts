import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { DataHandleService } from 'src/app/services/data-handle.service';
import { PokemonImageService } from 'src/app/services/pokemon-image.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.less'],
  standalone: false,
})
export class PokemonCardComponent implements OnInit, OnDestroy, OnChanges {
  private router = inject(Router);
  private dataHandleService = inject(DataHandleService);
  private pokemonService = inject(PokemonService);
  private pokemonImageService = inject(PokemonImageService);

  @Input() pokemon: any;
  @Input() useSprite: boolean = false;
  currentPokemonStats: number[] = [0, 0, 0, 0, 0, 0, 0];
  hasGender = false;
  isFront = true;
  isGenderFemale = false;

  currentFormIndex = 0;
  currentImageUrl = '';

  async ngOnInit() {
    // sprite 출력이 필요한 경우에만 처리
    if (this.useSprite) {
      const keyUrl = this.currentKeyname + '-female';
      this.hasGender = await this.pokemonImageService.hasImage(keyUrl);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemon'] && this.pokemon) {
      this.currentFormIndex = 0; // 새로운 포켓몬이 로드되면 폼을 초기화
      this.updatePokemonInfo();
    }
  }

  get currentPokemon(): any {
    // 폼이 있다면 현재 선택된 폼의 데이터를, 없다면 포켓몬 기본 데이터를 반환
    return this.pokemon.form?.[this.currentFormIndex] || this.pokemon;
  }

  get currentImageAltPath() {
    let altPath = this.pokemon.imageUrl;
    if (!altPath && this.pokemon.form) {
      altPath = this.pokemon.form[this.currentFormIndex].imageUrl;
    }
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${altPath}`;
  }

  get currentStats() {
    let stats = this.pokemon.stats;
    if (!stats && this.pokemon.form) {
      return this.pokemon.form[this.currentFormIndex].stats;
    }
    return stats;
  }

  get currentKeyname() {
    let urlKey = String(this.pokemon.id).padStart(3, '0');

    const prefix = this.isFront ? 'front' : 'back';
    urlKey = `${prefix}-${urlKey}`;

    if (this.currentFormIndex > 0) {
      urlKey += `-${this.currentFormIndex}`;
    }
    return urlKey;
  }

  get displayId() {
    return '#' + String(this.pokemon.id).padStart(3, '0');
  }

  displayType(typeName: string) {
    return this.pokemonService.engToKorTypeMapper(typeName);
  }

  // 폼 선택
  selectForm(index: number): void {
    if (this.currentFormIndex !== index) {
      this.currentFormIndex = index;
      this.updatePokemonInfo(); // 폼이 바뀌면 이미지 업데이트
    }
  }

  // 앞/뒷면 토글
  toggleSprite(): void {
    this.isFront = !this.isFront;
    this.updatePokemonInfo(); // 앞/뒷면이 바뀌면 이미지 업데이트
  }

  // 성별 토글
  toggleGender(): void {
    this.isGenderFemale = !this.isGenderFemale;
    this.updatePokemonInfo(); // 성별이 바뀌면 이미지 업데이트
  }

  // 포켓몬 정보 업데이트
  async updatePokemonInfo() {
    this.currentPokemonStats = this.currentStats;
    await this.updateImageUrl();
  }

  async updateImageUrl(): Promise<void> {
    // sprite 출력이 필요한 경우에만 처리
    if (!this.useSprite) {
      this.currentImageUrl = this.currentImageAltPath;
      return;
    }

    let urlKey = this.currentKeyname;
    if (this.isGenderFemale) {
      const genderKey = urlKey + '-female';
      if (await this.pokemonImageService.hasImage(genderKey)) {
        urlKey = genderKey;
      }
    }

    const imageBlob = await this.pokemonImageService.getImage(urlKey);
    if (!imageBlob) {
      this.currentImageUrl = this.currentImageAltPath;
    } else {
      this.currentImageUrl = URL.createObjectURL(imageBlob);
    }
  }

  // 방어 상성 페이지로 이동하는 함수
  goToDefensePage(types: string[]): void {
    const gameVersion = this.dataHandleService.getGameVersion();
    this.router.navigate([gameVersion, 'defense'], {
      queryParams: { type: types },
    });
  }

  // 추가적인 폼, 성별 로직 등은 이 컴포넌트 내부에 구현됩니다.

  ngOnDestroy(): void {
    if (this.currentImageUrl) {
      URL.revokeObjectURL(this.currentImageUrl);
    }
  }
}
