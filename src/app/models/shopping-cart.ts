import { ShoppingCartItem } from "./shopping-cart-item";

export interface ShoppingCart {
    key: string;
    items: ShoppingCartItem[];
}