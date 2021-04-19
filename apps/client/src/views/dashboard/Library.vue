<template>
  <main class="library">
    <h1 class="title">Moje książki</h1>
    <Results
      :notFound="false"
      @result-clicked="$router.push({ path: `/ksiazki/${$event}` })"
      :loading="loading"
    />
    <div class="library__empty" v-if="!results.length && !loading">
      <span class="why">Dlaczego</span> tu jeszcze nic nie ma? Nie ociągaj się i
      <router-link to="/ksiazki" class="add">dodaj</router-link> coś do swojej
      biblioteki!
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Results from "../../components/results/Results.vue";
import { useBooks } from "../../utils/composable/useBooks";
export default defineComponent({
  components: {
    Results,
  },
  setup() {
    const { getUserBooks, loading, results } = useBooks();

    getUserBooks();

    return { loading, results };
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
    border-bottom: 4px solid var(--blue-100);
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
