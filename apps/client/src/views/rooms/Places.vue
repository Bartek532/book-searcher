<template>
  <section class="places">
    <Button
      text="Pokaż wszystko"
      class="places__btn"
      @click="$router.push(`/ksiazki?room=${selectedRoom}`)"
    />
    <div class="fields">
      <Field
        v-for="place in places[selectedRoom]"
        :label="polishTranslate[place]"
        :key="place"
        :img="place"
        :path="`/ksiazki?room=${selectedRoom}&place=${place}`"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { places, polishTranslate } from "@book-searcher/data";
import { getKeyByValue } from "../../utils/functions";
import { defineComponent, ref } from "vue";
import Field from "../../components/Field.vue";
import Button from "../../components/inputs/Button.vue";
export default defineComponent({
  components: {
    Field,
    Button,
  },
  props: {
    room: {
      type: String,
      required: true,
    },
  },
  setup(prp) {
    document.title =
      decodeURIComponent(prp.room).slice(0, 1).toUpperCase() +
      decodeURIComponent(prp.room).slice(1) +
      " | Book searcher";

    const selectedRoom = ref(
      getKeyByValue(decodeURIComponent(prp.room), polishTranslate),
    );
    return { places, selectedRoom, polishTranslate };
  },
});
</script>

<style lang="scss" scoped>
.places {
  min-height: 80vh;
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
