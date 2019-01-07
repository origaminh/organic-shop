import { Product } from './product';

export interface ShoppingCartItem {
    key: string;
    product: Product;
    quantity: number;
}