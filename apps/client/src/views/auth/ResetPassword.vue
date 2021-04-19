<template>
  <Modal @modal-accepted="$router.push({ path: '/logowanie' })" />
  <form class="form" @submit.prevent="handleResetPassword">
    <Input
      type="password"
      placeholder="Hasło"
      v-model="password"
      :error="errors?.password"
      name="new-password"
    />
    <Input
      type="password"
      placeholder="Powtórz hasło"
      v-model="confirmPassword"
      :error="errors?.confirmPassword"
      name="confirm-password"
    />
    <Button text="Zmień hasło" class="form__btn" />
  </form>
</template>

<script lang="ts">
import Button from "../../components/buttons/Button.vue";
import Input from "../../components/form/Input.vue";
import Modal from "../../components/Modal.vue";
import { useUser } from "../../utils/composable/useUser";
import { useForm, useField } from "vee-validate";
import { resetPasswordSchema } from "../../utils/validationSchemas";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Input,
    Button,
    Modal,
  },
  props: {
    token: {
      type: String,
      required: true,
    },
  },
  setup(prp) {
    const { handleSubmit, errors } = useForm({
      validationSchema: resetPasswordSchema,
    });
    const { resetPassword } = useUser();
    const { value: password } = useField("password");
    const { value: confirmPassword } = useField("confirmPassword");

    const handleResetPassword = handleSubmit(
      ({ password, confirmPassword }) => {
        if (password && confirmPassword) {
          return resetPassword(prp.token, password, confirmPassword);
        }
      },
    );

    return { password, confirmPassword, errors, handleResetPassword };
  },
});
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
