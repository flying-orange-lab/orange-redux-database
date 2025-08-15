export interface WildArea {
  [regionName: string]: RegionData;
}

export interface RegionData {
  [conditionKey: string]: AreaInfo[];
}

export interface AreaInfo {
  area: string;
  encounters: Encounter[];
}

export interface Encounter {
  name: string;
  minLv: number;
  maxLv: number;
  rate: number;
}


export interface PokemonLocation {
  region: string;
  condition: string;
  area: string;
  minLv: number;
  maxLv: number;
  rate: number;
}
