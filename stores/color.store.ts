interface Color {
    id: string;
    name: string;
    description: string;
    hex_code: string
    images: string[]
}

interface State {
    allColors: Color[] | null;
}


export const useColorStore = defineStore("colors", {
    state: (): State => ({
        allColors: null,
    }),
    actions: {
        async getAllColors() {
            const supabase = useSupabaseClient();
            const { data, error } = await supabase.from("colors").select("*");
            if (data) {
                this.allColors = data as Color[]
            }
        },
    },
    getters: {
        getColor: (state) => (colorId: string) => {
            return state.allColors?.find((color) => color.id === colorId)
        }
    },
});
