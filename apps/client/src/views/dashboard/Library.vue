<template>
  <div>
    <h1 class="title"><span>Moje książki</span></h1>
    <Results
      :notFound="false"
      @result-clicked="
        $router.push({ path: `/dashboard/library/${$event.slug}` })
      "
    />
    <div
      class="empty"
      v-if="!$store.state.results.length && !$store.state.loading"
    >
      <span class="why">Dlaczego</span> tu jeszcze nic nie ma? Nie ociągaj się i
      <router-link to="/" class="add">dodaj</router-link> coś do swojej
      biblioteki!
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Results from "../../components/Results.vue";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    Results,
  },
  setup() {
    const store = useStore();

    store.dispatch("getUserBooks");
  },
});
</script>

<style lang="scss" scoped>
.delete__title {
  font-weight: 600;
  width: 100%;
  @include flex;
  transform: translateY(50px);

  span {
    border-bottom: 3px solid var(--blue-100);
    text-transform: uppercase;
    width: fit-content;
    font-size: 2.2rem;
  }
}

.empty {
  font-size: 1.5rem;
  width: 100%;
  padding: 0 30px;
  max-width: 500px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 37px;

  .why,
  .add {
    font-weight: bold;
  }

  .add {
    color: #0466c8;
  }
}
</style>
