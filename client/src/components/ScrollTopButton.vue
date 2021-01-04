<template>
  <button @click="scroll" class="scroll-to-top-button" v-if="isScrolled">
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 6.87903L4.939 13.939L7.061 16.061L12 11.121L16.939 16.061L19.061 13.939L12 6.87903Z"
        fill="#fff"
      />
    </svg>
  </button>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
export default defineComponent({
  setup() {
    const isScrolled = ref(false);

    function scroll() {
      window.scrollTo(0, 0);
    }

    window.addEventListener("scroll", () => {
      isScrolled.value = window.pageYOffset > 100;
      console.log(window.pageYOffset);
    });

    return { isScrolled, scroll };
  }
});
</script>

<style lang="scss" scoped>
.scroll-to-top-button {
  background-color: $main-color;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  position: fixed;
  z-index: 10000;
  bottom: 80px;
  right: 20px;
  border: 0 none;
  cursor: pointer;
}

@media all and (min-width: 700px) {
  .scroll-to-top-button {
    bottom: 40px;
    right: 40px;
    transform: scale(1.2);
  }
}
</style>
