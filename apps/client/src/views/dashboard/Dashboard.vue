<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const isLoggedIn = async () => {
      await store.dispatch("isLoggedIn");

      if (!store.state.isLogIn) {
        router.push({ path: "/logowanie" });
      }
    };

    isLoggedIn();
  },
};
</script>
