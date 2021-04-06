<template>
  <div class="modal" v-if="$store.state.loading">
    <div class="modal__loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  width: 100vw;
  height: 120vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  @include flex;
  &__loader {
    display: inline-block;
    position: relative;
    width: 70px;
    height: 70px;

    div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 54px;
      height: 54px;
      margin: 8px;
      border: 6px solid var(--blue-100);
      border-radius: 50%;
      animation: loading 0.7s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: var(--blue-100) transparent transparent transparent;

      &:nth-child(1) {
        animation-delay: -0.2s;
      }
      &:nth-child(2) {
        animation-delay: -0.12s;
      }
      &:nth-child(3) {
        animation-delay: -0.05s;
      }
    }
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
