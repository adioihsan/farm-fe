<template>
  <div class="flex items-center justify-center h-svh">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Register New Account</CardTitle>
        <CardDescription>
          Enter your information below to create a new account
        </CardDescription>
        <CardAction>
          <Button variant="link" @click="router.push('/login')">
            Sign in
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
            <div class="flex flex-col space-y-1.5">
              <Label for="name">Full Name</Label>
              <Field name="name" v-slot="{ field, errorMessage, meta }">
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
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

            <!-- Email -->
            <div class="flex flex-col space-y-1.5">
              <Label for="email">Email</Label>
              <Field name="email" v-slot="{ field, errorMessage, meta }">
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
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

            <!-- Password -->
            <div class="flex flex-col space-y-1.5">
              <Label for="password">Password</Label>
              <Field name="password" v-slot="{ field, errorMessage, meta }">
                <Input id="password" type="password" v-bind="field" />
                <small
                  class="text-red-500"
                  v-if="(meta.touched || submitCount > 0) && errorMessage"
                >
                  {{ errorMessage }}
                </small>
              </Field>
            </div>

            <div class="flex flex-col space-y-1.5">
              <Label for="confirmPassword">Confirm Password</Label>
              <Field
                name="confirmPassword"
                v-slot="{ field, errorMessage, meta }"
              >
                <Input id="confirmPassword" type="password" v-bind="field" />
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
            Register
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
import { useRouter } from "vue-router";
import { Form, Field } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { registerFormSchema, type RegisterForm } from "@/schema/auth.schema";
import { useToast } from "vue-toastification";
import { handleApiErrors} from "@/lib/errorHandler";

const router = useRouter();
const auth = useAuthStore();
const toast = useToast();


const schema = toTypedSchema(registerFormSchema);

const onSubmit = async (values: any, { setFieldError }: any) => {
  const form = values as RegisterForm;
  try {
    const registrationData = await auth.register(form);
    router.push({
      path:"/auth/login",
      query: { email: registrationData.email },
    });
    toast.success("Registration Succes, Now you can login");

  } catch (error: unknown) {
    const errMsg = handleApiErrors(error,setFieldError)
    toast.error(errMsg)
  }
};
</script>
