<template>
  <button class="back" @click="$router.go(-1)">
    <svg
      class="back__icon"
      width="15"
      height="30"
      viewBox="0 0 192 336"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M168 24L24 168L168 312"
        stroke="#9c9bf0"
        stroke-width="48"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<style lang="scss" scoped>
.back {
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
  border: 0 none;
  background-color: transparent;
}
</style>
