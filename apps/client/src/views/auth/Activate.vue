<template>
  <Modal
    @modal-cancelled="$router.push({ path: '/logowanie' })"
    @modal-accepted="$router.push({ path: '/logowanie' })"
  />
</template>

<script lang="ts">
import { fetcher } from "../../utils/fetcher";
import { API_URL } from "../../utils/consts";
import { defineComponent } from "vue";
import { useStore } from "vuex";
import Modal from "../../components/Modal.vue";
export default defineComponent({
  name: "Activate",
  components: {
    Modal,
  },
  props: {
    token: {
      type: String,
      required: true,
    },
  },
  setup(prp) {
    const store = useStore();
    const activateAccount = async () => {
      try {
        const { data }: { data: { message: string } } = await fetcher(
          `${API_URL}/api/users/activate`,
          "POST",
          {
            token: prp.token,
          },
        );
        return store.dispatch("setModal", {
          show: true,
          type: "success",
          message: data.message,
        });
      } catch (err) {
        return store.dispatch("setModal", {
          show: true,
          type: "warning",
          message: err.message,
        });
      }
    };

    activateAccount();
  },
});
</script>

<style></style>
