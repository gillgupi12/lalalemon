interface Category {
    id: string;
    name: string;
    description: string;

}

interface State {
    allCategories: Category[] | null;
}


export const useCategoryStore = defineStore("categories", {
    state: (): State => ({
        allCategories: null,
    }),
    actions: {
        async getAllCategories() {
            const supabase = useSupabaseClient();
            const { data, error } = await supabase.from("categories").select("*");
            if (data) {
                this.allCategories = data
            }
        },
    },
    getters: {
        getCategory: (state) => (categoryId: string) => {
            return state.allCategories?.find((category) => category.id === categoryId)
        }
    },
});
