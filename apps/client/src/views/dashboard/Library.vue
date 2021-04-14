<template>
  <div class="library">
    <h1 class="title">Moje książki</h1>
    <Results
      :notFound="false"
      @result-clicked="$router.push({ path: `/ksiazki/${$event}` })"
    />
    <div
      class="library__empty"
      v-if="!$store.state.results.length && !$store.state.loadingBooks"
    >
      <span class="why">Dlaczego</span> tu jeszcze nic nie ma? Nie ociągaj się i
      <router-link to="/ksiazki" class="add">dodaj</router-link> coś do swojej
      biblioteki!
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Results from "../../components/results/Results.vue";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    Results,
  },
  setup() {
    const store = useStore();

    onMounted(() => store.dispatch("getUserBooks"));
  },
});
</script>

<style lang="scss" scoped>
.library {
  @include flex;
  flex-flow: column wrap;
  align-self: flex-start;
  padding-top: 15px;
  .title {
    border-bottom: 4px solid var(--orange-100);
    padding-bottom: 2px;
  }

  &__empty {
    font-size: 1.6rem;
    width: 100%;
    padding: 0 20px;
    max-width: 500px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 2.3rem;

    .why,
    .add {
      font-weight: bold;
    }

    .add {
      color: var(--orange-100);
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
