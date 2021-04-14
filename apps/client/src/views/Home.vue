<template>
  <main class="home">
    <img src="../assets/svgs/logo.svg" alt="logo" class="logo" />
    <h1 class="name">b<span class="name__blue">oo</span>k</h1>
    <h2 class="subname">searcher</h2>
    <SearchInput
      @search="
        $router.push({
          path: '/ksiazki',
          query: { q: $event.target.value },
        })
      "
    />
  </main>
</template>

<script lang="ts">
import { onMounted, defineComponent } from "vue";
import SearchInput from "../components/form/SearchInput.vue";
import homeAnimation from "../animations/homeAnimation";
export default defineComponent({
  name: "Home",
  components: {
    SearchInput,
  },
  setup() {
    onMounted(() => {
      homeAnimation();
    });
  },
});
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  @include flex;
  flex-flow: column wrap;
  padding: 0;

  .name {
    font-weight: 700;
    font-size: 2.9rem;
    margin: 0;
    margin-top: 20px;
    &__blue {
      color: var(--blue-100);
    }
  }

  .subname {
    font-size: 1.56rem;
    font-weight: 500;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 8px;
  }
}

@media all and (min-width: 700px) {
  .home {
    .logo,
    .name,
    .subname,
    .search {
      transform: scale(1.2);
      margin: 7px 0;
    }

    .logo {
      margin-bottom: 14px;
    }

    .search {
      margin-top: 30px;
    }
  }
}

@media all and (min-width: 1200px) {
  .home {
    .logo,
    .name,
    .subname {
      transform: scale(1.4);
      margin: 8px 0;
    }

    .logo {
      margin-bottom: 32px;
    }

    .search {
      margin-top: 40px;
    }
  }
}
</style>
