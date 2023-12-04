import { defineStore } from "pinia";
export interface UserAppMetadata {
  provider?: string;
  [key: string]: any;
}

export interface UserMetadata {
  [key: string]: any;
}
export interface UserIdentity {
  id: string;
  user_id: string;
  identity_data?: {
    [key: string]: any;
  };
  provider: string;
  created_at?: string;
  last_sign_in_at?: string;
  updated_at?: string;
}
export interface Factor {
  /** ID of the factor. */
  id: string;

  /** Friendly name of the factor, useful to disambiguate between multiple factors. */
  friendly_name?: string;

  /**
   * Type of factor. Only `totp` supported with this version but may change in
   * future versions.
   */
  factor_type: "totp" | string;

  /** Factor's status. */
  status: "verified" | "unverified";

  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  app_metadata: UserAppMetadata;
  user_metadata: UserMetadata;
  aud: string;
  confirmation_sent_at?: string;
  recovery_sent_at?: string;
  email_change_sent_at?: string;
  new_email?: string;
  new_phone?: string;
  invited_at?: string;
  action_link?: string;
  email?: string;
  phone?: string;
  created_at: string;
  confirmed_at?: string;
  email_confirmed_at?: string;
  phone_confirmed_at?: string;
  last_sign_in_at?: string;
  role?: string;
  updated_at?: string;
  identities?: UserIdentity[];
  factors?: Factor[];
}

export interface Address {
  id: string;
  address_title: string;
  first_name: string;
  last_name: string;
  country_code: number;
  country: string;
  phone: number;
  address_line_1: string;
  address_line_2: string;
  region: string;
  district: string;
}

interface State {
  userData: User | null;
  userAddresses: Address[];
}

export const useAuthStore = defineStore("auth", {
  state: (): State => ({
    userData: null,
    userAddresses: [],
  }),
  actions: {
    async updateUserData(userData: {
      email: string;
      firstName: string;
      lastName: string;
    }) {
      const supabase = useSupabaseClient();
      const response = await supabase.auth.updateUser({
        email: userData.email,
        data: { firstName: userData.firstName, lastName: userData.lastName },
      });
      if (response.error) {
        return response;
      } else if (response.data.user) {
        this.userData = response.data.user;
        return response;
      }
    },
    async updateUserPassword(password: string) {
      const supabase = useSupabaseClient();
      const response = await supabase.auth.updateUser({ password });
      if (response.error) {
        return response;
      } else if (response.data.user) {
        // this.userData = response.data.user
        return response;
      }
    },
    async addNewAddress(address: {
      address_title: string;
      first_name: string;
      last_name: string;
      country_code: number;
      phone: number;
      address_line_1: string;
      address_line_2: string;
      region: string;
      district: string;
      country: string;
    }) {
      const supabase = useSupabaseClient();
      const response = await supabase
        .from("user_address")
        .insert([
          {
            user_id: this.userData?.id,
            address_title: address.address_title,
            first_name: address.first_name,
            last_name: address.last_name,
            country_code: address.country_code,
            country: address.country,
            phone: address.phone,
            address_line_1: address.address_line_1,
            address_line_2: address.address_line_2,
            region: address.region,
            district: address.district,
          },
        ] as never)
        .select();
      return response;
    },
    async updateAddress(address: {
      id: string;
      address_title: string;
      first_name: string;
      last_name: string;
      country_code: number;
      phone: number;
      address_line_1: string;
      address_line_2: string;
      region: string;
      district: string;
      country: string;
    }) {
      const supabase = useSupabaseClient();
      const response = await supabase
        .from("user_address")
        .update({
          id: address.id,
          address_title: address.address_title,
          first_name: address.first_name,
          last_name: address.last_name,
          country_code: address.country_code,
          country: address.country,
          phone: address.phone,
          address_line_1: address.address_line_1,
          address_line_2: address.address_line_2,
          region: address.region,
          district: address.district,
        } as never)
        .eq("id", address.id)
        .select();
      return response;
    },
    async deleteAddress(addressId: string) {
      const supabase = useSupabaseClient();
      const response = await supabase
        .from("user_address")
        .delete()
        .eq("id", addressId);
      return response;
    },
    async getUserAddresses() {
      const supabase = useSupabaseClient();
      if (this.userData?.id) {
        const response = await supabase
          .from("user_address")
          .select("*")
          .eq("user_id", this.userData.id);
        if (response.error) {
          return response;
        } else if (response.data) {
          this.userAddresses = response.data as any;
          return response;
        }
      }
    },
  },
});
