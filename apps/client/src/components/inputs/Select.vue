<template>
  <select
    :name="name"
    :id="name"
    class="select__input"
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option :value="null" selected>Wybierz {{ label }}</option>
    <option v-for="value in values" :key="value" :value="value">
      {{ polishTranslate[value] }}
    </option>
  </select>
  <span class="select__error" v-if="error">{{ error }}</span>
</template>

<script lang="ts">
import { polishTranslate } from "@book-searcher/data";
import { defineComponent } from "vue";
export default defineComponent({
  name: "Select",
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      default: "",
    },
    values: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: String,
      default: "",
    },
  },
  setup() {
    return { polishTranslate };
  },
});
</script>

<style lang="scss" scoped>
.select {
  &__input {
    border: 2px solid var(--gray-100);
    padding: 8px 15px;
    background-color: var(--white-100);
    border-radius: 5px;
  }
  &__error {
    color: var(--red-100);
    font-size: 0.8rem;
    padding: 3px;
    display: block;
    align-self: flex-start;
  }
}
</style>
