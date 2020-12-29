<template>
  <div>
    <h1 class="title"><span>Moje książki</span></h1>
    <Results
      @result-clicked="
        $router.push({ path: `/dashboard/library/${$event.slug}` })
      "
    />
  </div>
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

    store.dispatch("getUserBooks");
  }
});
</script>

<style lang="scss" scoped>
.delete__title {
  font-weight: 600;
  width: 100%;
  @include flex;
  transform: translateY(50px);

  span {
    border-bottom: 3px solid $main-color;
    text-transform: uppercase;
    width: fit-content;
    font-size: 2.2rem;
  }
}
</style>
