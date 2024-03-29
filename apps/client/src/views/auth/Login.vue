<template>
  <main class="login">
    <Modal />
    <h1 class="login__label">
      <span class="smaller">Witaj z powrotem, </span>
      Zaloguj się!
    </h1>
    <form class="login__form" @submit.prevent="handleLogin">
      <Input
        type="email"
        placeholder="Email"
        :error="errors?.email"
        v-model="email"
        name="email"
      />
      <Input
        type="password"
        placeholder="Hasło"
        :error="errors?.password"
        v-model="password"
        name="current-password"
      />
      <Button text="Zaloguj się" class="login__button" />
      <router-link to="/rejestracja" class="create-account"
        >Utwórz konto</router-link
      >

      <router-link to="/zapomnialem-hasla" class="forgot-password"
        >Zapomniałem hasła</router-link
      >
    </form>
  </main>
</template>

<script lang="ts">
import Button from "../../components/buttons/Button.vue";
import Input from "../../components/form/Input.vue";
import Modal from "../../components/Modal.vue";
import { loginAnimation } from "../../animations/loginAnimation";
import { onMounted, defineComponent, watch } from "vue";
import { useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import { loginSchema } from "../../utils/validationSchemas";
import { useUser, LoginData } from "../../utils/composable/useUser";

export default defineComponent({
  components: {
    Button,
    Input,
    Modal,
  },
  setup() {
    const router = useRouter();

    const { handleSubmit, errors } = useForm({
      validationSchema: loginSchema,
    });

    const { value: email } = useField("email");
    const { value: password } = useField("password");

    const { isLoggedIn, login, checkLoginStatus } = useUser();

    const handleLogin = handleSubmit((data, { resetForm }) => {
      resetForm();

      return login(data as LoginData);
    });

    onMounted(() => {
      loginAnimation();
    });

    checkLoginStatus();

    watch(
      () => isLoggedIn.value,
      () => {
        if (isLoggedIn.value) {
          router.push({ path: "/panel/start" });
        }
      },
    );

    return { errors, handleLogin, email, password };
  },
});
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  @include flex;
  flex-flow: column wrap;
  padding: 30px 0;
  padding-top: 150px;

  &__label {
    font-size: 2.4rem;
    padding: 0 30px;
    color: var(--black-100);
    @include flex;
    text-align: center;
    flex-flow: column wrap;
    .smaller {
      font-size: 1.5rem;
      text-transform: none;
    }
  }

  &__form {
    width: 100%;
    @include flex;
    flex-flow: column wrap;

    .create-account,
    .forgot-password {
      font-weight: 600;
      line-height: 1.7rem;
      text-decoration: underline;
      cursor: pointer;

      &:hover {
        text-decoration: none;
      }
    }

    .create-account {
      margin-top: 55px;
    }
  }
}

@media all and (min-width: 370px) {
  .login__label {
    font-size: 3rem;

    .smaller {
      font-size: 1.9rem;
    }
  }
}

@media all and (min-width: 1000px) {
  .login {
    flex-flow: row nowrap;

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
