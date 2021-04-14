<template>
  <main class="account" v-if="Object.entries(user).length">
    <div class="account__info">
      <div class="account__info__avatar">
        {{ user.name ? user.name[0] : "" }}
      </div>
      <span class="account__info__name">{{ user.name }}</span>
      <span class="account__info__email">{{ user.email }}</span>
    </div>
    <form class="account__edit" @submit.prevent="modifyUserData">
      <Input
        placeholder="Imię"
        :error="errors?.name"
        v-model="name"
        name="name"
      />
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
        :error="errors?.oldPassword"
        v-model="oldPassword"
        name="old-password"
      />
      <Input
        type="password"
        placeholder="Nowe hasło"
        :error="errors?.newPassword"
        v-model="newPassword"
        name="new-password"
      />
      <Input
        type="password"
        placeholder="Powtórz hasło"
        :error="errors?.confirmPassword"
        v-model="confirmPassword"
        name="confirm-password"
      />
      <Button text="Zapisz" class="account__edit__btn" />
    </form>
    <Modal @modal-accepted="$router.push({ path: '/panel/start' })" />
    <LoadingModal :show="loading" />
  </main>
</template>

<script lang="ts">
import LoadingModal from "../../components/loading/LoadingModal.vue";
import Modal from "../../components/Modal.vue";
import Button from "../../components/buttons/Button.vue";
import Input from "../../components/form/Input.vue";
import { defineComponent, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useUserInfo } from "../../utils/hooks";
import { useForm, useField } from "vee-validate";
import { modifyUserSchema } from "../../utils/validationSchemas";
export default defineComponent({
  components: {
    LoadingModal,
    Modal,
    Button,
    Input,
  },
  setup() {
    const { loading, error, load, user } = useUserInfo();
    const store = useStore();

    if (error.value) {
      store.dispatch("setModal", {
        show: true,
        type: "warning",
        message: error.value,
      });
    }

    const { handleSubmit, errors } = useForm({
      validationSchema: modifyUserSchema,
    });

    const { value: name } = useField("name");
    const { value: email } = useField("email");
    const { value: oldPassword } = useField("oldPassword");
    const { value: newPassword } = useField("newPassword");
    const { value: confirmPassword } = useField("confirmPassword");

    const modifyUserData = handleSubmit((data) => {
      return store.dispatch("modifyUserData", data);
    });

    watch(
      () => user.value,
      () => {
        name.value = user.value.name;
      },
    );

    watch(
      () => user.value,
      () => {
        email.value = user.value.email;
      },
    );

    onMounted(() => load());

    return {
      loading,
      error,
      load,
      user,
      name,
      email,
      oldPassword,
      newPassword,
      confirmPassword,
      errors,
      handleSubmit,
      modifyUserData,
    };
  },
});
</script>

<style lang="scss" scoped>
$imgKey: random(5);
$list: #bc4749, #2a9d8f, #b5838d, #ef476f, #118ab2;
$nth: nth($list, $imgKey);

.account {
  @include flex;
  padding: 45px 0 10px 0;
  flex-flow: column wrap;
  width: 100%;
  max-width: 400px;
  border-radius: 20px;
  position: relative;

  &__info {
    @include flex;
    flex-flow: column wrap;
    border-bottom: 1px solid var(--gray-100);
    width: 75%;
    padding-bottom: 20px;
    max-width: 370px;
    text-align: center;
    &__avatar {
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
      line-height: 1.5rem;
      margin-top: 10px;
    }

    &__email {
      color: var(--gray-100);
      margin: 5px 0;
    }
  }

  &__edit {
    width: 100%;
    @include flex;
    flex-flow: column wrap;
    margin-top: 10px;

    &__btn {
      margin: 40px 0;
    }
  }
}

@media all and (min-width: 700px) {
  .account {
    box-shadow: var(--primary-shadow);
    margin-top: 30px;
  }
}
</style>
