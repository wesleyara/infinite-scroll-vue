<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref, watch } from "vue";
import { useFetch } from "../composable/useFetch";
import { useInfiniteScroll } from "@vueuse/core";

const { data, skip, isLoading } = useFetch();

const scroll = ref<HTMLElement | null>(null);
const array = ref<any[]>([]);

watch(data, () => {
  array.value.push(...data.value);
});

const getUserOnScroll = async () => {
  skip.value += 30;
};

useInfiniteScroll(scroll, getUserOnScroll, {
  distance: 3,
  canLoadMore: () => !isLoading.value,
});
</script>

<template>
  <ul
    v-if="array.length > 0"
    ref="scroll"
    class="h-[300px] overflow-auto bg-red-200"
  >
    <li v-for="item of array" :key="item">
      {{ item.firstName }}
    </li>
  </ul>
</template>
