<template>
  <section class="login">
    <h2 class="login__label">
      <span class="smaller">Witaj z powrotem, </span>
      Zaloguj się!
    </h2>
    <form class="login__form" @submit.prevent="login">
      <Input
        type="email"
        placeholder="Email"
        :error="errors?.email"
        v-model="email"
      />
      <Input
        type="password"
        placeholder="Hasło"
        :error="errors?.password"
        v-model="password"
      />
      <Button text="Zaloguj się" class="login__button" />
      <router-link to="rejestracja" class="create-account"
        >Utwórz konto</router-link
      >
    </form>
    <LoadingModal v-if="loading" />
    <Modal />
  </section>
</template>

<script lang="ts">
import Button from "../../components/inputs/Button.vue";
import Input from "../../components/inputs/Input.vue";
import LoadingModal from "../../components/modals/LoadingModal.vue";
import Modal from "../../components/modals/MainModal.vue";
import { loginAnimation } from "../../animations/loginAnimation";
import { reactive, onMounted, ref, defineComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import { loginSchema } from "../../utils/validationSchemas";

export default defineComponent({
  components: {
    Button,
    Input,
    Modal,
    LoadingModal,
  },
  setup() {
    const { handleSubmit, errors } = useForm({
      validationSchema: loginSchema,
    });

    const { value: email } = useField("email");
    const { value: password } = useField("password");

    const login = handleSubmit((data) => {
      console.log(data);
    });

    onMounted(() => {
      loginAnimation();
    });

    return { errors, login, email, password };
    /*
    const loginData = reactive({
      email: "",
      password: "",
    });
    const store = useStore();
    const router = useRouter();
    const loading = ref(false);

    async function login() {
      const errors = document.querySelectorAll(".error");
      if (
        !errors.length &&
        loginData.email !== "" &&
        loginData.password !== ""
      ) {
        loading.value = true;

        //Fetch
        await store.dispatch("login", loginData);
        loading.value = false;

        //Reset fields
        loginData.email = "";
        loginData.password = "";

        //Modal
        if (store.state.isLogIn) {
          router.push({ path: "/dashboard/start" });
        } else {
          store.dispatch("setModal", {
            show: true,
            type: "error",
            message: store.state.error,
          });
        }
      }
    }

    async function isLoggedIn() {
      await store.dispatch("isLoggedIn");

      if (store.state.isLogIn) router.push({ path: "/dashboard/start" });
    }

    isLoggedIn();

    return { loginData, login, loading };
    */
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
    font-size: 2.1rem;
    padding: 0 30px;
    color: var(--black-100);
    @include flex;
    text-align: center;
    flex-flow: column wrap;
    .smaller {
      font-size: 1.3rem;
      text-transform: none;
    }
  }

  &__form {
    width: 100%;
    @include flex;
    flex-flow: column wrap;

    .create-account {
      margin-top: 55px;
      font-weight: 600;
      text-decoration: underline;
      cursor: pointer;

      &:hover {
        text-decoration: none;
      }
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
    min-height: 80vh;

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
