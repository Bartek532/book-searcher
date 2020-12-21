<template>
  <div class="login" @keyup.enter="login">
    <h2 class="login__label">
      <span>Welcome back,</span><br />
      Log In!
    </h2>
    <form class="login__form" @submit.prevent="login">
      <Input
        class="login__input login__input__email"
        type="email"
        name="Adres email"
        placeholder="example@example.com"
        v-model="loginData.email"
      />
      <Password
        v-model="loginData.password"
        class="login__input login__input__password"
      /><br />
      <Button text="Zaloguj się" class="login__button" />
      <router-link to="/auth/register" class="create-account"
        >Utwórz konto</router-link
      >
    </form>
    <LoadingModal v-if="loading" />
    <Modal />
  </div>
</template>

<script lang="ts">
import Button from "../../components/inputs/Button.vue";
import Input from "../../components/inputs/Input.vue";
import Password from "../../components/inputs/PasswordInput.vue";
import LoadingModal from "../../components/modals/LoadingModal.vue";
import Modal from "../../components/modals/MainModal.vue";
import loginAnimation from "../../animations/loginAnimation";
import { reactive, onMounted, ref, defineComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    Button,
    Input,
    Password,
    Modal,
    LoadingModal
  },
  setup() {
    const loginData = reactive({
      email: "",
      password: ""
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
            error: true,
            message: store.state.error
          });
        }
      }
    }

    async function isLoggedIn() {
      await store.dispatch("isLoggedIn");

      if (store.state.isLogIn) router.push({ path: "/dashboard/start" });
    }

    isLoggedIn();

    onMounted(() => {
      loginAnimation();
    });

    return { loginData, login, loading };
  }
});
</script>

<style lang="scss" scoped>
.login {
  min-height: 100vh;
  min-width: 100vw;
  @include flex;
  flex-flow: column wrap;
  background: transparent;
  padding-top: 60px;

  &__label {
    font-size: 3rem;
    padding: 0 30px;
    color: #000;
    text-align: center;
    span {
      font-size: 2rem;
    }
  }

  &__form {
    width: 100%;
    @include flex;
    flex-flow: column wrap;

    .create-account {
      margin-top: 60px;
      font-weight: 600;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}

@media all and (min-width: 1000px) {
  .login {
    flex-flow: row nowrap;

    &__label {
      font-size: 3.7rem;
      margin-right: 40px;

      span {
        font-size: 2.7rem;
      }
    }

    &__form {
      max-width: 30%;
    }
  }
}
</style>
