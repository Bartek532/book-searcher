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
import { watch } from "vue";
export default {
  components: {
    SearchInput,
    Results,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const search = () => {
      if (!Object.keys(route.query).length) {
        store.dispatch("getAllBooks");
      }

      if (route.query.q) {
        store.dispatch(
          "searchByQuery",
          decodeURIComponent(route.query.q as string),
        );
      }

      if (Object.keys(route.query).includes("tags")) {
        return store.dispatch("advancedSearch", {
          tags: route.query.tags,
          title: route.query.name,
          author: route.query.author,
        });
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
    };

    search();

    watch(() => route.query, search);
  },
};
</script>

<style lang="scss" scoped>
.main {
  @include flex;
  flex-flow: column wrap;
  align-self: flex-start;
}
</style>
