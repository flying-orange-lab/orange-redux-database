import { PokemonAbility } from 'src/app/models/ability.model';
import { ABILITY_DATA } from '../ability.data';

// 오렌지 V3의 변경 기술만 기록합니다.
export const ABILITY_DATA_V3: PokemonAbility[] = [
  {
    'id': 34001,
    'name': '메가런처',
    'effect_text': '파동 기술의 위력이 1.5배 증가한다.',
  },
  {
    'id': 34002,
    'name': '옹골찬턱',
    'effect_text': '턱 기술의 위력이 1.5배 증가한다.',
  },
  {
    'id': 34003,
    'name': '단단한발톱',
    'effect_text': '접촉 기술의 위력이 1.3배 증가한다.',
  },
  {
    'id': 34004,
    'name': '예리함',
    'effect_text': '베기 기술의 위력이 1.5배 증가한다.',
  },
  {
    'id': 34005,
    'name': '고음',
    'effect_text': '소리 기술의 위력이 1.3배 증가한다.',
  },
  {
    'id': 34006,
    'name': '변환자재',
    'effect_text':
      '공격 기술을 사용하는 데 성공했을 경우, 그 기술의 타입으로 변화한다.',
  },
  {
    'id': 34007,
    'name': '정화의바디',
    'effect_text': '턴이 끝날 때 상태이상을 회복한다.',
  },
  {
    'id': 34008,
    'name': '눈치우기',
    'effect_text': '날씨가 싸라기눈일 떄 스피드가 2배 증가한다.',
  },
  {
    'id': 34009,
    'name': '엄동설한',
    'effect_text': '사용하는 모든 기술의 타입이 얼음 타입이 된다.',
  },
  {
    'id': 34010,
    'name': '승기',
    'effect_text': '상대에 의해 랭크가 하락한 경우, 특수공격이 2랭크 상승한다.',
  },
  {
    'id': 34011,
    'name': '지구력',
    'effect_text': '공격받을 경우 방어가 1랭크 상승한다.',
  },
  // 조정 목록
  {
    'id': 34012,
    'name': '선파워',
    'effect_text':
      '날씨가 쾌청일 때 특수공격이 1.5배 증가한다.\n턴이 끝날때 최대 HP의 1/16만큼이 감소한다.',
  },
  {
    'id': 34013,
    'name': '깨어진갑옷',
    'effect_text':
      '접촉기에 맞을 경우 방어가 1랭크 하락하고 스피드가 2랭크 상승한다.',
  },
  ...ABILITY_DATA,
];
