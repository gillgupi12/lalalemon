import type { Item } from "store/basket.store";

interface Order {
    id?: string;
    created_at?: string | Date;
    user_id?: string;
    email: string;
    payment_details: {
        card_number: string;
        exp_date: string;
        ccv: string;
        cardholder: string;
    };
    items: Item[];
    order_total: number;
    order_quantity: number;
    billing_details: {
        first_name: string;
        last_name: string;
        country_code: number | null
        country: string
        phone: number | null
        address_line_1: string;
        address_line_2: string;
        region: string;
        district: string;
    };
    shipping_details: {

        first_name: string;
        last_name: string;
        country_code: number | null
        country: string;
        phone: number | null
        address_line_1: string;
        address_line_2: string;
        region: string;
        district: string;
    };
    shipping_method: {
        method: string;
        cost: number;
    };
}

interface State {
    checkoutDetails: Order;
    orders: Order[] | null;
    selectedOrder: Order | null;
}

export const useCheckOutStore = defineStore("checkout", {
    state: (): State => ({
        checkoutDetails: {
            email: "",
            payment_details: {
                card_number: "",
                exp_date: "",
                ccv: "",
                cardholder: "",
            },
            items: [],
            order_total: 0,
            order_quantity: 0,
            billing_details: {
                address_line_1: "",
                address_line_2: "",
                region: "",
                district: "",
                country: "",
                first_name: "",
                last_name: "",
                country_code: null,
                phone: null,
            },
            shipping_details: {
                address_line_1: "",
                address_line_2: "",
                region: "",
                district: "",
                country: "",
                first_name: "",
                last_name: "",
                country_code: null,
                phone: null,
            },
            shipping_method: {
                method: "FREE",
                cost: 0,
            },
        },
        orders: null,
        selectedOrder: null,
    }),
    actions: {
        async createNewOrder() {
            const supabase = useSupabaseClient();
            const { userData } = storeToRefs(useAuthStore());
            if (userData.value?.id) {
                const response = await supabase
                    .from("orders")
                    .insert([
                        {
                            user_id: userData.value.id,
                            shipping_details: this.checkoutDetails.shipping_details,
                            billing_details: this.checkoutDetails.billing_details,
                            order_total: this.checkoutDetails.order_total,
                            order_quantity: this.checkoutDetails.order_quantity,
                            email: this.checkoutDetails.email,
                            payment_details: this.checkoutDetails.payment_details,
                            shipping_method: this.checkoutDetails.shipping_method,
                            items: this.checkoutDetails.items.map((item) => {
                                let temp = { ...item };
                                delete temp.size_id;
                                return {
                                    ...temp,
                                    size: item.size_id?.size,
                                };
                            }),
                        } as Order,
                    ] as never)
                    .select();
                return response;
            }
        },
        async getUserOrders() {
            const supabase = useSupabaseClient();
            const { userData } = storeToRefs(useAuthStore());
            if (userData.value?.id) {
                const response = await supabase
                    .from("orders")
                    .select("*")
                    .eq("user_id", userData.value.id);
                if (response.data) {
                    this.orders = response.data;
                }
            }
        },
        async getUserOrder(orderId: string) {
            const supabase = useSupabaseClient();
            const { userData } = storeToRefs(useAuthStore());
            if (userData.value?.id) {
                const response = await supabase
                    .from("orders")
                    .select("*")
                    .eq("user_id", userData.value.id)
                    .eq("id", orderId);
                if (response.data && response.data[0]) {
                    this.selectedOrder = response.data[0];
                }
            }
        },
    },
});
