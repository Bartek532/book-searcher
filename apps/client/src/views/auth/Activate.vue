<template>
  <Modal
    @modal-cancelled="$router.push({ path: '/logowanie' })"
    @modal-accepted="$router.push({ path: '/logowanie' })"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Modal from "../../components/Modal.vue";
import { useUser } from "../../utils/composable/useUser";
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
    const { activateAccount } = useUser();

    activateAccount(prp.token);
  },
});
</script>

<style></style>
