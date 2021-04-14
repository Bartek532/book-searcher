<template>
  <button @click="scrollToTop" class="scroll-to-top-button" v-if="isScrolled">
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 6.87903L4.939 13.939L7.061 16.061L12 11.121L16.939 16.061L19.061 13.939L12 6.87903Z"
        fill="var(--gray-100)"
      />
    </svg>
  </button>
</template>

<script lang="ts">
import { ref, defineComponent, onUnmounted } from "vue";
export default defineComponent({
  name: "ScrollToTop",
  setup() {
    const isScrolled = ref(false);

    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };

    const handleScroll = () => {
      isScrolled.value = window.pageYOffset > 100;
    };

    window.addEventListener("scroll", handleScroll);

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return { isScrolled, scrollToTop };
  },
});
</script>

<style lang="scss" scoped>
.scroll-to-top-button {
  position: fixed;
  z-index: 100;
  width: 30px;
  height: 30px;
  @include flex;
  bottom: 82px;
  right: 15px;
  border: 1px solid var(--gray-100);
  cursor: pointer;
  background-color: transparent;
}

@media all and (min-width: 700px) {
  .scroll-to-top-button {
    bottom: 35px;
    right: 40px;
    transform: scale(1.2);
  }
}
</style>
