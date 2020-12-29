<template>
  <Results />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Results from "../../components/Results.vue";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    Results
  },
  setup() {
    const store = useStore();

    store.dispatch("getAllBooks");
  }
});
</script>

<style></style>
