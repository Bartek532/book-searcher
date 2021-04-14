<template>
  <div class="search">
    <form
      @submit.prevent="handleSearch"
      class="search__circle"
      :class="{ 'search__circle--active': inputFocused || active }"
    >
      <input
        type="search"
        class="search__circle__input"
        placeholder="Szukaj"
        name="search"
        @blur="inputFocused = false"
        @focus="inputFocused = true"
        v-model="query"
      />
      <button
        class="search__circle__submit"
        @focus="inputFocused = true"
        @blur="inputFocused = false"
      >
        <span class="sr-only">Search</span>
        <svg
          width="20"
          height="21"
          viewBox="0 0 32 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30.895 29.0981L23.9117 21.9311C25.593 19.634 26.5006 16.838 26.4975 13.965C26.4975 6.6266 20.6802 0.65625 13.53 0.65625C6.37977 0.65625 0.5625 6.6266 0.5625 13.965C0.5625 21.3034 6.37977 27.2738 13.53 27.2738C16.3293 27.2769 19.0536 26.3454 21.2918 24.6199L28.275 31.7869C28.6285 32.1112 29.0896 32.2844 29.5635 32.2707C30.0375 32.2571 30.4884 32.0578 30.8236 31.7137C31.1589 31.3696 31.3531 30.9069 31.3664 30.4205C31.3796 29.934 31.211 29.4609 30.895 29.0981V29.0981ZM4.2675 13.965C4.2675 12.0848 4.81074 10.2469 5.82851 8.68361C6.84629 7.12032 8.29289 5.90188 9.98539 5.18237C11.6779 4.46286 13.5403 4.27461 15.337 4.64141C17.1338 5.00821 18.7842 5.91359 20.0796 7.24307C21.375 8.57254 22.2571 10.2664 22.6145 12.1104C22.9719 13.9545 22.7885 15.8658 22.0874 17.6029C21.3864 19.3399 20.1992 20.8246 18.676 21.8692C17.1528 22.9137 15.3619 23.4712 13.53 23.4712C11.0743 23.4682 8.7201 22.4657 6.98368 20.6836C5.24726 18.9015 4.27045 16.4853 4.2675 13.965V13.965Z"
            fill="#2524E9"
          />
        </svg>
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { prepareQueryToSearch } from "../../utils/functions";
export default defineComponent({
  name: "SearchInput",
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup(prp, ctx) {
    const inputFocused = ref(false);
    const query = ref("");

    const handleSearch = () => {
      ctx.emit("search", prepareQueryToSearch(query.value));
    };

    return {
      inputFocused,
      handleSearch,
      query,
    };
  },
});
</script>

<style lang="scss" scoped>
.search {
  margin-top: 30px;
  position: relative;
  z-index: 10;
  @include flex;
  width: 85vw;
  max-width: 350px;

  &__circle {
    --size: 55px;
    width: var(--size);
    height: var(--size);
    overflow: hidden;
    border-radius: 100px;
    position: relative;
    display: flex;
    padding: 5px;
    transition: width 0.4s;
    box-shadow: 1px 3px 5px 0 var(--gray-100);

    &__input {
      border: 0;
      padding: 0.25em 1em;
      flex-grow: 1;
      outline: 0;
      z-index: 2;
      position: absolute;
      top: 50%;
      transform: translateY(-55%);
      width: 100%;
      background: transparent;
      opacity: 0;
      cursor: pointer;
    }

    &__submit {
      font-size: 1.5rem;
      margin-left: auto;
      background: 0;
      border: 0;
      cursor: pointer;
      border-radius: 50%;
      width: calc(var(--size) - 10px);
      height: calc(var(--size) - 10px);
      outline: 0 none;

      &:focus svg path {
        fill: #000;
      }
    }

    &--active {
      width: 100%;
      border-radius: 20px;

      .search__circle__input {
        opacity: 1;
        z-index: initial;
        cursor: initial;
        width: calc(100% - var(--size));
      }
    }
  }
}
</style>
