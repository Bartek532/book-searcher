<template>
  <router-view v-if="isLoggedIn"></router-view>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { useUser } from "../../utils/composable/useUser";
export default {
  setup() {
    const router = useRouter();
    const { checkLoginStatus, isLoggedIn } = useUser();

    const handleAuthorize = async () => {
      await checkLoginStatus();
      if (!isLoggedIn.value) {
        router.push({ path: "/logowanie" });
      }
    };
    handleAuthorize();

    return { isLoggedIn };
  },
};
</script>
