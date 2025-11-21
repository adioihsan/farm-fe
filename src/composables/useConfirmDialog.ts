// useConfirmDialog.ts
import { ref, readonly } from 'vue'

interface ConfirmDialogOptions {
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
}

const isOpen = ref(false)
const options = ref<ConfirmDialogOptions>({
  title: 'Are you absolutely sure?',
  description: 'This action cannot be undone.',
  confirmText: 'Continue',
  cancelText: 'Cancel',
})

let resolver: ((value: boolean) => void) | null = null

export function useConfirmDialog() {
  function confirm(customOptions?: ConfirmDialogOptions): Promise<boolean> {
    options.value = {
      ...options.value,
      ...customOptions,
    }
    isOpen.value = true

    return new Promise<boolean>((resolve) => {
      resolver = resolve
    })
  }

  function handleCancel() {
    isOpen.value = false
    if (resolver) {
      resolver(false)
      resolver = null
    }
  }

  function handleConfirm() {
    isOpen.value = false
    if (resolver) {
      resolver(true)
      resolver = null
    }
  }

  return {
    isOpen: readonly(isOpen),
    options: readonly(options),
    confirm,
    handleCancel,
    handleConfirm,
  }
}
