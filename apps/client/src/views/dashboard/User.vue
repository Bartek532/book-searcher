<template>
  <div>
    <div class="account">
      <div class="account__info">
        <div class="account__info__image">
          {{ userInfo.name ? userInfo.name[0] : "" }}
        </div>
        <div class="account__info__name">{{ userInfo.name }}</div>
        <div class="account__info__email">{{ userInfo.email }}</div>
      </div>
      <div class="account__edit" v-if="Object.entries(userInfo).length">
        <form class="account__edit__form" @submit.prevent="modifyUserData">
          <Input name="Nazwa" v-model="userInfo.name" />
          <Input name="Adres email" v-model="userInfo.email" type="email" />
          <PasswordInput
            v-model="userInfo.oldPassword"
            placeholder="Stare hasło"
          />
          <PasswordInput
            v-model="userInfo.newPassword"
            placeholder="Nowe hasło"
          />
          <Button text="Zapisz" />
        </form>
      </div>
    </div>
    <Modal
      @modal-canceled="$router.push({ path: '/dashboard/start' })"
      @modal-accepted="$router.push({ path: '/dashboard/start' })"
    />
    <LoadingModal v-if="loading" />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import LoadingModal from "../../components/modals/LoadingModal.vue";
import Modal from "../../components/modals/MainModal.vue";
import Button from "../../components/inputs/Button.vue";
import Input from "../../components/inputs/Input.vue";
import PasswordInput from "../../components/inputs/PasswordInput.vue";
import { defineComponent, ref, reactive } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    LoadingModal,
    Button,
    Input,
    PasswordInput,
    Modal,
  },
  setup() {
    interface User {
      name: string;
      email: string;
      oldPassword: string;
      newPassword: string;
    }
    const loading = ref(false);
    const store = useStore();
    const userInfo = reactive({} as User);

    async function getUserInformation() {
      loading.value = true;
      try {
        const { data } = await axios.get("/api/users/user/info");
        userInfo.name = data.name;
        userInfo.email = data.email;
        userInfo.oldPassword = "";
        userInfo.newPassword = "";
      } catch (err) {
        store.dispatch("setModal", {
          show: true,
          type: "error",
          message: err.response.data.message,
        });
      } finally {
        loading.value = false;
      }
    }

    async function modifyUserData() {
      const filteredFields = Object.entries(userInfo).filter(
        (item) => item[1] && item[1].length,
      );
      loading.value = true;
      try {
        await axios.post(
          "/api/users/user/modify",
          Object.fromEntries(filteredFields),
        );
        store.dispatch("setModal", {
          show: true,
          type: "success",
          message: "Zmieniono dane użytkownika.",
        });
      } catch (err) {
        store.dispatch("setModal", {
          show: true,
          type: "error",
          message: err.response.data.message,
        });
      } finally {
        loading.value = false;
      }
    }

    getUserInformation();

    return { loading, userInfo, modifyUserData };
  },
});
</script>

<style lang="scss" scoped>
$imgKey: random(5);

$list: #bc4749, #2a9d8f, #b5838d, #ef476f, #118ab2;
$nth: nth($list, $imgKey);

.account {
  width: 100vw;
  padding: 60px 0 90px 0;
  @include flex;
  flex-flow: column wrap;

  &__info {
    @include flex;
    flex-flow: column wrap;
    border-bottom: 1px solid var(--gray-100);
    width: 75%;
    padding-bottom: 20px;
    max-width: 370px;
    &__image {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      color: var(--white-100);
      font-weight: 600;
      font-size: 3.3rem;
      background-color: $nth;
      @include flex;
      margin-bottom: 15px;
    }

    &__name {
      font-weight: 600;
      font-size: 1.1rem;
      margin-top: 10px;
    }

    &__email {
      color: var(--gray-100);
      margin: 3px 0;
    }
  }

  &__edit {
    width: 100%;
    @include flex;
    flex-flow: column wrap;
    margin-top: 20px;

    &__form {
      width: 90%;
      @include flex;
      flex-flow: column wrap;
    }
  }

  button {
    margin-top: 50px;
  }
}
</style>
