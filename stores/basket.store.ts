interface Item {
    product_id: string
    color_id: string
    size_id: string
    price: number
    quantity: number


}

interface State {
    basket: Item[] | []
}


export const useBasketStore = defineStore("basket", {
    state: (): State => ({
        basket: [],
    }),
    actions: {

    },
    getters: {

    },
});
