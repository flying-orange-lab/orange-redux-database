export interface MartItem {
  locationName: string;
  items: MartItemDetail[];
}

export interface MartItemDetail {
  name: string;
  price: number;
}
