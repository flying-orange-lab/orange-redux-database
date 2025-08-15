// 포켓몬 타입별 방어 상성 데이터
// '공격 타입': { '방어 타입': 배율, ... }

import { TypeDisplay, TypeEffectiveData } from "../models/type.model";

// 예: 'fire': { 'water': 2, ... } -> 물 타입 공격이 불꽃 타입 방어에 2배 데미지
export const TYPE_EFFECTIVE_DATA: TypeEffectiveData = {
    "normal": { "fighting": 2, "ghost": 0 },
    "fire": { "water": 2, "ground": 2, "rock": 2, "bug": 0.5, "steel": 0.5, "fire": 0.5, "grass": 0.5, "ice": 0.5, "fairy": 0.5 },
    "water": { "electric": 2, "grass": 2, "steel": 0.5, "fire": 0.5, "water": 0.5, "ice": 0.5 },
    "grass": { "fire": 2, "ice": 2, "poison": 2, "flying": 2, "bug": 2, "ground": 0.5, "water": 0.5, "electric": 0.5, "grass": 0.5 },
    "electric": { "ground": 2, "flying": 0.5, "steel": 0.5, "electric": 0.5 },
    "ice": { "fire": 2, "fighting": 2, "rock": 2, "steel": 2, "ice": 0.5 },
    "fighting": { "flying": 2, "psychic": 2, "fairy": 2, "rock": 0.5, "bug": 0.5, "dark": 0.5 },
    "poison": { "ground": 2, "psychic": 2, "fighting": 0.5, "poison": 0.5, "bug": 0.5, "grass": 0.5, "fairy": 0.5 },
    "ground": { "water": 2, "grass": 2, "ice": 2, "electric": 0, "poison": 0.5, "rock": 0.5 },
    "flying": { "electric": 2, "ice": 2, "rock": 2, "fighting": 0.5, "bug": 0.5, "grass": 0.5, "ground": 0 },
    "psychic": { "bug": 2, "ghost": 2, "dark": 2, "fighting": 0.5, "psychic": 0.5 },
    "bug": { "fire": 2, "flying": 2, "rock": 2, "fighting": 0.5, "ground": 0.5, "grass": 0.5 },
    "rock": { "fighting": 2, "ground": 2, "steel": 2, "water": 2, "grass": 2, "normal": 0.5, "fire": 0.5, "flying": 0.5, "poison": 0.5 },
    "ghost": { "ghost": 2, "dark": 2, "poison": 0.5, "bug": 0.5, "normal": 0, "fighting": 0 },
    "dragon": { "ice": 2, "dragon": 2, "fairy": 2, "fire": 0.5, "water": 0.5, "electric": 0.5, "grass": 0.5 },
    "steel": { "fire": 2, "fighting": 2, "ground": 2, "normal": 0.5, "flying": 0.5, "rock": 0.5, "bug": 0.5, "steel": 0.5, "grass": 0.5, "psychic": 0.5, "ice": 0.5, "dragon": 0.5, "fairy": 0.5, "poison": 0 },
    "dark": { "fighting": 2, "bug": 2, "fairy": 2, "ghost": 0.5, "dark": 0.5, "psychic": 0 },
    "fairy": { "poison": 2, "steel": 2, "fighting": 0.5, "bug": 0.5, "dark": 0.5, "dragon": 0 }
};

// 모든 타입의 한글 이름 매핑
export const TYPE_DISPLAY_DATA: TypeDisplay = {
    "normal": "노말", "fire": "불꽃", "water": "물", "grass": "풀",
    "electric": "전기", "ice": "얼음", "fighting": "격투", "poison": "독",
    "ground": "땅", "flying": "비행", "psychic": "에스퍼", "bug": "벌레",
    "rock": "바위", "ghost": "고스트", "dark": "악", "dragon": "드래곤",
    "steel": "강철", "fairy": "페어리"
};