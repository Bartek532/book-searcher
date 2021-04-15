<template>
  <Modal @modal-accepted="resetForm" />
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
  <LoadingModal :show="loading" />
</template>

<script lang="ts">
import Button from "../../components/buttons/Button.vue";
import Input from "../../components/form/Input.vue";
import Modal from "../../components/Modal.vue";
import LoadingModal from "../../components/loading/LoadingModal.vue";
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
