<template>
  <main class="register">
    <Modal @modal-accepted="$router.push({ path: '/logowanie' })" />
    <h1 class="register__label">
      <span class="smaller">Cześć,</span>
      Zarejestruj się!
    </h1>
    <form class="register__form" @submit.prevent="handleRegister">
      <Input
        v-model="name"
        placeholder="Nazwa użytkownika"
        :error="errors?.name"
        name="name"
      />
      <Input
        type="email"
        placeholder="Adres email"
        v-model="email"
        :error="errors?.email"
        name="email"
      />
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
        name="repeat-password"
      />

      <Button text="Rejestracja" class="register__form__button" />
    </form>
  </main>
</template>

<script lang="ts">
import Button from "../../components/buttons/Button.vue";
import Input from "../../components/form/Input.vue";
import Modal from "../../components/Modal.vue";
import { registerAnimation } from "../../animations/registerAnimation";
import { onMounted, defineComponent } from "vue";
import { useField, useForm } from "vee-validate";
import { registerSchema } from "../../utils/validationSchemas";
import { useUser } from "../../utils/composable/useUser";

export default defineComponent({
  components: {
    Button,
    Input,
    Modal,
  },
  setup() {
    const { handleSubmit, errors } = useForm({
      validationSchema: registerSchema,
    });

    const { value: name } = useField("name");
    const { value: email } = useField("email");
    const { value: password } = useField("password");
    const { value: confirmPassword } = useField("confirmPassword");

    const { register } = useUser();

    const handleRegister = handleSubmit(async (data, { resetForm }) => {
      resetForm();
      return register(data);
    });

    onMounted(() => {
      registerAnimation();
    });

    return { errors, handleRegister, name, email, password, confirmPassword };
  },
});
</script>

<style lang="scss" scoped>
.register {
  width: 100%;
  @include flex;
  flex-flow: column wrap;
  padding-top: 150px;

  &__label {
    font-size: 2.1rem;
    padding: 0 30px;
    color: var(--black-100);
    text-align: center;
    @include flex;
    flex-flow: column wrap;
    margin-bottom: 5px;
    .smaller {
      font-size: 1.7rem;
    }
  }

  &__form {
    width: 100%;
    @include flex;
    flex-flow: column wrap;

    &__button {
      margin-top: 40px;
    }
  }
}

@media all and (min-width: 370px) {
  .register__label {
    font-size: 2.6rem;
    padding: 0 20px;

    .smaller {
      font-size: 2.2rem;
    }
  }
}

@media all and (min-width: 1000px) {
  .register {
    flex-flow: row nowrap;
    padding-top: 100px;

    &__label {
      font-size: 4rem;
      margin-right: 40px;

      .smaller {
        font-size: 2.4rem;
      }
    }

    &__button {
      margin-top: 35px;
    }

    &__form {
      max-width: 40%;
    }
  }
}
</style>
