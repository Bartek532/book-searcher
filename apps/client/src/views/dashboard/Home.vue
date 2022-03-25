<template>
  <main :class="['dashboard', { withMessage: !isAdmin }]">
    <h2 class="title" v-if="user.isAdmin === 'not_requested'">
      Nie masz jeszcze dostępu do wszystkich opcji. By to zmienić,
      <router-link to="/panel/konto" class="admin">zostań adminem!</router-link>
    </h2>
    <h2 class="title" v-else-if="user.isAdmin === 'pending'">
      Już za chwilę będziesz mógł korzystać ze wszystkich opcji... 😉
    </h2>

    <div class="options">
      <button
        @click="
          option.link
            ? $router.push({ path: `/panel/${option.link}` })
            : option.onClick()
        "
        class="option"
        v-for="option in options.filter((option) =>
          option.visibility === 'superAdmin' ? user.isSuperAdmin : true,
        )"
        :key="option.icon"
        :disabled="option.visibility === 'admin' && user.isAdmin !== 'accepted'"
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
import { useRouter } from "vue-router";
import { useUser } from "../../utils/composable/useUser";
export default {
  setup() {
    const router = useRouter();
    const { logout, user, getUserInfo } = useUser();

    getUserInfo();

    const handleLogout = () => {
      logout();
      router.push({ path: "/logowanie" });
    };

    const options = [
      { icon: "add", label: "Dodaj", link: "dodaj", visibility: "admin" },
      { icon: "library", label: "Moje książki", link: "biblioteka" },
      {
        icon: "move",
        label: "Przenieś",
        link: "przenies",
        visibility: "admin",
      },
      {
        icon: "admin",
        label: "Zarządzaj",
        link: "zarzadzaj",
        visibility: "superAdmin",
      },
      { icon: "user", label: "Moje konto", link: "konto" },
      { icon: "logout", label: "Wyloguj", onClick: handleLogout },
    ];

    return { options, user };
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  @include flex;
  flex-flow: column wrap;
  padding-top: 50px;
  padding-bottom: 30px;

  .title {
    max-width: 45rem;
    text-align: center;
    line-height: 1.6;
    padding: 0 2rem;
    padding-bottom: 2rem;
    font-size: 1.45rem;
    .admin {
      color: var(--orange-100);
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }
  }

  .options {
    @include flex;
    flex-wrap: wrap;
    padding: 0 1rem;

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

      &:not(:disabled)::after {
        border-radius: 10px;
        @include pseudo;
        opacity: 1;
        transition: opacity 0.3s;
        box-shadow: var(--primary-shadow);
        z-index: -1;
      }

      &:not(:disabled):focus,
      &:not(:disabled):hover {
        transform: translateY(1px);

        &::after {
          opacity: 0;
        }
      }

      &:disabled {
        filter: grayscale(85%);
        opacity: 0.6;
        cursor: not-allowed;
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
  .dashboard {
    .title {
      font-size: 1.55rem;
      padding: 0 2.5rem;
      padding-bottom: 3rem;
    }
    .options .option {
      margin: 15px;
    }
  }
}

@media all and (min-width: 1100px) {
  .dashboard {
    &.withMessage {
      padding-top: 0;
      margin-top: -30px;
    }
    .options {
      padding: 0 10px;
    }

    .title {
      font-size: 1.6rem;
      padding: 0 3rem;
      padding-bottom: 3.5rem;
    }
  }
}
</style>
