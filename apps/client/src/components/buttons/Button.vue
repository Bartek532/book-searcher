<template>
  <button class="btn">{{ text }}</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Button",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.btn {
  padding: 12px 65px;
  background: linear-gradient(90deg, #5368ea, var(--blue-100));
  border: 0 none;
  color: var(--white-100);
  font-weight: 600;
  letter-spacing: 1.2px;
  border-radius: 30px;
  margin-top: 30px;
  transition: transform 0.3s;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  outline: 0 none;
  z-index: 1;

  &::after {
    @include pseudo;
    border-radius: 30px;
    box-shadow: 0 4px 7px 0 rgba(var(--blue-100-rgb), 0.65);
    opacity: 1;
    transition: opacity 0.3s;
  }

  &:hover,
  &:focus {
    transform: translateY(3px);
    transition: transform 0.3s;

    &::after {
      opacity: 0;
      transition: opacity 0.3s;
    }
  }
}

@media all and (max-width: 370px) {
  .btn {
    font-size: 0.9rem;
    padding: 12px 50px;
  }
}
</style>
