import { nanoid } from "nanoid";
interface Item {
  id: string;
  product_id: string;
  color_id: string;
  size_id: string;
  price: number;
  quantity: number;
}
interface Basket {
  id: string;
  user_id: string;
  items: Item[];
  total_quantity: number;
  total_price: number;
}

interface State {
  basket: Basket;
}

export const useBasketStore = defineStore("basket", {
  state: (): State => ({
    basket: {} as Basket,
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

      return data;
    },
    async fetchBasket() {

      const supabase = useSupabaseClient();
      const { userData } = storeToRefs(useAuthStore());
      if (userData.value && userData.value.id) {
        const { data, error } = await supabase
          .from("user_basket")
          .select("*")
          .eq("user_id", userData.value.id);

        if (data && data[0]) {
          this.basket = data[0];
        }
      }
    },
    async createBasket() {
      const supabase = useSupabaseClient();
      const { userData } = storeToRefs(useAuthStore());
      if (userData.value && userData.value.id) {
        const { data, error } = await supabase
          .from("user_basket")
          .insert([
            {
              user_id: userData.value.id,
              items: [],
              total_quantity: 0,
              total_price: 0,
            },
          ] as never)
          .select();

        if (data && data[0]) {
          this.basket = data[0];
        }
      }
    },
    async updateBasket(
      product_id: string,
      size_id: string,
      color_id: string,
      price: number,
      quantity: number
    ) {
      const supabase = useSupabaseClient();
      const { userData } = storeToRefs(useAuthStore());
      if (userData.value && userData.value.id) {
        const datas = {
          id: nanoid(),
          product_id,
          size_id,
          color_id,
          price,
          quantity,
        };

        const basketItems = [...this.basket.items, datas];

        const { data, error } = await supabase
          .from("user_basket")
          .update([
            {
              id: this.basket?.id,
              user_id: userData.value.id,
              items: basketItems,
              total_quantity: 0,
              total_price: 1,
            },
          ] as never)
          .eq("user_id", userData.value.id)
          .select();

        if (data && data[0]) {
          this.basket = data[0];
        }
      }
    },
    async updateBasketItem() {
      const supabase = useSupabaseClient();
      const { userData } = storeToRefs(useAuthStore());
      if (userData.value && userData.value.id) {
        const basketItems = this.basket.items
        const { data, error } = await supabase
          .from("user_basket")
          .update([
            {
              id: this.basket?.id,
              user_id: userData.value.id,
              items: basketItems,
              total_quantity: this.basket.items.reduce((total, item) => total + item.quantity, 0),
              total_price: this.basket.items.reduce((total, item) => total + item.quantity * item.price, 0),
            },
          ] as never)
          .eq("user_id", userData.value.id)
          .select();

        if (data && data[0]) {
          this.basket = data[0];
        }
      }
    },
    async deleteBasketItem(
      basketItemId: string
    ) {
      const supabase = useSupabaseClient();
      const { userData } = storeToRefs(useAuthStore());
      if (userData.value && userData.value.id) {

        const newData = this.basket.items.filter((item) => item.id !== basketItemId)
        const basketItems = [...newData];
        const { data, error } = await supabase
          .from("user_basket")
          .update([
            {
              id: this.basket?.id,
              user_id: userData.value.id,
              items: basketItems,
              total_quantity: 0,
              total_price: 1,
            },
          ] as never)
          .eq("user_id", userData.value.id)
          .select();

        if (data && data[0]) {
          this.basket = data[0];
        }
        return { data, error }
      }
    },
  },
  getters: {},
});
