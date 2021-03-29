<template>
  <div class="input">
    <label :for="name" :style="{ borderColor: inputColor }">
      <span
        :class="[
          {
            'input__label--active': inputFocused || modelValue?.length,
          },
          'input__label',
        ]"
        :style="{ color: inputColor }"
        >{{ name }}</span
      >
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="inputFocused = true"
        @blur="inputFocused = false"
        :type="type"
        :name="name"
        :id="name"
        class="input__input"
      />
    </label>
    <span class="error input__error" v-if="error">{{ error }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onUpdated } from "vue";
import { HTMLInputEvent } from "../../types";
export default defineComponent({
  name: "Input",
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    modelValue: {
      type: String,
      required: true,
    },
    validate: {
      type: Boolean,
      default: true,
    },
    error: {
      type: String,
      default: "",
    },
  },
  setup(prp) {
    const inputFocused = ref(false);
    const inputColor = ref("#bebebe");

    if (prp.validate && prp.error) {
      inputColor.value = "red";
    }

    if (prp.validate) {
      inputColor.value = "green";
    }

    return { inputFocused, inputColor };
  },
});
</script>

<style lang="scss" scoped>
.input {
  width: 80vw;
  max-width: 290px;
  margin-top: 30px;

  label {
    position: relative;
    @include flex;
    border: 2px solid $shadow-color;
    border-radius: 15px;

    .input__label {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 7px;
      background-color: #fff;
      padding: 3px 10px;
      border-radius: 30px;
      color: $shadow-color;
      transition: 0.3s;
      pointer-events: none;

      &--active {
        color: #000;
        transform: translate(6px, -35px);
        font-size: 0.84rem;
        transition: 0.3s;
        z-index: 2;
      }
    }

    .input__input {
      width: 100%;
      border: 0 none;
      padding: 18px 17px 15px 17px;
      background-color: transparent;
      border-radius: 15px;
      outline: 0 none;
    }
  }
}
</style>
