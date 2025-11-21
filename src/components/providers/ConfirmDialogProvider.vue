<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useConfirmDialog } from '@/composables/useConfirmDialog'

const { isOpen, options, handleCancel, handleConfirm } = useConfirmDialog()
</script>

<template>
  <!-- no @update:open here -->
  <AlertDialog :open="isOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ options.title }}</AlertDialogTitle>
        <AlertDialogDescription>
          {{ options.description }}
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel @click="handleCancel">
          {{ options.cancelText }}
        </AlertDialogCancel>
        <AlertDialogAction @click="handleConfirm">
          {{ options.confirmText }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
