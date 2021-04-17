<template>
  <section class="results" v-if="!loading && results.length">
    <div class="results__books">
      <ResultTile
        v-for="result in results"
        :key="result.id"
        :data="result"
        @click="$emit('resultClicked', result.slug)"
      />
    </div>
    <ScrollToTop />
    <LoadMore />
  </section>
  <BookLoader v-else-if="loading" />
  <EmptyResults v-else-if="!results.length && notFound" />
</template>

<script lang="ts">
import BookLoader from "../loading/BookLoader.vue";
import ResultTile from "./ResultTile.vue";
import EmptyResults from "./EmptyResults.vue";
import LoadMore from "../loading/LoadMore.vue";
import ScrollToTop from "../buttons/ScrollToTop.vue";
import { defineComponent } from "vue";
import type { Book } from "@book-searcher/types";

export default defineComponent({
  name: "Results",
  props: {
    notFound: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    results: {
      type: Object as () => Book[],
    },
  },
  components: {
    BookLoader,
    ResultTile,
    LoadMore,
    EmptyResults,
    ScrollToTop,
  },
});
</script>

<style lang="scss" scoped>
.results {
  width: 100%;
  @include flex;
  flex-wrap: wrap;
  padding-bottom: 20px;

  &__books {
    width: 100%;
    @include flex;
    flex-wrap: wrap;
    margin-top: 25px;
  }
}
</style>
