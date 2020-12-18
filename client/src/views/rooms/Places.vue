<template>
  <div class="choose__places">
    <Button
      text="Pokaż wszystko"
      class="places__btn"
      @click="searchBooks({ room })"
    />
    <div class="places">
      <Field
        class="place__field"
        v-for="place in places[room]"
        :label="place"
        :key="place"
        @click="searchBooks({ room, place })"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { places } from "../../data";
import Field from "../../components/Field.vue";
import Button from "../../components/inputs/Button.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  components: {
    Field,
    Button
  },
  props: {
    room: {
      type: String,
      required: true
    }
  },
  setup() {
    interface Filters {
      place?: string;
      room?: string;
    }
    const store = useStore();
    const router = useRouter();
    function searchBooks(filters: Filters) {
      store.dispatch("searchByRooms", filters);
      router.push({ path: "/results" });
    }
    return { places, searchBooks };
  }
};
</script>

<style lang="scss" scoped>
.choose__places {
  min-height: 100vh;
  @include flex;
  padding: 80px 0;
  flex-flow: column wrap;

  button {
    transform: translateY(-40px);
  }

  .places {
    flex-wrap: wrap;
    @include flex;
  }
}

@media all and (min-width: 1000px) {
  button {
    transform: translateY(-70px);
  }
}
</style>
