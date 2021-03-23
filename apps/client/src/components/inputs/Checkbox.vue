<template>
  <div :class="['checkbox', { checked }]" :data="value" @click="selectTag">
    {{ polishTranslate[text] ? polishTranslate[text] : text }}
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
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { polishTranslate } from "../../data";
import { HTMLInputEvent } from "../../types";
export default defineComponent({
  name: "Checbox",
  props: {
    text: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: false
    },
    check: {
      type: Boolean,
      default: true
    }
  },
  setup(props, ctx) {
    const checked = ref(false);

    function selectTag(e: HTMLInputEvent) {
      if (props.check) {
        checked.value = !checked.value;
        ctx.emit("select-tag", checked.value, e.target.getAttribute("data"));
      }
    }
    return {
      checked,
      selectTag,
      polishTranslate
    };
  }
});
</script>

<style lang="scss" scoped>
.checkbox {
  display: inline-block;
  padding: 7px 14px;
  position: relative;
  border: 2px solid lightgray;
  margin: 5px;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
    transition: 0.2s;
  }

  &.checked {
    border: 2px solid $main-color;
    transition: 0.2s;

    .checkbox__icon {
      display: block;
      transition: 0.2s;
    }
  }
  &__icon {
    position: absolute;
    right: -12px;
    top: -10px;
    background: #fff;
    display: none;
  }
}

@media all and (hover: none) {
  .checkbox:hover {
    opacity: 1;
  }
}
</style>
