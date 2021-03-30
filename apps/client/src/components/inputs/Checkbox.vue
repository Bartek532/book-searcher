<template>
  <label class="checkbox">
    <input
      type="checkbox"
      name="tag"
      :value="value"
      :checked="check"
      @change="changeCheckbox"
      class="checkbox__input"
    />
    <div class="checkbox__label">
      <span> {{ polishTranslate[text] ? polishTranslate[text] : text }}</span>
      <div class="checkbox__icon">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM8 10L6 12L11 17L18 10L16 8L11 13L8 10Z"
            fill="#2524e9"
          />
        </svg>
      </div>
    </div>
  </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { polishTranslate } from "@book-searcher/data";
import type { HTMLInputEvent } from "../../types";
export default defineComponent({
  name: "Checbox",
  props: {
    text: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Array,
      required: true,
    },
    check: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
    },
  },

  setup(prp, ctx) {
    const changeCheckbox = (e: HTMLInputEvent) => {
      if (e.target.checked) {
        return ctx.emit("update:modelValue", [
          ...prp.modelValue,
          e.target.value,
        ]);
      }
      return ctx.emit(
        "update:modelValue",
        prp.modelValue.filter((item) => item !== e.target.value),
      );
    };
    return { polishTranslate, changeCheckbox };
  },
});
</script>

<style lang="scss" scoped>
.checkbox {
  user-select: none;

  &__input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  &__input:focus + &__label {
    outline: 1px solid $main-color;
  }

  &__label {
    display: inline-block;
    padding: 7px 14px;
    position: relative;
    margin: 5px;
    border: 2px solid lightgray;
    font-size: 0.9rem;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  &:hover {
    opacity: 0.6;
    transition: opacity 0.2s;
  }

  &__icon {
    position: absolute;
    right: -12px;
    top: -10px;
    background-color: #fff;
    opacity: 0;
  }

  &__input:checked ~ &__label &__icon {
    opacity: 1;
  }

  &__input:checked ~ &__label {
    border: 2px solid $main-color;
  }
}

@media all and (hover: none) {
  .checkbox:hover {
    opacity: 1;
  }
}
</style>
