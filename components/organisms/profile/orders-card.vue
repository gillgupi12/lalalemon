<script setup lang="ts">
import Card from "components/organisms/common/card.vue";
import { useDateFormat } from "@vueuse/core";
const router = useRouter();

const loading = ref(true);
const { getUserOrders } = useCheckOutStore();
const { orders } = storeToRefs(useCheckOutStore());
const handleGetUserOrders = async () => {
  loading.value = true;
  getUserOrders();
  loading.value = false;
};
onMounted(async () => {
  loading.value = true;
  await handleGetUserOrders();
  loading.value = false;
});

const goToOrder = (orderId: string) => {
  router.push({
    name: "profile-orders-orderId",
    params: { orderId },
  });
};
</script>

<template>
  <Card>
    <div class="flex flex-col gap-4">
      <div class="flex flex-row items-center justify-between">
        <div />
        <div class="text-center font-bold text-lg">Your Order History</div>
        <div />
      </div>

      <USkeleton v-if="loading" class="bg-gray-200 text-black h-40" />
      <div v-if="!loading && orders">
        <div v-if="orders && orders.length > 0">
          <div
            v-for="(order, i) in orders"
            :key="i"
            class="bg-white border rounded-md p-2 mb-1"
          >
            <div class="flex flex-row justify-between items-center">
              <div class="flex flex-col justify-between w-full">
                <div>
                  <div class="text-base">
                    <span class="text-slate-500"> Order Number </span>
                    <span>{{ order.id }}</span>
                  </div>
                  <div class="text-base">
                    <span class="text-slate-500"> Date Ordered </span>
                    <span>
                      {{
                        useDateFormat(order.created_at, "Do MMM,YYYY").value
                      }}</span
                    >
                  </div>
                </div>
                <div class="flex flex-row justify-between items-end">
                  <div class="font-bold text-slate-500">
                    <span>HKD${{ order.order_total }}</span>
                  </div>
                </div>
              </div>
              <UButton
                color="white"
                size="xl"
                label="VIEW ORDER"
                class="flex flex-row items-center justify-center rounded-none border-black border hover:bg-black hover:text-white h-fit"
                @click="goToOrder(order.id as string)"
              />
            </div>
          </div>
        </div>
        <div v-else>
          <div class="text-xs text-center">
            Don't see your order? Please note it may take 5-10 minutes to
            appear. We appreciate your patience, thank you.
          </div>
          <UButton
            label="BEGIN SHOPPING"
            color="red"
            class="rounded-none w-full text-center flex items-center justify-center py-4"
            @click="router.push('/')"
          />
        </div>
      </div>
    </div>
  </Card>
</template>
