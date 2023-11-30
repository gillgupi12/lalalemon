import { nanoid } from "nanoid";
interface Item {
    id: string;
    product_id: string;
    color_id: string;
    size_id: string;
    price: number;
    quantity: number;
}

interface State {
    basket: Item[];
}

export const useBasketStore = defineStore("basket", {
    state: (): State => ({
        basket: [],
    }),
    actions: {
        addToBasket(
            product_id: string,
            size_id: string,
            color_id: string,
            price: number,
            quantity: number
        ) {
            const data = {
                id: nanoid(),
                product_id,
                size_id,
                color_id,
                price,
                quantity,
            };

            this.basket.push(data);
        },
    },
    getters: {},
});
