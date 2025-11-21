<template>
  <div class="w-full">
    <FarmTable :columns="farmColumns" :data="farmStore.farms" />
  </div>
</template>

<script setup lang="ts">
import { farmColumns } from "@/components/pages/farm/columns";
import FarmTable from "@/components/pages/farm/farmTable.vue";
import { useFarmStore } from "@/stores/farm.store";
import { onMounted } from "vue";

const farmStore = useFarmStore()

onMounted(()=>{
    farmStore.init()
})

</script>
