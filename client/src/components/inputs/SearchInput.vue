<template>
  <div class="search">
    <div
      class="search__circle"
      :class="{ 'search__circle--active': inputFocused }"
    >
      <input
        type="search"
        class="search__circle__input"
        placeholder="Szukaj"
        @blur="inputFocused = false"
        @focus="inputFocused = true"
        v-model="query"
        @keyup.enter="search"
      />
      <svg
        class="search__circle__icon"
        width="20"
        height="21"
        viewBox="0 0 32 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        @click="searchAnimation"
      >
        <path
          d="M30.895 29.0981L23.9117 21.9311C25.593 19.634 26.5006 16.838 26.4975 13.965C26.4975 6.6266 20.6802 0.65625 13.53 0.65625C6.37977 0.65625 0.5625 6.6266 0.5625 13.965C0.5625 21.3034 6.37977 27.2738 13.53 27.2738C16.3293 27.2769 19.0536 26.3454 21.2918 24.6199L28.275 31.7869C28.6285 32.1112 29.0896 32.2844 29.5635 32.2707C30.0375 32.2571 30.4884 32.0578 30.8236 31.7137C31.1589 31.3696 31.3531 30.9069 31.3664 30.4205C31.3796 29.934 31.211 29.4609 30.895 29.0981V29.0981ZM4.2675 13.965C4.2675 12.0848 4.81074 10.2469 5.82851 8.68361C6.84629 7.12032 8.29289 5.90188 9.98539 5.18237C11.6779 4.46286 13.5403 4.27461 15.337 4.64141C17.1338 5.00821 18.7842 5.91359 20.0796 7.24307C21.375 8.57254 22.2571 10.2664 22.6145 12.1104C22.9719 13.9545 22.7885 15.8658 22.0874 17.6029C21.3864 19.3399 20.1992 20.8246 18.676 21.8692C17.1528 22.9137 15.3619 23.4712 13.53 23.4712C11.0743 23.4682 8.7201 22.4657 6.98368 20.6836C5.24726 18.9015 4.27045 16.4853 4.2675 13.965V13.965Z"
          fill="#2524E9"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import gsap from "gsap";
export default defineComponent({
  name: "searchInput",
  setup() {
    const inputFocused = ref(false);
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const query = computed({
      get: () => store.state.query,
      set: value => store.commit("UPDATE_QUERY", value)
    });

    let counter = 0;
    function search() {
      counter++;

      if (counter >= 2) {
        if (route.path === "/") {
          router.push({ path: "/results" });
        }
        store.dispatch("searchByQuery");
      }
    }
    function searchAnimation() {
      search();
      const tl = gsap.timeline();

      tl.addLabel("search")
        .to(".search__circle", 0.6, {
          width: "80vw",
          maxWidth: "370px",
          borderRadius: "20px"
        })
        .to(
          ".search__circle__input",
          0.6,
          {
            transformOrigin: "50% 0",
            scaleX: 1
          },
          "search"
        )
        .to(
          ".search__circle__icon",
          0.6,
          {
            left: "90%",
            rotate: "360"
          },
          "search"
        );
    }

    return {
      inputFocused,
      searchAnimation,
      search,
      query
    };
  }
});
</script>

<style lang="scss" scoped>
.search {
  margin-top: 30px;
  &__circle {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    position: relative;
    box-shadow: 1px 4px 5px 0 $shadow-color;
    transition: box-shadow 0.3s;
    @include flex(flex-start);

    &--active {
      box-shadow: 2px 4px 5px 0 rgba($main-color, 0.8);
      transition: 0.3s;
    }

    &__input {
      width: 65vw;
      max-width: 300px;
      transform: scaleX(0);
      border-radius: 20px 0 0 20px;
      padding: 3px 20px;
      border: 0 none;
      border-right: 2px solid lightgray;
    }
    &__icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
    }
  }
}

@media all and (min-width: 1100px) {
  .search {
    margin-top: 25px;
  }
}
</style>
