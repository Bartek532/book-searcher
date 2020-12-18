<template>
  <div class="result" @click="$router.push({ path: `/results/${data.slug}` })">
    <div
      class="result__image"
      :style="{ backgroundImage: `url(${data.img})` }"
    ></div>
    <div
      :class="[
        'result__title',
        { result__title__smaller: data.name.length > 21 }
      ]"
    >
      {{ data.name.length > 30 ? data.name.slice(0, 28) + "..." : data.name }}
    </div>
    <div class="result__rates">
      <div class="result__rates__star">
        <svg
          width="14"
          height="14"
          viewBox="0 0 7 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.95531 2.72367L4.38147 2.48415L3.67792 0.990544C3.6587 0.94965 3.62709 0.916546 3.58803 0.896423C3.49009 0.845792 3.37108 0.887985 3.32211 0.990544L2.61856 2.48415L1.04471 2.72367C1.00132 2.73017 0.961648 2.75159 0.931274 2.78404C0.894554 2.82356 0.87432 2.87674 0.875017 2.93187C0.875715 2.98701 0.897287 3.0396 0.934994 3.07809L2.07369 4.24065L1.80467 5.88226C1.79836 5.92044 1.8024 5.95972 1.81632 5.99563C1.83024 6.03153 1.85349 6.06264 1.88344 6.08541C1.91338 6.10819 1.94882 6.12172 1.98573 6.12448C2.02265 6.12723 2.05956 6.1191 2.09229 6.10101L3.50001 5.32597L4.90774 6.10101C4.94617 6.12243 4.9908 6.12957 5.03357 6.12178C5.14143 6.1023 5.21395 5.9952 5.19536 5.88226L4.92633 4.24065L6.06503 3.07809C6.09602 3.04628 6.11648 3.00474 6.12268 2.9593C6.13942 2.84571 6.06379 2.74055 5.95531 2.72367Z"
            fill="#2524E9"
          />
        </svg>
      </div>
      <div class="result__rates__rate">
        {{
          (
            data.UserBookRate.reduce((acc, { rate }) => acc + rate, 0) /
            data.UserBookRate.length
          ).toFixed(1)
        }}
        / 6
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Result",
  props: {
    data: {
      type: Object,
      required: true
    }
  }
});
</script>

<style lang="scss" scoped>
.result {
  padding: 10px 15px;
  width: 40vw;
  max-width: 160px;
  height: 300px;
  flex: 1 1 150px;
  @include flex(center, flex-start);
  flex-flow: column wrap;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 2px 1px,
    rgba(0, 0, 0, 0.11) 0px 4px 8px 0px;
  border-radius: 10px;
  margin: 7px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    box-shadow: rgba($main-color, 0.17) 0px 0px 2px 1px,
      rgba($main-color, 0.24) 0px 4px 8px 0px;
    transition: 0.3s;
  }
  &__image {
    width: 100%;
    height: 190px;
    border-radius: 10px;
    background-position: center center;
    background-size: cover;
  }

  &__title {
    font-weight: bold;
    font-size: 0.95rem;
    margin-top: 15px;
    height: 40px;

    &__smaller {
      font-size: 0.87rem;
    }
  }

  &__rates {
    margin-top: 11px;
    background-color: rgba($main-color, 0.3);
    @include flex;
    font-weight: bold;
    font-size: 0.7rem;
    color: $main-color;
    padding: 2px 14px 2px 10px;
    border-radius: 13px;

    &__star {
      margin-right: 3px;
      transform: translateY(1.2px);
    }
  }
}

@media all and (min-width: 410px) {
  .result {
    margin: 11px;
  }
}
@media all and (min-width: 800px) {
  .result {
    margin: 13px;
  }
}

@media all and (max-width: 370px) {
  .result {
    transform: scale(0.9);
    flex: 1 1 140px;
    margin: 0;
  }
}

@media all and (max-width: 340px) {
  .result__image {
    height: 170px;
  }
}
</style>
