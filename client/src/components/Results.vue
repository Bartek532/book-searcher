<template>
  <div>
    <div
      class="results"
      v-if="!$store.state.loading && $store.state.results.length"
    >
      <span class="results__count"
        >Wyniki: <strong>{{ $store.state.results.length }}</strong></span
      >
      <div class="results__books">
        <Result
          v-for="result in $store.state.results"
          :key="result.id"
          :data="result"
          @click="$emit('result-clicked', result)"
        />
      </div>
      <ScrollToTopBtn />
    </div>
    <Loader v-else-if="$store.state.loading" />
    <EmptyResults v-else-if="!$store.state.results.length && notFound" />
  </div>
</template>

<script>
import Loader from "./Loader.vue";
import Result from "./Result.vue";
import EmptyResults from "./EmptyResults.vue";
import ScrollToTopBtn from "./ScrollTopButton.vue";

export default {
  props: {
    notFound: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Loader,
    Result,
    EmptyResults,
    ScrollToTopBtn
  }
};
</script>

<style lang="scss" scoped>
.results {
  width: 100vw;
  margin-top: 100px;
  padding: 20px 20px 70px 20px;
  @include flex;
  flex-wrap: wrap;

  &__books {
    width: 100%;
    @include flex;
    flex-wrap: wrap;
  }

  &__count {
    margin-bottom: 15px;
  }
}

@media all and (min-width: 640px) and (max-width: 1100px) {
  .results {
    padding-top: 70px;
  }
}

@media all and (max-width: 350px) {
  .results {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
