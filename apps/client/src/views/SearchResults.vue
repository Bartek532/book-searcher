<template>
  <main class="main">
    <SearchInput
      active
      @search="
        $router.push({
          path: '/ksiazki',
          query: { q: $event.target?.value },
        })
      "
    />
    <Results @result-clicked="$router.push({ path: `/ksiazki/${$event}` })" />
  </main>
</template>

<script lang="ts">
import SearchInput from "../components/form/SearchInput.vue";
import Results from "../components/results/Results.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { watch, defineComponent } from "vue";
import { buildAdvancedQuery } from "../utils/functions";

export default defineComponent({
  name: "SearchResults",
  components: {
    SearchInput,
    Results,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const handleSearch = () => {
      if (!Object.keys(route.query).length) {
        return store.dispatch("searchBooks", "/");
      }

      if (route.query.q) {
        return store.dispatch(
          "searchBooks",
          `/search?type=basic&q=${decodeURIComponent(route.query.q as string)}`,
        );
      }

      if (Object.keys(route.query).includes("tags")) {
        const tags = ((route.query.tags as string) || "").split(" ");
        const path = buildAdvancedQuery(
          tags,
          route.query.author as string,
          route.query.name as string,
        );
        return store.dispatch("searchBooks", `/search?type=advanced&${path}`);
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
        const path = Object.entries(route.query)
          .map((item) => item.join("="))
          .join("&");
        return store.dispatch("searchBooks", `/search?type=basic&${path}`);
      }
    };

    handleSearch();

    watch(() => route.query, handleSearch);
  },
});
</script>

<style lang="scss" scoped>
.main {
  @include flex;
  flex-flow: column wrap;
  align-self: flex-start;
}
</style>
