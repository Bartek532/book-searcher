<template>
  <article class="result">
    <div class="result__image">
      <img :src="data.img" :alt="data.name" loading="lazy" />
    </div>
    <div class="result__info">
      <span class="result__info__title">
        {{ data.name.length > 36 ? data.name.slice(0, 33) + "..." : data.name }}
      </span>
      <span class="result__info__author">
        {{
          data.author.length > 24
            ? data.author.slice(0, 22) + "..."
            : data.author
        }}
      </span>

      <div class="result__info__rates">
        <img
          class="result__info__rates__star"
          src="../../assets/svgs/icons/star-small.svg"
          alt="star"
        />
        <div class="result__info__rates__rate">
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
    <button class="result__btn">
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        v-if="$route.path === '/panel/przenies'"
      >
        <path
          d="M4 8L1 11L4 14"
          stroke="#2524e9"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8 4L11 1L14 4"
          stroke="#2524e9"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14 18L11 21L8 18"
          stroke="#2524e9"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18 8L21 11L18 14"
          stroke="#2524e9"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M1 11H21"
          stroke="#2524e9"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11 1V21"
          stroke="#2524e9"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <svg
        width="7"
        height="12"
        viewBox="0 0 11 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        v-else
      >
        <path
          d="M2.16672 19.9167C1.83571 19.9173 1.51493 19.8021 1.26005 19.5909C1.1166 19.4719 0.998025 19.3259 0.911109 19.161C0.824194 18.9962 0.770649 18.8159 0.753542 18.6303C0.736434 18.4448 0.7561 18.2577 0.811414 18.0797C0.866727 17.9018 0.956599 17.7365 1.07588 17.5934L7.42255 10L1.30255 2.39252C1.18488 2.24761 1.097 2.08087 1.04397 1.90189C0.990941 1.72291 0.973808 1.53522 0.993555 1.34959C1.0133 1.16397 1.06954 0.984078 1.15904 0.82026C1.24853 0.656441 1.36952 0.511925 1.51505 0.395017C1.66163 0.266049 1.83328 0.16877 2.01924 0.109286C2.20519 0.0498011 2.40143 0.0293959 2.59565 0.0493495C2.78986 0.0693031 2.97786 0.129185 3.14783 0.225238C3.31781 0.32129 3.46609 0.451439 3.58339 0.607518L10.4259 9.10752C10.6343 9.36101 10.7482 9.67897 10.7482 10.0071C10.7482 10.3352 10.6343 10.6532 10.4259 10.9067L3.34255 19.4067C3.20044 19.5781 3.0199 19.7137 2.81561 19.8023C2.61131 19.8909 2.389 19.9301 2.16672 19.9167Z"
          fill="#2524e9"
        />
      </svg>
    </button>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { Book } from "@book-searcher/types";
export default defineComponent({
  name: "ResultTile",
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
  max-width: 430px;
  position: relative;
  margin: 7px;
  cursor: pointer;

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

  &__info {
    width: 50%;
    @include flex(space-evenly, flex-start);
    flex-flow: column wrap;
    min-height: 130px;

    &__title {
      font-weight: 700;
      font-size: 1rem;
      word-break: break-word;
    }

    &__author {
      font-weight: 500;
      color: rgb(158, 147, 147);
      font-size: 0.85rem;
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
        transform: translateY(-0.5px);
      }
    }
  }

  &__btn {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid var(--blue-100);
    background-color: #fff;
    @include flex;
    position: absolute;
    bottom: 11px;
    right: 11px;
    cursor: pointer;
    outline: 0 none;

    &:focus {
      background-color: var(--blue-100);

      svg path {
        fill: var(--white-100);
        stroke: var(--white-100);
      }
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

    &__image {
      max-width: 100%;
      max-height: 240px;
    }

    &__info {
      width: 100%;
      min-height: 120px;
      justify-content: flex-start;

      &__author {
        padding: 5px 0;
      }

      &__rates {
        position: absolute;
        bottom: 15px;
        left: 15px;
      }
    }
  }
}
</style>
