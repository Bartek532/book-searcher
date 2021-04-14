<template>
  <form class="form" @submit.prevent="handleSendResetLink">
    <Input
      type="email"
      placeholder="Email"
      v-model="email"
      :error="errors?.email"
      name="email"
    />
    <Button text="Wyślij link" class="form__btn" />
  </form>
  <Modal @modal-accepted="resetForm" />
  <LoadingModal :show="loading" />
</template>

<script lang="ts">
import Button from "../../components/inputs/Button.vue";
import Input from "../../components/inputs/Input.vue";
import Modal from "../../components/modals/MainModal.vue";
import LoadingModal from "../../components/modals/LoadingModal.vue";
import { useUserPassword } from "../../utils/hooks";
import { useForm, useField } from "vee-validate";
import { forgotPasswordSchema } from "../../utils/validationSchemas";

export default {
  components: {
    Input,
    Button,
    Modal,
    LoadingModal,
  },
  setup() {
    const { handleSubmit, errors, resetForm } = useForm({
      validationSchema: forgotPasswordSchema,
    });
    const { loading, sendResetEmail } = useUserPassword();
    const { value: email } = useField("email");

    const handleSendResetLink = handleSubmit(({ email }) => {
      if (email) {
        return sendResetEmail(email);
      }
    });

    return { email, errors, handleSendResetLink, loading, resetForm };
  },
};
</script>

<style lang="scss" scoped>
.form {
  @include flex;
  flex-flow: column wrap;

  &__btn {
    margin-top: 40px;
  }
}
</style>
