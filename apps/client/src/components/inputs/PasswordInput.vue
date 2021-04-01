<template>
  <div class="password">
    <label for="password__input" :style="{ borderColor: inputColor }">
      <span
        :class="{
          'input__label--active': inputFocused || modelValue.length > 0,
        }"
        :style="{ color: inputColor }"
        >{{ placeholder }}</span
      >
      <input
        type="password"
        name="password"
        @focus="inputFocused = true"
        @blur="inputFocused = false"
        class="password__input"
        :value="modelValue"
        @input="validatePassword"
      />
    </label>
    <div class="error password__error" v-if="error">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onUpdated } from "vue";
import { HTMLInputEvent } from "../../types";
export default defineComponent({
  name: "passwordInput",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "Hasło",
    },
  },
  setup(prp, ctx) {
    const inputFocused = ref(false);
    const inputColor = ref("#bebebe");
    const error = ref("");

    function validatePassword(e: HTMLInputEvent) {
      ctx.emit("update:modelValue", e.target.value);
      const regex = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
      if (!regex.test(e.target.value)) {
        error.value =
          "Hasło musi zawierać dużą i małą literę, cyfrę, znak specjalny oraz mieć conajmniej 8 znaków.";
        inputColor.value = "#e5383b";
      } else {
        error.value = "";
        inputColor.value = "green";
      }
    }

    onUpdated(() => {
      if (prp.modelValue.trim() === "") {
        inputColor.value = "#bebebe";
        error.value = "";
      }
    });

    return { validatePassword, error, inputFocused, inputColor };
  },
});
</script>

<style lang="scss" scoped>
.password {
  width: 80%;
  max-width: 310px;
  margin-top: 30px;

  label {
    position: relative;
    @include flex;
    border: 2px solid var(--gray-100);
    border-radius: 15px;

    span {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 7px;
      z-index: -1;
      background-color: var(--white-100);
      padding: 3px 10px;
      border-radius: 30px;
      color: var(--gray-100);
      transition: 0.3s;

      &.input__label--active {
        color: var(--black-100);
        transform: translate(6px, -35px);
        font-size: 0.84rem;
        transition: 0.3s;
        z-index: 2;
      }
    }

    input {
      width: 100%;
      border: 0 none;
      padding: 18px 17px 15px 17px;
      background-color: transparent;
      border-radius: 10px;
    }
  }

  .error {
    color: var(--red-100);
    font-size: 0.7rem;
    margin-top: 3px;
  }
}
</style>
