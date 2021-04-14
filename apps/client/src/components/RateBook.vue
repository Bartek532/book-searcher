<template>
  <div class="modal" v-if="isModalOpen">
    <form class="modal__container" @submit.prevent="handleRateBook">
      <div class="modal__container__twine"></div>
      <button class="modal__container__close" @click="isModalOpen = false">
        <img src="../assets/svgs/icons/close.svg" alt="close" />
      </button>
      <Rate v-model="rate" />
      <Button text="Oceń" />
    </form>
  </div>
  <button class="btn" @click="isModalOpen = true" type="button">
    <img
      src="../assets/svgs/icons/star.svg"
      alt="star"
      width="32"
      height="32"
    />
  </button>
</template>

<script lang="ts">
import Rate from "./form/Rate.vue";
import Button from "./buttons/Button.vue";
import { defineComponent, ref, watch } from "vue";
import { useRateBook } from "../utils/hooks";
import { useForm, useField } from "vee-validate";
export default defineComponent({
  name: "RateModal",
  props: {
    bookId: {
      type: Number,
      required: true,
    },
  },
  components: {
    Rate,
    Button,
  },
  setup(prp, ctx) {
    const isModalOpen = ref(false);
    const { handleSubmit } = useForm({ initialValues: { rate: 3 } });

    const { loading, rateBook } = useRateBook();

    const handleRateBook = handleSubmit((data) => {
      isModalOpen.value = false;
      return rateBook(prp.bookId, data.rate);
    });

    watch(
      () => loading.value,
      () => {
        return ctx.emit("loading", loading.value);
      },
    );

    const { value: rate } = useField("rate");

    return { handleRateBook, rate, isModalOpen };
  },
});
</script>

<style lang="scss">
.modal {
  &__container {
    @include flex;
    flex-flow: column wrap;
    width: 85vw;
    max-width: 300px;
    padding: 45px 0 35px 0;
    background-color: var(--white-100);
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
      top: 7px;
      right: 5px;
      cursor: pointer;
      border: 0 none;
      background-color: transparent;
      cursor: pointer;
    }

    .stars {
      transform: scale(1.2);
    }
  }
}

.btn {
  border: 0 none;
  background-color: transparent;
  cursor: pointer;
}
</style>
