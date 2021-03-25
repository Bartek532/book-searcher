<template>
  <nav class="tab">
    <ul
      class="tab__items"
      @touchstart="tilt"
      @mousedown="tilt"
      @mouseup="activateRoute"
      @touchend="activateRoute"
    >
      <li>
        <router-link to="/" class="tab__item">
          <svg
            width="30"
            height="27"
            viewBox="0 0 20 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="tab__icon"
          >
            <path
              d="M18.672 10H17V16C17 16.445 16.806 17 16 17H12V11H7.99998V17H3.99998C3.19398 17 2.99998 16.445 2.99998 16V10H1.32798C0.729984 10 0.857984 9.67602 1.26798 9.25202L9.29198 1.22002C9.48698 1.01802 9.74298 0.91802 9.99998 0.90802C10.257 0.91802 10.513 1.01702 10.708 1.22002L18.731 9.25102C19.142 9.67602 19.27 10 18.672 10V10Z"
              fill="black"
            />
          </svg>

          <span class="tab__item__label">start</span>
        </router-link>
      </li>
      <li>
        <router-link to="/rooms" class="tab__item">
          <svg
            width="32"
            height="26"
            viewBox="0 0 20 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="tab__icon"
          >
            <path
              d="M10 0.25C15.385 0.25 19.75 4.615 19.75 10C19.75 14.12 16.855 18.61 11.14 23.518C10.8222 23.791 10.4171 23.9409 9.99813 23.9405C9.5792 23.9402 9.1743 23.7895 8.857 23.516L8.479 23.188C3.017 18.408 0.25 14.028 0.25 10C0.25 4.615 4.615 0.25 10 0.25ZM10 6.25C9.00544 6.25 8.05161 6.64509 7.34835 7.34835C6.64509 8.05161 6.25 9.00544 6.25 10C6.25 10.9946 6.64509 11.9484 7.34835 12.6517C8.05161 13.3549 9.00544 13.75 10 13.75C10.9946 13.75 11.9484 13.3549 12.6517 12.6517C13.3549 11.9484 13.75 10.9946 13.75 10C13.75 9.00544 13.3549 8.05161 12.6517 7.34835C11.9484 6.64509 10.9946 6.25 10 6.25Z"
              fill="black"
            />
          </svg>

          <span class="tab__item__label">lokalizacja</span>
        </router-link>
      </li>
      <li>
        <router-link to="/search" class="tab__item">
          <svg
            class="tab__icon"
            width="26"
            height="27"
            viewBox="0 0 32 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.895 29.0981L23.9117 21.9311C25.593 19.634 26.5006 16.838 26.4975 13.965C26.4975 6.6266 20.6802 0.65625 13.53 0.65625C6.37977 0.65625 0.5625 6.6266 0.5625 13.965C0.5625 21.3034 6.37977 27.2738 13.53 27.2738C16.3293 27.2769 19.0536 26.3454 21.2918 24.6199L28.275 31.7869C28.6285 32.1112 29.0896 32.2844 29.5635 32.2707C30.0375 32.2571 30.4884 32.0578 30.8236 31.7137C31.1589 31.3696 31.3531 30.9069 31.3664 30.4205C31.3796 29.934 31.211 29.4609 30.895 29.0981V29.0981ZM4.2675 13.965C4.2675 12.0848 4.81074 10.2469 5.82851 8.68361C6.84629 7.12032 8.29289 5.90188 9.98539 5.18237C11.6779 4.46286 13.5403 4.27461 15.337 4.64141C17.1338 5.00821 18.7842 5.91359 20.0796 7.24307C21.375 8.57254 22.2571 10.2664 22.6145 12.1104C22.9719 13.9545 22.7885 15.8658 22.0874 17.6029C21.3864 19.3399 20.1992 20.8246 18.676 21.8692C17.1528 22.9137 15.3619 23.4712 13.53 23.4712C11.0743 23.4682 8.7201 22.4657 6.98368 20.6836C5.24726 18.9015 4.27045 16.4853 4.2675 13.965V13.965Z"
              fill="#9c9bf0"
            />
          </svg>
          <span class="tab__item__label">szukaj</span>
        </router-link>
      </li>
      <li>
        <router-link
          :to="!$store.state.isLogIn ? '/auth/login' : '/dashboard/start'"
          class="tab__item tab__item__login"
        >
          <svg
            width="30"
            height="24"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="tab__icon"
          >
            <path
              d="M4.5 4.5C4.5 6.981 6.519 9 9 9C11.481 9 13.5 6.981 13.5 4.5C13.5 2.019 11.481 0 9 0C6.519 0 4.5 2.019 4.5 4.5ZM17 19H18V18C18 14.141 14.859 11 11 11H7C3.14 11 0 14.141 0 18V19H17Z"
              fill="black"
            />
          </svg>

          <span class="tab__item__label">
            {{ $store.state.isLogIn ? "konto" : "zaloguj" }}
          </span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import gsap, { Power4, Back } from "gsap";
