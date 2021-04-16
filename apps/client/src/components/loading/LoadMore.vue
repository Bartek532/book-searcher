<template>
  <div class="load-more">
    <div class="loader" v-if="loading">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <Button
      v-if="isNextButtonShow"
      @click="handleNextPage"
      text="Następna strona"
      class="btn"
    />
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { isInViewport } from "../../utils/functions";
import { fetcher } from "../../utils/fetcher";
import { API_URL } from "../../utils/consts";
import Button from "../buttons/Button.vue";
import type { Book } from "@book-searcher/types";
import { ref, onUnmounted, defineComponent } from "vue";
export default defineComponent({
  name: "LoadMore",
  components: {
    Button,
  },
  setup() {
    const store = useStore();
    const loading = ref(false);
    const isNextButtonShow = ref(false);

    const handleNextPage = () => {
      isNextButtonShow.value = false;
      window.scrollTo(0, 0);
      store.state.results = store.state.results.slice(270, 300);
      window.addEventListener("scroll", fetchMoreBooks);
    };

    const fetchMoreBooks = async () => {
      const results = document.querySelectorAll(".result");

      if (store.state.results.length < 30) {
        return;
      }

      if (store.state.results.length >= 300) {
        isNextButtonShow.value = true;
        window.removeEventListener("scroll", fetchMoreBooks);
        return;
      }

      const result = results[results.length - 6];

      if (isInViewport(result)) {
        if (loading.value) return;
        loading.value = true;

        const lastResultId =
          store.state.results[store.state.results.length - 1].id;

        try {
          const { data }: { data: Book[] } = await fetcher(
            `${
              API_URL + store.state.lastBookApiCallAddress.includes("?")
                ? store.state.lastBookApiCallAddress + "&"
                : store.state.lastBookApiCallAddress + "?"
            }lastId=${lastResultId}`,
            "GET",
          );

          if (!data.length) {
            window.removeEventListener("scroll", fetchMoreBooks);
          }
          store.commit("UPDATE_RESULTS", [...store.state.results, ...data]);
        } catch (err) {
          console.error(err);
        } finally {
          loading.value = false;
        }
      }
    };

    window.addEventListener("scroll", fetchMoreBooks);

    onUnmounted(() => {
      window.removeEventListener("scroll", fetchMoreBooks);
    });

    return { loading, isNextButtonShow, handleNextPage };
  },
});
</script>

<style lang="scss" scoped>
.load-more {
  padding: 5px 0;
  .loader {
    display: inline-block;
    position: relative;
    width: 70px;
    height: 70px;

    & div {
      display: inline-block;
      position: absolute;
      left: 8px;
      width: 16px;
      background: var(--blue-200);
      animation: loader 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    }
    & div:nth-child(1) {
      left: 8px;
      animation-delay: -0.24s;
    }
    & div:nth-child(2) {
      left: 32px;
      animation-delay: -0.12s;
    }
    & div:nth-child(3) {
      left: 56px;
      animation-delay: 0;
    }
  }
}
@keyframes loader {
  0% {
    top: 8px;
    height: 64px;
  }
  50%,
  100% {
    top: 24px;
    height: 32px;
  }
}
</style>
