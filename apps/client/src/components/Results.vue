<template>
  <div>
    <div
      class="results"
      v-if="!$store.state.loadingBooks && $store.state.results.length"
    >
      <section class="results__books">
        <Result
          v-for="result in $store.state.results.slice(0, 270)"
          :key="result.id"
          :data="result"
          @click="$emit('result-clicked', result)"
        />
      </section>
      <ScrollToTopBtn />
      <LoadMore />
    </div>
    <Loader v-else-if="$store.state.loadingBooks" />
    <EmptyResults v-else-if="!$store.state.results.length && notFound" />
  </div>
</template>

<script>
import Loader from "./Loader.vue";
import Result from "./ResultTile.vue";
import EmptyResults from "./EmptyResults.vue";
import LoadMore from "./LoadMore.vue";
import ScrollToTopBtn from "./ScrollTopButton.vue";

export default {
  props: {
    notFound: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    Loader,
    Result,
    LoadMore,
    EmptyResults,
    ScrollToTopBtn,
  },
};
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
