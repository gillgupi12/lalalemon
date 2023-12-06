<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";
const route = useRoute();
const orderId = route.params.orderId.toString();

const { getUserOrder } = useCheckOutStore();
const { selectedOrder } = storeToRefs(useCheckOutStore());
const { getColor } = useColorStore();
const loading = ref(false);
onMounted(async () => {
  loading.value = true;
  await getUserOrder(orderId);
  loading.value = false;
});

const columns = [
  {
    key: "id",
    label: "Item Name",
  },
  {
    key: "size",
    label: "Size",
  },
  {
    key: "color_id",
    label: "Color",
  },
  {
    key: "quantity",
    label: "Qty",
  },
  {
    key: "price",
    label: "Price",
  },
  {
    key: "sub-total",
    label: "SubTotal",
  },
];
</script>

<template>
  <div class="container max-w-5xl mx-auto">
    <div v-if="!loading && selectedOrder?.id" class="py-10">
      <UCard>
        <template #header>
          <div class="flex flex-row justify-between">
            <div>
              <span class="font-bold text-gray-600">
                ORDER No.{{ selectedOrder?.id }} -</span
              >
              {{
                useDateFormat(selectedOrder?.created_at, "Do MMM,YYYY").value
              }}

              <div>Sent to: {{ selectedOrder?.email }}</div>
            </div>
            <div class="flex flex-col text-right">
              <span class="font-bold text-gray-600">
                Total HKD$ {{ selectedOrder?.order_total }}
              </span>
            </div>
          </div>
        </template>

        <div class="md:grid grid-cols-4 gap-10 w-fit flex flex-col space-y-2">
          <div class="col-span-3 flex flex-col space-y-4 w-full">
            <div v-if="selectedOrder && selectedOrder.items">
              <p class="font-light text-gray-500">Order Items</p>
              <UTable
                :columns="columns"
                :rows="selectedOrder.items"
                class="border rounded-md"
              >
                <template #color_id-data="{ row, column }">
                  <span class="capitalize">
                    {{ getColor(row.color_id)?.name }}</span
                  >
                </template>
                <template #sub-total-data="{ row, column }">
                  <span class="capitalize">
                    {{ row.quantity * row.price }}
                  </span>
                </template>
              </UTable>
            </div>
            <div class="w-fit">
              <div>
                <span class="font-light text-gray-500">Shipping Method</span>
              </div>
              <div class="flex flex-col md:flex-row justify-between w-full">
                <p class="font-normal">1-3 Business Days(FREE)</p>
              </div>
            </div>
          </div>
          <div class="col-span-1 flex flex-col gap-4">
            <div
              v-if="selectedOrder?.shipping_details"
              class="w-full flex flex-col text-left"
            >
              <span class="font-light text-gray-500">Shipping Address</span>
              <div>
                <p>
                  {{ selectedOrder.shipping_details?.first_name }}
                  {{ selectedOrder.shipping_details?.last_name }}
                </p>
                <p>
                  {{ selectedOrder.shipping_details?.country_code }}
                  {{ selectedOrder.shipping_details?.phone }}
                </p>
                <p>{{ selectedOrder.shipping_details?.address_line_1 }}</p>
                <p>{{ selectedOrder.shipping_details?.address_line_2 }}</p>
                <p>{{ selectedOrder.shipping_details?.district }}</p>
                <p>{{ selectedOrder.shipping_details?.region }}</p>
                <p>{{ selectedOrder.shipping_details?.country }}</p>
              </div>
            </div>

            <div
              v-if="selectedOrder?.billing_details"
              class="w-full flex flex-col text-left"
            >
              <span class="font-light text-gray-500">Billiing Address</span>
              <div>
                <p>
                  {{ selectedOrder.billing_details?.first_name }}
                  {{ selectedOrder.billing_details?.last_name }}
                </p>
                <p>
                  {{ selectedOrder.billing_details?.country_code }}
                  {{ selectedOrder.billing_details?.phone }}
                </p>
                <p>{{ selectedOrder.billing_details?.address_line_1 }}</p>
                <p>{{ selectedOrder.billing_details?.address_line_2 }}</p>
                <p>{{ selectedOrder.billing_details?.district }}</p>
                <p>{{ selectedOrder.billing_details?.region }}</p>
                <p>{{ selectedOrder.billing_details?.country }}</p>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </div>
    <div v-else class="py-10">
      <UCard>
        <template #header> <USkeleton class="h-10" /> </template>
        <USkeleton class="h-96" />
      </UCard>
    </div>
  </div>
</template>
