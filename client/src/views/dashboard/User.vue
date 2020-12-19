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
      <div class="account__edit">
        <Button text="Zapisz" />
      </div>
    </div>
    <LoadingModal v-if="loading" />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import LoadingModal from "../../components/modals/LoadingModal.vue";
import Button from "../../components/inputs/Button.vue";
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    LoadingModal,
    Button
  },
  setup() {
    interface User {
      id: number;
      name: string;
      email: string;
      password: string;
      createAt: Date;
      updatedAt: Date;
    }
    const loading = ref(false);
    const store = useStore();
    const userInfo = ref({} as User);

    async function getUserInformation() {
      loading.value = true;
      try {
        const { data } = await axios.get("/api/users/user/info");
        userInfo.value = data;
      } catch (err) {
        store.dispatch("setModal", {
          show: true,
          error: true,
          message: err.response.data.message
        });
      } finally {
        loading.value = false;
      }
    }

    getUserInformation();

    return { loading, userInfo };
  }
});
</script>

<style lang="scss" scoped>
$imgKey: random(5);

$list: #bc4749, #2a9d8f, #b5838d, #ef476f, #118ab2;
$nth: nth($list, $imgKey);

.account {
  width: 100vw;
  padding: 50px 0;
  @include flex;
  flex-flow: column wrap;

  &__info {
    @include flex;
    flex-flow: column wrap;
    border-bottom: 1px solid $shadow-color;
    width: 75%;
    padding-bottom: 20px;
    &__image {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      color: #fff;
      font-weight: bold;
      font-size: 3.3rem;
      background-color: $nth;
      @include flex;
      margin-bottom: 15px;
    }

    &__name {
      font-weight: bold;
      font-size: 1.1rem;
      margin-top: 10px;
    }

    &__email {
      color: $shadow-color;
      margin: 3px 0;
    }
  }
}
</style>
