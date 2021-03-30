<template>
  <main class="main">
    <SearchInput active />
    <Results />
  </main>
</template>

<script>
import SearchInput from "../components/inputs/SearchInput.vue";
import Results from "../components/Results.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  components: {
    SearchInput,
    Results,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    if (!Object.keys(route.query).length) {
      store.dispatch("getAllBooks");
    }

    if (route.query.q) {
      store.dispatch("searchByQuery", decodeURIComponent(route.query.q));
    }

    const availableFilters = [
      "id",
      "name",
      "author",
      "slug",
      "room",
      "place",
      "series",
    ];

    if (
      Object.keys(route.query).some((item) => availableFilters.includes(item))
    ) {
      store.dispatch(
        "searchByFilters",
        Object.entries(route.query)
          .map((item) => item.join("="))
          .join("&"),
      );
    }

    if (route.query.tags) {
      store.dispatch("advancedSearch", {
        tags: route.query.tags,
        title: route.query.name,
        author: route.query.author,
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.main {
  @include flex;
  flex-flow: column wrap;
}
</style>
