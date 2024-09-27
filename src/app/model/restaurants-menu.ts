export class RestaurantsMenu {

  menuId!: number;
  menuName!: string;
  menuPrice!: number;
  menuImage!: string;
  quantity: number;
  menuDescription !: string
  menuType !: string

  constructor() {
    this.quantity = 0
  }
}