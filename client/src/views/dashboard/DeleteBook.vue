<template>
  <div>
    <span class="delete__title"><h1>Usuń książkę</h1></span>
    <div
      class="books"
      v-if="!$store.state.loading && $store.state.results.length"
    >
      <Result
        v-for="result in $store.state.results"
        :key="result.id"
        :data="result"
        @click="showQuestionModal(result.id)"
      />
    </div>
    <Loader v-else-if="$store.state.loading" />
    <Modal @modal-accepted="deleteBook" />
    <LoadingModal v-if="loading" />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, ref } from "vue";
import Result from "../../components/Result.vue";
import Loader from "../../components/Loader.vue";
import Modal from "../../components/modals/MainModal.vue";
import LoadingModal from "../../components/modals/LoadingModal.vue";

import { useStore } from "vuex";
export default defineComponent({
  components: {
    Result,
    Loader,
    Modal,
    LoadingModal
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
.books {
  width: 100vw;
  margin-top: 100px;
  padding: 20px 20px 70px 20px;
  @include flex;
  flex-wrap: wrap;
}

.delete__title {
  text-transform: uppercase;
  font-weight: 600;
  width: 100%;
  @include flex;
  transform: translateY(40px);

  h1 {
    border-bottom: 3px solid $main-color;
    width: fit-content;
    font-size: 2.2rem;
  }
}
</style>
