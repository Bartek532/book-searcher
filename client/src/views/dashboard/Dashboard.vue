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

    async function isLoggedIn() {
      await store.dispatch("isLoggedIn");

      if (!store.state.isLogIn) {
        router.push({ path: "/auth/login" });
      }
    }

    isLoggedIn();
  }
};
</script>
