<template>
  <div class="input">
    <label :style="{ borderColor: inputColor }" class="input__label">
      <span
        :class="[
          {
            'input__label__placeholder--active':
              inputFocused || modelValue?.length,
          },
          'input__label__placeholder',
        ]"
        :style="{ color: inputColor }"
        >{{ placeholder }}</span
      >
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="inputFocused = true"
        @blur="inputFocused = false"
        :type="type"
        class="input__label__input"
      />
    </label>
    <span class="error input__error" v-if="error">{{ error }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
export default defineComponent({
  name: "Input",
  props: {
    placeholder: {
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
    const inputColor = computed(() => {
      if (prp.error) {
        return "var(--red-100)";
      }

      if (!prp.validate || !prp.modelValue) {
        return "var(--gray-100)";
      }

      return "var(--green-100)";
    });

    return { inputFocused, inputColor };
  },
});
</script>

<style lang="scss" scoped>
.input {
  width: 85vw;
  max-width: 310px;
  margin-top: 30px;

  &__label {
    position: relative;
    @include flex;
    border: 2px solid var(--gray-100);
    border-radius: 15px;

    &__placeholder {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 7px;
      background-color: var(--white-100);
      padding: 3px 10px;
      border-radius: 30px;
      color: var(--gray-100);
      transition: 0.3s;
      pointer-events: none;

      &--active {
        color: var(--black-100);
        transform: translate(6px, -38px);
        font-size: 0.84rem;
        transition: 0.3s;
        z-index: 2;
      }
    }

    &__input {
      width: 100%;
      border: 0 none;
      padding: 19px 17px 19px 17px;
      background-color: transparent;
      border-radius: 15px;
      outline: 0 none;
    }
  }

  &__error {
    color: var(--red-100);
    font-size: 0.8rem;
    padding: 5px;
    display: block;
  }
}
</style>
