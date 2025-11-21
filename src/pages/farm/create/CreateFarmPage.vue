<template>
  <div class="flex items-center justify-center h-svh">
    <Card class="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Add New Farm</CardTitle>
        <CardDescription>
          Enter farm information below to create a new farm
        </CardDescription>
        <CardAction>
          <Button variant="link" @click="router.push('/farm')">
            Back to Farm List
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <Form
          as="form"
          :validation-schema="schema"
          :validate-on-mount="false"
          @submit="onSubmit"
          v-slot="{ isSubmitting, submitCount }"
        >
          <div class="grid w-full items-center gap-4">
            <!-- Farm Name -->
            <div class="flex flex-col space-y-1.5">
              <Label for="farmName">Farm Name</Label>
              <Field name="farmName" v-slot="{ field, errorMessage, meta }">
                <Input
                  id="farmName"
                  type="text"
                  placeholder="Example Farm"
                  v-bind="field"
                />
                <small
                  class="text-red-500"
                  v-if="(meta.touched || submitCount > 0) && errorMessage"
                >
                  {{ errorMessage }}
                </small>
              </Field>
            </div>

            <!-- Owner Name -->
            <div class="flex flex-col space-y-1.5">
              <Label for="ownerName">Owner Name</Label>
              <Field name="ownerName" v-slot="{ field, errorMessage, meta }">
                <Input
                  id="ownerName"
                  type="text"
                  placeholder="Owner name"
                  v-bind="field"
                />
                <small
                  class="text-red-500"
                  v-if="(meta.touched || submitCount > 0) && errorMessage"
                >
                  {{ errorMessage }}
                </small>
              </Field>
            </div>

            <!-- Location -->
            <div class="flex flex-col space-y-1.5">
              <Label for="location">Location</Label>
              <Field name="location" v-slot="{ field, errorMessage, meta }">
                <Input
                  id="location"
                  type="text"
                  placeholder="Farm location"
                  v-bind="field"
                />
                <small
                  class="text-red-500"
                  v-if="(meta.touched || submitCount > 0) && errorMessage"
                >
                  {{ errorMessage }}
                </small>
              </Field>
            </div>

            <!-- isPartner (NativeSelect) -->
            <div class="flex flex-col space-y-1.5">
              <Label for="isPartner">Is Partner</Label>
              <Field name="isPartner" v-slot="{ field, errorMessage, meta }">
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

          <Button class="w-full mt-4" :disabled="isSubmitting" type="submit"
            >
            <Spinner v-if="isSubmitting"/>
            <span> Save Farm</span>
           </Button
          >
        </Form>
      </CardContent>

      <CardFooter class="flex flex-col gap-2">
        <p class="text-xs text-muted-foreground text-center">
          After creating a farm, you will be redirected to the farm list.
        </p>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Form, Field } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

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


import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

import { useFarmStore } from "@/stores/farm.store";
import {
  createFarmFormSchema,
  type CreateFarmForm,
} from "@/schema/farm.schema";
import { handleApiErrors } from "@/lib/errorHandler";
import { Spinner } from "@/components/ui/spinner";

const router = useRouter();
const toast = useToast();
const farmStore = useFarmStore();

const schema = toTypedSchema(createFarmFormSchema);

const onSubmit = async (values: any, { setFieldError }: any) => {
  const form = values as CreateFarmForm;

  try {
    await farmStore.createFarm(form);
    toast.success("Farm created successfully");
    router.push("/farm");
  } catch (error) {
    const errMsg = handleApiErrors(error, setFieldError);
    toast.error(errMsg);
  }
};
</script>
