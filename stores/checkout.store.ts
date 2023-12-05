interface State {
    checkoutDetails: {
        email: string;
        payment_details: {
            card_number: string;
            exp_date: string;
            ccv: string;
            cardholder: string;
        };
        items: [];
        order_total: number
        order_quantity: number
        billing_details: {};
        shipping_details: {};
        shipping_method: {
            method: string
            cost: number;
        };
    };
}

export const useCheckOutStore = defineStore("checkout", {
    state: (): State => ({
        checkoutDetails: {
            email: '',
            payment_details: {
                card_number: "",
                exp_date: "",
                ccv: "",
                cardholder: "",
            },
            items: [],
            order_total: 0,
            order_quantity: 0,
            billing_details: {},
            shipping_details: {},
            shipping_method: {
                method: "FREE",
                cost: 0,
            },
        },
    }),
});
