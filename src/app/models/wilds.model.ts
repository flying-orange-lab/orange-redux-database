export interface WildArea {
  locationName: string;
  regionDatas: RegionData[];
}

export interface RegionData {
  locationStatus: string;
  areaDatas: AreaInfo[];
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
