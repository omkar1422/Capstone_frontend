import { LoginUser } from "./login-user";
import { Menu } from "./Menu";

export class AddToCart {
    customer: LoginUser
    menu: Menu
    qty: number

    constructor() {
        this.customer = new LoginUser()
        this.qty = 0;
        this.menu = new Menu()
    }
}