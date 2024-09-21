import { RestaurantsMenu } from "./restaurants-menu";

export class Restaurant {

    restaurantId!: string;
    restaurantName!: string;
    restaurantEmail!: string;
    restaurantAddress!: string;
    restaurantPhone!: string;
    restaurantImage!: string;
    restaurantAvgRating!: number
    menus!: RestaurantsMenu[];
}
