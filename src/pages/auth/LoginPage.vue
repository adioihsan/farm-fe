<template>
  <div class="flex items-center justify-center h-svh">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link" @click="router.push('/auth/register')">
            Sign up
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Form
          as="form"
          :validation-schema="schema"
          :validate-on-mount="false"
          v-slot="{ isSubmitting, submitCount }"
          @submit="onSubmit"
        >
          <div class="grid w-full items-center gap-4">
            <div class="flex flex-col space-y-1.5">
              <Label for="email">Email</Label>
              <Field
                name="email"
                :value="lastRegisteredEmail"
                v-slot="{ field, errorMessage, meta }"
              >
                <Input
                  id="email"
                  type="email"
                  v-bind="field"
                  :default-value="lastRegisteredEmail"
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
              <Label for="password">Password</Label>
              <Field name="password" v-slot="{ field, errorMessage, meta }">
                <Input id="password" type="password" v-bind:="field" />
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
            <icon-mdi-login-variant />
            <span>Login</span>
          </Button>
        </Form>
      </CardContent>
      <CardFooter class="flex flex-col gap-2">
        <Button variant="outline" class="w-full"> Login with Google </Button>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
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
import { useAuthStore } from "@/stores/auth.store";
import { useRoute, useRouter } from "vue-router";
import { Form, Field } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { loginFormSchema, type LoginForm } from "@/schema/auth.schema";
import { useToast } from "vue-toastification";
import { handleApiErrors } from "@/lib/errorHandler";

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();
const toast = useToast();

const lastRegisteredEmail = route.query.email as string | undefined;
const schema = toTypedSchema(loginFormSchema);

const onSubmit = async (values: any, { setFieldError }: any) => {
  const form = values as LoginForm;
  try {
    await auth.login(form);
    const redirect = (route.query.redirect as string) || "/";
    router.replace(redirect);
  } catch (error) {
    const errMsg = handleApiErrors(error, setFieldError);
    toast.error(errMsg);
  }
};
</script>
