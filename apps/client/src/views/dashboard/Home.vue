<template>
  <main class="dashboard">
    <div class="options">
      <button
        @click="
          option.link
            ? $router.push({ path: `/panel/${option.link}` })
            : option.onClick()
        "
        class="option"
        v-for="option in options"
        :key="option.icon"
      >
        <div class="option__icon">
          <img
            :src="require(`../../assets/svgs/dashboard/${option.icon}.svg`)"
            :alt="option.label"
          />
        </div>
        <span class="option__label">{{ option.label }}</span>
      </button>
    </div>
  </main>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const logout = () => {
      store.dispatch("logout");
      router.push({ path: "/logowanie" });
    };

    const options = [
      { icon: "add", label: "Dodaj", link: "dodaj" },
      { icon: "library", label: "Moje książki", link: "biblioteka" },
      { icon: "move", label: "Przenieś", link: "przenies" },
      { icon: "user", label: "Moje konto", link: "konto" },
      { icon: "logout", label: "Wyloguj", onClick: logout },
    ];

    return { options };
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  @include flex;
  padding-top: 50px;
  padding-bottom: 30px;

  .options {
    @include flex;
    flex-wrap: wrap;

    .option {
      flex: 0 1 270px;
      border: 0 none;
      padding: 20px 30px;
      border-radius: 10px;
      position: relative;
      width: 270px;
      margin: 7px;
      transition: transform 0.3s;
      height: 85px;
      cursor: pointer;
      display: grid;
      grid-template-columns: 1fr 4fr;
      align-items: center;
      outline: 0 none;

      &::after {
        border-radius: 10px;
        @include pseudo;
        opacity: 1;
        transition: opacity 0.3s;
        box-shadow: var(--primary-shadow);
        z-index: -1;
      }

      &:focus,
      &:hover {
        transform: translateY(1px);

        &::after {
          opacity: 0;
        }
      }

      &:nth-child(1) {
        background: linear-gradient(90deg, #fad7a1, #e96d71);
      }

      &:nth-child(2) {
        background: linear-gradient(90deg, #fccf31, #f55555);
      }

      &:nth-child(3) {
        background: linear-gradient(90deg, #79f1a4, #0e5cad);
      }

      &:nth-child(4) {
        background: linear-gradient(90deg, #43cbff, #9708cc);
      }

      &:nth-child(5) {
        background: linear-gradient(90deg, #f97794, #623aa2);
      }

      &:nth-child(6) {
        background: linear-gradient(90deg, #ffdb01, #0e197d);
      }

      &__label {
        color: var(--white-100);
        font-weight: 600;
        text-transform: uppercase;
        font-size: 1.1rem;
      }
    }
  }
}

@media all and (min-width: 720px) {
  .dashboard .options .option {
    margin: 15px;
  }
}

@media all and (min-width: 1100px) {
  .options {
    padding: 0 10px;
  }
}
</style>
