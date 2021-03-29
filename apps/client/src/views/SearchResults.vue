<template>
  <main>
    <SearchInput />
    <Results
      @result-clicked="$router.push({ path: `/results/${$event.slug}` })"
    />
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

    if (route.query.place || route.query.room) {
      store.dispatch("searchByRooms", route.query);
    }

    if (route.query.tags || route.query.title || route.query.author) {
      store.dispatch("advancedSearch", {
        tags: route.query.tags,
        title: route.query.title,
        author: route.query.author,
      });
    }
  },
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
