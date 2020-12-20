<template>
  <div>
    <router-view></router-view>
    <Navbar v-if="showNavbar" />
  </div>
</template>

<script lang="ts">
import Navbar from "./components/Navbar.vue";
import { useRouter, useRoute } from "vue-router";
import { ref, watch } from "vue";
export default {
  components: {
    Navbar
  },
  setup() {
    const router = useRouter();
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

body {
  @include flex;
  overflow-x: hidden;
}

.error {
  color: $warning-color;
  font-size: 0.7rem;
  margin-top: 3px;
}

a {
  text-decoration: none;
  color: #000;
}
</style>
