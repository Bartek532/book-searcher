<template>
  <Modal
    @modal-canceled="$router.push({ path: '/' })"
    @modal-accepted="
      !$store.state.modal.error
        ? $router.push({ path: '/auth/login' })
        : $store.state.modal.message === 'Nie znaleziono użytkownika. '
        ? $router.push({ path: '/auth/register' })
        : $router.push({ path: '/auth/login' })
    "
  />
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import { useStore } from "vuex";
import Modal from "../../components/modals/MainModal.vue";
export default defineComponent({
  components: {
    Modal
  },
  props: {
    token: {
      type: String,
      required: true
    }
  },
  setup(prp) {
    const store = useStore();
    async function activateAccount() {
      try {
        const { data } = await axios.post("/api/users/activate", {
          token: prp.token
        });
        store.dispatch("setModal", {
          show: true,
          type: "success",
          message: data.message
        });
      } catch (err) {
        store.dispatch("setModal", {
          show: true,
          type: "error",
          message: err.response.data.message
        });
      }
    }

    activateAccount();
  }
});
</script>

<style></style>
