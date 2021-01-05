<template>
  <div>
    <router-view></router-view>
    <Navbar v-if="showNavbar" />
  </div>
</template>

<script lang="ts">
import Navbar from "./components/Navbar.vue";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
export default {
  components: {
    Navbar
  },
  setup() {
    const route = useRoute();
    const showNavbar = ref(true);

    function navbar() {
      if (window.innerWidth < 700) {
        showNavbar.value = true;
        return;
      }
      if (
        route.path.startsWith("/dashboard") &&
        route.path !== "/dashboard/start"
      ) {
        showNavbar.value = false;
        return;
      }

      if (route.path.startsWith("/results/")) {
        showNavbar.value = false;
        return;
      }

      showNavbar.value = true;
    }

    window.addEventListener("resize", navbar);
    watch(
      () => route.path,
      () => navbar()
    );

    return {
      showNavbar
    };
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700&display=swap");

* {
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
  outline: 0 none;
  -webkit-tap-highlight-color: transparent;
}

html {
  scroll-behavior: smooth;
}

body {
  @include flex;
  overflow-x: hidden;
  padding: 0;
  margin: 0;
}

.error {
  color: $warning-color;
  font-size: 0.7rem;
  margin-top: 3px;
}

.title {
  font-weight: 600;
  width: 100%;
  @include flex;
  transform: translateY(50px);

  span {
    border-bottom: 3px solid $main-color;
    text-transform: uppercase;
    width: fit-content;
    font-size: 2.2rem;
  }
}

a {
  text-decoration: none;
  color: #000;
}

input[type="search"]::-ms-clear {
  display: none;
  width: 0;
  height: 0;
}
input[type="search"]::-ms-reveal {
  display: none;
  width: 0;
  height: 0;
}

input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  display: none;
}
</style>
