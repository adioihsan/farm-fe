<script setup lang="ts">

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "vue-toastification";
import { useFarmStore } from "@/stores/farm.store";
import { handleApiErrors } from "@/lib/errorHandler";
import { useConfirmDialog } from "@/composables/useConfirmDialog";
import { useRouter } from "vue-router";

const router = useRouter();
const toast = useToast();
const useFarm = useFarmStore();
const { confirm } = useConfirmDialog();

defineProps<{
  farm: {
    id: string;
  };
}>();

function copy(id: string) {
  navigator.clipboard.writeText(id);
  toast.info("Farm ID copied to clipboard");
}
async function handleDelete(id: string) {
  try {
    const ok = await confirm({
      title: "Delete farm?",
      description: "This cannot be undone. All farm data will be removed.",
      confirmText: "Continue",
      cancelText: "Cancel",
    });
    console.log("isOk:", ok);
    if (!ok) return;

    await useFarm.deleteFarm(id);
    toast.success("Farm deleted successfully");
  } catch (error: unknown) {
    const errMsg = handleApiErrors(error, undefined);
    toast.error(errMsg);
  }
}
function handleUpdate(id: string) {
  router.push(`/farm/${id}/update`);
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        Actions
        <!-- <MoreHorizontal class="w-4 h-4" /> -->
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="handleUpdate(farm.id)"> Edit </DropdownMenuItem>
      <DropdownMenuItem @click="handleDelete(farm.id)">Delete</DropdownMenuItem>
      <DropdownMenuItem @click="copy(farm.id)"> Copy Farm ID </DropdownMenuItem>
      <DropdownMenuSeparator />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
