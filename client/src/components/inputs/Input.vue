<template>
  <div class="input">
    <label :for="name" :style="{ borderColor: inputColor }">
      <span
        :class="{
          'input__label--active': inputFocused || modelValue.length > 0
        }"
        :style="{ color: inputColor }"
        >{{ name }}</span
      >
      <input
        :value="modelValue"
        @input="validateInput"
        @focus="inputFocused = true"
        @blur="inputFocused = false"
        :type="type"
        :name="name"
        :id="name"
      />
    </label>
    <div class="error input__error" v-if="error">{{ error }}</div>
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
      required: true
    },
    type: {
      type: String,
      default: "text"
    },
    modelValue: {
      type: String,
      required: true
    },
    validate: {
      type: Boolean,
      default: true
    }
  },
  setup(prp, ctx) {
    const error = ref("");
    const inputFocused = ref(false);
    const inputColor = ref("#bebebe");
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    function validateInput(e: HTMLInputEvent) {
      ctx.emit("update:modelValue", e.target.value);
      if (prp.validate) {
        if (prp.type === "email") {
          if (!emailRegex.test(e.target.value)) {
            error.value = "Wprowadź poprawny adres email.";
            inputColor.value = "#e5383b";
          } else {
            error.value = "";
            inputColor.value = "green";
          }
        } else {
          if (e.target.value.trim().length < 3) {
            error.value = `${prp.name} musi zawierać conajmniej 3 znaki.`;
            inputColor.value = "#e5383b";
          } else {
            error.value = "";
            inputColor.value = "green";
          }
        }
      }
    }

    onUpdated(() => {
      if (prp.modelValue.trim() === "") {
        inputColor.value = "#bebebe";
        error.value = "";
      }
    });

    return { validateInput, error, inputFocused, inputColor };
  }
});
</script>

<style lang="scss" scoped>
.input {
  width: 80%;
  max-width: 310px;
  margin-top: 30px;

  label {
    position: relative;
    @include flex;
    border: 2px solid $shadow-color;
    border-radius: 15px;

    span {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 7px;
      z-index: -1;
      background-color: #fff;
      padding: 3px 10px;
      border-radius: 30px;
      color: $shadow-color;
      transition: 0.3s;

      &.input__label--active {
        color: #000;
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
      border-radius: 15px;
    }
  }
}

/*
.input {
  margin-top: 27px;
  width: 100%;
  label {
    @include flex(space-between);
    span {
      font-weight: bold;
      font-size: 0.87rem;
      text-transform: capitalize;
    }
    input {
      border: 2px solid lightgray;
      padding: 10px 13px;
      border-radius: 5px;

      &:focus {
        border: 2px solid $main-color;
        box-shadow: 0 0 12px 1px $main-color;
        transition: 0.3s;
      }
    }
  }
}
*/
</style>
