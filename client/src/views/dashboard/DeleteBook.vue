<template>
  <div class="page">
    <h1 class="title"><span>Usuń książkę</span></h1>
    <SearchInput />
    <Modal @modal-accepted="deleteBook" />
    <LoadingModal v-if="loading" />
    <Results @result-clicked="showQuestionModal($event.id)" />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, ref } from "vue";
import Modal from "../../components/modals/MainModal.vue";
import LoadingModal from "../../components/modals/LoadingModal.vue";
import Results from "../../components/Results.vue";
import SearchInput from "../../components/inputs/SearchInput.vue";

import { useStore } from "vuex";
export default defineComponent({
  components: {
    Results,
    Modal,
    LoadingModal,
    SearchInput
  },
  setup() {
    const store = useStore();
    const activeBookId = ref(0);
    const loading = ref(false);

    store.dispatch("getAllBooks");

    function showQuestionModal(id: number) {
      store.dispatch("setModal", {
        show: true,
        type: "question",
        message: "Czy na pewno chcesz usunąć tę książkę?"
      });

      activeBookId.value = id;
    }

    async function deleteBook() {
      console.log(activeBookId.value);
      loading.value = true;
      try {
        await axios.delete(`/api/books/book/${activeBookId.value}`);
        store.dispatch("setModal", {
          show: true,
          type: "success",
          message: "Usunięto książkę."
        });
      } catch (err) {
        store.dispatch("setModal", {
          show: true,
          type: "error",
          message: err.response.data.message
        });
      } finally {
        store.dispatch("getAllBooks");
        loading.value = false;
      }
    }

    return { showQuestionModal, deleteBook, loading };
  }
});
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
}

.search {
  transform: translateY(63px);
}
</style>
