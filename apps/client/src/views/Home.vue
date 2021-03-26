<template>
  <section class="home">
    <img src="../assets/svgs/logo.svg" alt="logo" class="logo" />
    <h1 class="logo__name">b<span class="logo__name__blue">oo</span>k</h1>
    <h2 class="logo__subname">searcher</h2>
    <SearchInput />
  </section>
</template>

<script lang="ts">
import { onMounted } from "vue";
import SearchInput from "../components/inputs/SearchInput.vue";
import homeAnimation from "../animations/homeAnimation";
export default {
  components: {
    SearchInput,
  },
  setup() {
    onMounted(() => {
      homeAnimation();
    });
  },
};
</script>

<style lang="scss" scoped>
h1,
h2 {
  margin: 0;
}

.home {
  width: 100%;
  @include flex;
  flex-flow: column wrap;
  padding: 0;
  min-height: 90vh;

  .logo__name {
    font-weight: 700;
    font-size: 2.9rem;
    margin-top: 20px;
    &__blue {
      color: $main-color;
      font-weight: 700;
      font-size: 2.9rem;
    }
  }

  .logo__subname {
    font-size: 1.56rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 8px;
  }
}

@media all and (min-width: 700px) {
  .logo,
  .logo__name,
  .logo__subname,
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

@media all and (min-width: 1200px) {
  .logo,
  .logo__name,
  .logo__subname {
    transform: scale(1.4);
    margin: 8px 0;
  }

  .logo {
    margin-bottom: 27px;
  }

  .search {
    margin-top: 40px;
  }
}
</style>
