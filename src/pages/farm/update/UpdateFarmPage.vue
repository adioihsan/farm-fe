<template>
  <div class="flex items-center justify-center h-svh">
    <Card class="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Update Farm</CardTitle>
        <CardDescription>
          Edit the farm information below and save changes
        </CardDescription>
        <CardAction>
          <Button variant="link" @click="router.push('/farm')">
            Back to Farm List
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <div
          v-if="isPageLoading"
          class="py-8 text-center text-sm text-muted-foreground"
        >
          Loading farm data...
        </div>
        <Form
          v-else
          as="form"
          :validation-schema="schema"
          :validate-on-mount="false"
          @submit="onSubmit"
          v-slot="{ isSubmitting, submitCount }"
        >
          <div class="grid w-full items-center gap-4">
            <div class="flex flex-col space-y-1.5">
              <Label for="farmName">Farm Name</Label>
              <Field
                name="farmName"
                :value="useFarm.selectedFarm?.farmName"
                v-slot="{ field, errorMessage, meta }"
              >
                <Input
                  id="farmName"
                  type="text"
                  placeholder="Example Farm"
                  v-bind="field"
                  :default-value="useFarm.selectedFarm?.farmName"
                />
                <small
                  class="text-red-500"
                  v-if="(meta.touched || submitCount > 0) && errorMessage"
                >
                  {{ errorMessage }}
                </small>
              </Field>
            </div>

            <div class="flex flex-col space-y-1.5">
              <Label for="ownerName">Owner Name</Label>
              <Field
                name="ownerName"
                :value="useFarm.selectedFarm?.ownerName"
                v-slot="{ field, errorMessage, meta }"
              >
                <Input
                  id="ownerName"
                  type="text"
                  placeholder="Owner name"
                  v-bind="field"
                  :default-value="useFarm.selectedFarm?.ownerName"
                />
                <small
                  class="text-red-500"
                  v-if="(meta.touched || submitCount > 0) && errorMessage"
                >
                  {{ errorMessage }}
                </small>
              </Field>
            </div>

            <div class="flex flex-col space-y-1.5">
              <Label for="location">Location</Label>
              <Field
                name="location"
                :value="useFarm.selectedFarm?.location"
                v-slot="{ field, errorMessage, meta }"
              >
                <Input
                  id="location"
                  type="text"
                  placeholder="Farm location"
                  v-bind="field"
                  :default-value="useFarm.selectedFarm?.location"
                />
                <small
                  class="text-red-500"
                  v-if="(meta.touched || submitCount > 0) && errorMessage"
                >
                  {{ errorMessage }}
                </small>
              </Field>
            </div>

            <div class="flex flex-col space-y-1.5">
              <Label for="isPartner">Is Partner</Label>
              <Field
                name="isPartner"
                :value="
                  useFarm.selectedFarm
                    ? useFarm.selectedFarm.isPartner
                      ? 'yes'
                      : 'no'
                    : ''
                "
                v-slot="{ field, errorMessage, meta }"
              >
                <select
                  id="isPartner"
                  v-bind="field"
                  class="w-full h-10 px-3 rounded-md border bg-background text-sm"
                >
                  <option value="">-- Select --</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>

                <small
                  class="text-red-500"
                  v-if="(meta.touched || submitCount > 0) && errorMessage"
                >
                  {{ errorMessage }}
                </small>
              </Field>
            </div>
          </div>

          <Button class="w-full mt-4" :disabled="isSubmitting" type="submit">
            <Spinner v-if="isSubmitting" />
            <span>Save Changes</span>
          </Button>
        </Form>
      </CardContent>

      <CardFooter class="flex flex-col gap-2">
        <p class="text-xs text-muted-foreground text-center">
          Changes will be applied to this farm only.
        </p>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, Field } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { useToast } from "vue-toastification";
import { Spinner } from "@/components/ui/spinner";
import { useFarmStore } from "@/stores/farm.store";
import {
  updateFarmFormSchema,
  type UpdateFarmForm,
} from "@/schema/farm.schema";

import { handleApiErrors } from "@/lib/errorHandler";

const router = useRouter();
const route = useRoute();
const toast = useToast();
const useFarm = useFarmStore();

const schema = toTypedSchema(updateFarmFormSchema);

const isPageLoading = ref(true);
const farmId = route.params.id as string;

onMounted(async () => {
  try {
    const farm = await useFarm.fetchFarmDetail(farmId);
    if (!farm) {
      toast.error("Farm not found");
      router.push("/farm");
      return;
    }
  } catch (error) {
    toast.error("Failed to load farm data");
    router.push("/farm");
  } finally {
    isPageLoading.value = false;
  }
});

const onSubmit = async (values: any, { setFieldError }: any) => {
  const form = values as UpdateFarmForm;

  try {
    await useFarm.updateFarm(farmId, form);
    toast.success("Farm updated successfully");
    router.push("/farm");
  } catch (error: unknown) {
    const errMsg = handleApiErrors(error, setFieldError);
    toast.error(errMsg);
  }
};
</script>