import { ref, defineComponent } from "vue";
import { HTMLElementEvent } from "../types";
export default defineComponent({
  name: "Navbar",
  setup() {
    const activeRoute = ref(1);

    const tilt = (e: HTMLElementEvent) => {
      if (e.target.classList.contains("tab__item")) {
        gsap.to(e.target, {
          scale: 0.7,
          rotate: "10deg",
          ease: Power4.easeOut,
          duration: 0.4,
        });
      }
    };

    const activateRoute = (e: HTMLElementEvent) => {
      const items = document.querySelectorAll(".tab__item");

      if (e.target.classList.contains("tab__item")) {
        items.forEach(item => item.classList.remove("tab__item--active"));
        e.target.classList.add("tab__item--active");

        gsap.to(e.target, {
          scale: 1,
          rotate: 0,
          ease: Back.easeOut.config(5),
        });
      }
    };

    return {
      activeRoute,
      activateRoute,
      tilt,
    };
  },
});
</script>

<style lang="scss" scoped>
.tab {
  padding: 0 30px;
  position: fixed;
  bottom: 0;
  right: 0;
  background: linear-gradient(90deg, #5368ea, $main-color);
  width: 100%;
  z-index: 90;
  border-radius: 15px 15px 0 0;

  &__items {
    list-style: none;
    padding: 2px 0;
    margin: 0;
    display: grid;
    place-items: center;
    grid-template-columns: repeat(4, 1fr);
  }

  &__item {
    cursor: pointer;
    height: 70px;
    padding: 11px 0;
    @include flex(space-between);
    flex-direction: column;
    margin: 0 5px;

    * {
      pointer-events: none;
    }

    &__label {
      text-transform: uppercase;
      color: $inactive-color;
      font-size: 0.75rem;
    }
  }

  &__icon path {
    fill: $inactive-color;
    transition: fill 0.5s ease-in-out;
  }

  .router-link-exact-active .tab__icon path {
    fill: #fff;
  }
  .router-link-exact-active .tab__item__label {
    color: #fff;
  }
}

@media all and (min-width: 700px) {
  .tab {
    position: absolute;
    top: 20px;
    right: 0;
    width: auto;
    padding: 0;
    background: transparent;
    height: 40px;

    &__icon {
      display: none;
    }

    &__item {
      position: relative;
      height: auto;

      &__label {
        font-weight: 600;
        font-size: 1rem;
        color: #000;
        margin: 0 10px;
      }

      &__login {
        background: linear-gradient(90deg, #5368ea, $main-color);
        padding: 9px 17px;

        .tab__item__label {
          color: #fff;
        }

        &::before {
          @include pseudo;
          box-shadow: 0 4px 7px 0 rgba($main-color, 0.65);
          opacity: 1;
          transition: opacity 0.3s;
        }

        &:hover::before {
          opacity: 0;
          transition: opacity 0.3s;
        }

        &::after {
          display: none;
        }
      }

      &::after {
        @include pseudo;
        top: 90%;
        height: 10%;
        z-index: 2;
        background: $main-color;
        border-radius: 20px;
        transform: scaleX(0);
        transition: transform 0.3s;
      }

      &.router-link-exact-active {
        .tab__item__label {
          color: #000;
        }
        &.tab__item__login {
          transform: scaleX(0);
        }
        &::after {
          transform: scaleX(1);
          transition: transform 0.3s;
        }
      }
      &:hover::after {
        transform: scaleX(1);
        transition: transform 0.3s;
      }
    }
  }
}
</style>
