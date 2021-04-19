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
import { isInViewport } from "../../utils/functions";
import { useBooks } from "../../utils/composable/useBooks";
import { useInfiniteScroll } from "../../utils/composable/useInfiniteScroll";
import Button from "../buttons/Button.vue";
import { ref, onUnmounted, defineComponent, watch } from "vue";
export default defineComponent({
  name: "LoadMore",
  components: {
    Button,
  },
  setup() {
    const isNextButtonShow = ref(false);
    const { results } = useBooks();
    const {
      sliceResults,
      fetchBooks,
      loading,
      results: fetchedResults,
    } = useInfiniteScroll();

    const handleNextPage = () => {
      isNextButtonShow.value = false;
      window.scrollTo(0, 0);
      sliceResults();
      window.addEventListener("scroll", handleFetchMoreBooks);
    };

    const handleFetchMoreBooks = () => {
      const displayedResults = document.querySelectorAll(".result");

      if (results.value.length < 30) {
        return;
      }

      if (results.value.length >= 300) {
        isNextButtonShow.value = true;
        window.removeEventListener("scroll", handleFetchMoreBooks);
        return;
      }

      const result = displayedResults[displayedResults.length - 6];

      if (isInViewport(result)) {
        const lastResultId = results.value[results.value.length - 1].id;
        return fetchBooks(lastResultId);
      }
    };

    window.addEventListener("scroll", handleFetchMoreBooks);

    onUnmounted(() => {
      window.removeEventListener("scroll", handleFetchMoreBooks);
    });

    watch(
      () => fetchedResults.value,
      () => {
        if (fetchedResults.value.length) {
          window.addEventListener("scroll", handleFetchMoreBooks);
        } else {
          window.removeEventListener("scroll", handleFetchMoreBooks);
        }
      },
    );

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
