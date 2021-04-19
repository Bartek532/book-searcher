<template>
  <div class="cookies" v-if="!cookiesAccepted && isModalShow">
    <p>Ta aplikacja korzysta z plików cookies.</p>
    <button class="cookies__btn" @click="handleAcceptCookies">Akceptuj</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
export default defineComponent({
  name: "CookiesPopup",
  setup() {
    const isModalShow = ref(true);
    const cookiesAccepted = computed({
      get: () => !!localStorage.getItem("cookiesAccepted"),
      set: (x) => {
        localStorage.setItem("cookiesAccepted", x.toString());
      },
    });

    const handleAcceptCookies = () => {
      cookiesAccepted.value = true;
      isModalShow.value = false;
    };

    return { cookiesAccepted, handleAcceptCookies, isModalShow };
  },
});
</script>

<style lang="scss" scoped>
.cookies {
  width: 90%;
  max-width: 700px;
  position: fixed;
  bottom: 95px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: var(--primary-shadow);
  @include flex(space-between);
  padding: 5px 20px;
  border-radius: 15px;
  z-index: 70;
  animation: fadeUp 0.4s ease-out;
  background-color: var(--white-100);

  &__btn {
    border: 2px solid var(--blue-100);
    padding: 7px 15px;
    background-color: var(--blue-100);
    color: var(--white-100);
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s ease-out;
    margin-left: 15px;

    &:hover,
    &:focus {
      background-color: var(--white-100);
      color: var(--blue-100);
    }
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translate(-50%, 100px);
  }
  to {
    opacity: 1;
    transform: translateY(-50%, 0);
  }
}

@media all and (min-width: 700px) {
  .cookies {
    bottom: 20px;
  }
}
</style>
