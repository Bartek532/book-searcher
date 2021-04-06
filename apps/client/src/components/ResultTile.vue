<template>
  <router-link :to="`/ksiazki/${data.slug}`">
    <article class="result">
      <div class="result__image">
        <img :src="data.img" :alt="data.name" loading="lazy" />
      </div>
      <div class="result__info">
        <span class="result__title">
          {{
            data.name.length > 36 ? data.name.slice(0, 33) + "..." : data.name
          }}
        </span>
        <span class="result__author">
          {{
            data.author.length > 24
              ? data.author.slice(0, 22) + "..."
              : data.author
          }}
        </span>

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
    </article>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { Book } from "@book-searcher/types";
export default defineComponent({
  name: "Result",
  props: {
    data: {
      type: Object as () => Book,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.result {
  padding: 10px 15px;
  @include flex(space-between);
  width: 90vw;
  max-width: 700px;
  position: relative;
  margin: 7px;
  cursor: pointer;

  &__info {
    width: 50%;
    @include flex(space-between, flex-start);
    flex-flow: column wrap;
    min-height: 130px;
  }

  &__title {
    font-weight: 700;
    font-size: 1rem;
  }

  &__author {
    font-weight: 500;
    color: rgb(158, 147, 147);
    font-size: 0.85rem;
  }

  &::after {
    @include pseudo;
    box-shadow: var(--primary-shadow);
    transition: opacity 0.3s;
    opacity: 1;
  }

  &:hover::after {
    opacity: 0;
  }
  &__image {
    max-width: 40%;
    @include flex;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  &__rates {
    margin-top: 11px;
    background-color: rgba(var(--blue-100-rgb), 0.3);
    @include flex;
    font-weight: 600;
    font-size: 0.7rem;
    color: var(--blue-100);
    padding: 2px 14px 2px 10px;
    border-radius: 13px;

    &__star {
      margin-right: 3px;
      transform: translateY(1.2px);
    }
  }
}

@media all and (min-width: 620px) {
  .result {
    flex-flow: column wrap;
    width: 200px;
    padding: 15px 15px;
    height: 400px;
    margin: 15px;

    &__info {
      width: 100%;
      min-height: 120px;
      justify-content: flex-start;
    }

    &__author {
      padding: 5px 0;
    }

    &__rates {
      position: absolute;
      bottom: 15px;
      left: 15px;
    }

    &__image {
      max-width: 100%;
      max-height: 240px;
    }
  }
}
</style>
