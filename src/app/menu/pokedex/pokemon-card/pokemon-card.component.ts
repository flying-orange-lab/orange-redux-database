import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PokemonImageService } from 'src/app/services/pokemon-image.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.less']
})
export class PokemonCardComponent {
  @Input() pokemon: any;
  currentFormIndex: number = 0;
  hasGender: boolean = false;

  isFront: boolean = true;
  isGenderFemale: boolean = false;

  currentImageUrl: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/substitute.png';

  constructor(
    private pokemonService: PokemonService,
    private pokemonImageService: PokemonImageService
  ) { }

  async ngOnInit() {
    const keyUrl = this.currentKeyname + "-female";
    this.hasGender = await this.pokemonImageService.hasImage(keyUrl);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemon'] && this.pokemon) {
      this.currentFormIndex = 0; // 새로운 포켓몬이 로드되면 폼을 초기화
      this.updateImageUrl();
    }
  };


  get currentPokemon(): any {
    // 폼이 있다면 현재 선택된 폼의 데이터를, 없다면 포켓몬 기본 데이터를 반환
    return this.pokemon.form?.[this.currentFormIndex] || this.pokemon;
  }

  get currentKeyname(){
    let urlKey = String(this.pokemon.id).padStart(3, "0");

    const prefix = this.isFront ? "front" : "back";
    urlKey = `${prefix}-${urlKey}`;

    if (this.currentFormIndex > 0) {
      urlKey += `-${this.currentFormIndex}`;
    }
    return urlKey;
  }

  get displayId() {
    return "#" + String(this.pokemon.id).padStart(3, "0")
  }

  displayType(typeName: string) {
    return this.pokemonService.engToKorTypeMapper(typeName);
  }

  // 폼 선택
  selectForm(index: number): void {
    if (this.currentFormIndex !== index) {
      this.currentFormIndex = index;
      this.updateImageUrl(); // 폼이 바뀌면 이미지 업데이트
    }
  }

  // 앞/뒷면 토글
  toggleSprite(): void {
    this.isFront = !this.isFront;
    this.updateImageUrl(); // 앞/뒷면이 바뀌면 이미지 업데이트
  }

  // 성별 토글
  toggleGender(): void {
    this.isGenderFemale = !this.isGenderFemale;
    this.updateImageUrl(); // 성별이 바뀌면 이미지 업데이트
  }

  async updateImageUrl(): Promise<void> {
    let urlKey = this.currentKeyname;
    if (this.isGenderFemale) {
      const genderKey = urlKey + "-female";
      if (await this.pokemonImageService.hasImage(genderKey)) {
        urlKey = genderKey;
      }
    }

    const imageBlob = await this.pokemonImageService.getImage(urlKey);
    if (!imageBlob) {
      this.currentImageUrl = "";
    } else {
      this.currentImageUrl = URL.createObjectURL(imageBlob);
    }
  }

  // 방어 상성 페이지로 이동하는 함수
  goToDefensePage(types: string[]): void {
    const typeParams = types.map(type => `type=${type}`).join('&');
    window.location.href = `defense?${typeParams}`;
  }

  // 추가적인 폼, 성별 로직 등은 이 컴포넌트 내부에 구현됩니다.

  ngOnDestroy(): void {
    if (this.currentImageUrl) {
      URL.revokeObjectURL(this.currentImageUrl);
    }
  }

}
