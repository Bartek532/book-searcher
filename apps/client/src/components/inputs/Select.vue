<template>
  <select :name="name" :id="name">
    <option v-for="value in values" :key="value" :value="value">
      {{ polishTranslate[value] }}
    </option>
  </select>
</template>

<script lang="ts">
import { polishTranslate } from "../../data";
import { defineComponent } from "vue";
export default defineComponent({
  name: "Select",
  props: {
    name: {
      type: String,
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return { polishTranslate };
  },
});
</script>

<style lang="scss" scoped>
select {
  border: 2px solid lightgray;
  padding: 8px 15px;
  background-color: var(--white-100);
  border-radius: 5px;
}
</style>
