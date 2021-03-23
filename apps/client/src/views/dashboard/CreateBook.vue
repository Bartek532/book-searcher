<template>
  <div>
    <Form @form-submitted="createBook" />
    <Modal
      @modal-accepted="$router.go(-1)"
      @modal-canceled="$store.state.modal.error ? '' : $router.go()"
    />
    <LoadingModal v-if="loading" />
  </div>
</template>

<script lang="ts">
import Form from "../../components/Form.vue";
import Modal from "../../components/modals/MainModal.vue";
import LoadingModal from "../../components/modals/LoadingModal.vue";
import { useStore } from "vuex";
import { ref, defineComponent } from "vue";
export default defineComponent({
  components: {
    Form,
    Modal,
    LoadingModal
  },
  setup() {
    const store = useStore();
    const loading = ref(false);

    async function createBook(data: FormData) {
      let formLength = 0;
      data.forEach(item => {
        if (item) {
          formLength++;
        }
      });

      const errors = document.querySelectorAll(".error");
      const tags = JSON.parse(data.get("tags") as string);
      if (tags && tags.includes("series")) {
        formLength--;
      }

      if (errors.length === 0 && formLength >= 8) {
        loading.value = true;
        await store.dispatch("createBook", data);
        loading.value = false;

        if (!store.state.error) {
          store.dispatch("setModal", {
            show: true,
            type: "success",
            message: "Książka została dodana!"
          });
        } else {
          store.dispatch("setModal", {
            show: true,
            type: "error",
            message: store.state.error
          });
        }
      } else {
        store.dispatch("setModal", {
          show: true,
          type: "error",
          message: "Wypełnij poprawnie formularz!"
        });
      }
    }

    return {
      createBook,
      loading
    };
  }
});
</script>

<style></style>
