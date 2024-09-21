export class RestaurantsMenu {

  menuId!: number;
  menuName!: string;
  menuPrice!: number;
  menuImage!: string;
  quantity: number;

  constructor() {
    this.quantity = 0
  }
}