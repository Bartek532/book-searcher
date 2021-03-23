<template>
  <div>
    <SearchInput />
    <Results
      @result-clicked="$router.push({ path: `/results/${$event.slug}` })"
    />
  </div>
</template>

<script>
import SearchInput from "../components/inputs/SearchInput.vue";
import Results from "../components/Results.vue";
export default {
  components: {
    SearchInput,
    Results
  }
};
</script>

<style lang="scss" scoped>
.search {
  position: absolute;
  top: -10px;
  right: 35px;
}

@media all and (min-width: 700px) {
  .search {
    top: 65px;
  }
}

@media all and (min-width: 1120px) {
  .search {
    top: -10px;
    right: 685px;
  }
}
</style>
