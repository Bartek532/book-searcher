<template>
  <section class="rooms">
    <Button
      text="Pokaż wszystko"
      class="rooms__btn"
      @click="$router.push('/ksiazki')"
    />
    <div class="fields">
      <Field
        v-for="room in rooms"
        :label="polishTranslate[room]"
        :img="room"
        :key="room"
        :path="`/pokoje/${encodeURIComponent(polishTranslate[room])}`"
      />
    </div>
  </section>
</template>

<script lang="ts">
import Field from "../../components/Field.vue";
import Button from "../../components/inputs/Button.vue";
import { rooms, polishTranslate } from "@book-searcher/data";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  components: {
    Field,
    Button,
  },
  setup() {
    return { rooms, polishTranslate };
  },
};
</script>

<style lang="scss" scoped>
.rooms {
  padding: 30px 0;
  @include flex;
  flex-flow: column wrap;

  .fields {
    flex-wrap: wrap;
    @include flex;
    margin: 35px 0;
  }
}
</style>
