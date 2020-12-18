<template>
  <div class="modal">
    <div class="modal__container">
      <div class="modal__container__twine"></div>
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="modal__container__close"
        @click="$emit('close-modal')"
      >
        <path
          d="M6.22517 4.81099C6.03657 4.62883 5.78397 4.52803 5.52177 4.53031C5.25957 4.53259 5.00876 4.63776 4.82335 4.82317C4.63794 5.00858 4.53278 5.25939 4.5305 5.52158C4.52822 5.78378 4.62901 6.03638 4.81117 6.22499L10.5862 12L4.81017 17.775C4.71466 17.8672 4.63848 17.9776 4.58607 18.0996C4.53366 18.2216 4.50607 18.3528 4.50492 18.4856C4.50377 18.6184 4.52907 18.75 4.57935 18.8729C4.62963 18.9958 4.70388 19.1075 4.79778 19.2014C4.89167 19.2953 5.00332 19.3695 5.12622 19.4198C5.24911 19.4701 5.38079 19.4954 5.51357 19.4942C5.64635 19.4931 5.77757 19.4655 5.89958 19.4131C6.02158 19.3607 6.13192 19.2845 6.22417 19.189L12.0002 13.414L17.7752 19.189C17.9638 19.3711 18.2164 19.4719 18.4786 19.4697C18.7408 19.4674 18.9916 19.3622 19.177 19.1768C19.3624 18.9914 19.4676 18.7406 19.4698 18.4784C19.4721 18.2162 19.3713 17.9636 19.1892 17.775L13.4142 12L19.1892 6.22499C19.3713 6.03638 19.4721 5.78378 19.4698 5.52158C19.4676 5.25939 19.3624 5.00858 19.177 4.82317C18.9916 4.63776 18.7408 4.53259 18.4786 4.53031C18.2164 4.52803 17.9638 4.62883 17.7752 4.81099L12.0002 10.586L6.22517 4.80999V4.81099Z"
          fill="#CCCCCC"
        />
      </svg>

      <Rate @rate-given="rate = $event" />
      <Button text="Oceń" @click="$emit('rate-book', rate)" />
    </div>
  </div>
</template>

<script lang="ts">
import Rate from "../inputs/Rate.vue";
import Button from "../inputs/Button.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "RateModal",
  components: {
    Rate,
    Button
  },
  setup() {
    const rate = ref(1);
    return { rate };
  }
});
</script>

<style lang="scss">
.modal {
  &__container {
    @include flex;
    flex-flow: column wrap;
    width: 85vw;
    max-width: 300px;
    height: 190px;
    background-color: #fff;
    border-radius: 10px;
    position: relative;

    &__twine {
      width: 160px;
      height: 160px;
      position: absolute;
      top: -75px;
      left: 50%;
      z-index: -100;
      transform-origin: center center;
      transform: translateX(-50%) rotate(45deg);
      background-color: transparent;
      border: 5px solid #472c1b;
      border-radius: 6px;
    }

    &__close {
      position: absolute;
      top: 10px;
      right: 13px;
      cursor: pointer;
    }

    .stars {
      transform: scale(1.2);
    }
  }
}
</style>
