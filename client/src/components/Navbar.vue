<template>
  <nav class="tab">
    <ul
      class="tab__items"
      @touchstart="tilt"
      @mousedown="tilt"
      @mouseup="activateRoute"
      @touchend="activateRoute"
    >
      <router-link to="/">
        <li class="tab__item">
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="tab__icon"
          >
            <path
              d="M9.99998 19V14H14V19C14 19.55 14.45 20 15 20H18C18.55 20 19 19.55 19 19V12H20.7C21.16 12 21.38 11.43 21.03 11.13L12.67 3.59997C12.29 3.25997 11.71 3.25997 11.33 3.59997L2.96998 11.13C2.62998 11.43 2.83998 12 3.29998 12H4.99998V19C4.99998 19.55 5.44998 20 5.99998 20H8.99998C9.54998 20 9.99998 19.55 9.99998 19Z"
              fill="#9c9bf0"
            />
          </svg>
          <div class="tab__item__label">Start</div>
        </li>
      </router-link>
      <router-link to="/rooms">
        <li class="tab__item">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="tab__icon"
          >
            <path
              d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C11.337 11.5 10.7011 11.2366 10.2322 10.7678C9.76339 10.2989 9.5 9.66304 9.5 9C9.5 8.33696 9.76339 7.70107 10.2322 7.23223C10.7011 6.76339 11.337 6.5 12 6.5C12.663 6.5 13.2989 6.76339 13.7678 7.23223C14.2366 7.70107 14.5 8.33696 14.5 9C14.5 9.66304 14.2366 10.2989 13.7678 10.7678C13.2989 11.2366 12.663 11.5 12 11.5V11.5Z"
              fill="#9c9bf0"
            />
          </svg>
          <div class="tab__item__label">Lokalizacja</div>
        </li>
      </router-link>
      <router-link to="/search">
        <li class="tab__item">
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
          <div class="tab__item__label">Szukaj</div>
        </li>
      </router-link>
      <router-link to="/auth/login">
        <li class="tab__item tab__item__login">
          <svg
            width="28"
            height="28"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="tab__icon"
          >
            <path
              d="M21.125 24.375H11.375C10.944 24.375 10.5307 24.2038 10.226 23.899C9.92121 23.5943 9.75 23.181 9.75 22.75V20.3125H11.375V22.75H21.125V3.25H11.375V5.6875H9.75V3.25C9.75 2.81902 9.92121 2.4057 10.226 2.10095C10.5307 1.7962 10.944 1.625 11.375 1.625H21.125C21.556 1.625 21.9693 1.7962 22.274 2.10095C22.5788 2.4057 22.75 2.81902 22.75 3.25V22.75C22.75 23.181 22.5788 23.5943 22.274 23.899C21.9693 24.2038 21.556 24.375 21.125 24.375Z"
              fill="#9c9bf0"
            />
            <path
              d="M11.8544 16.7294L14.7631 13.8125H3.25V12.1875H14.7631L11.8544 9.27062L13 8.125L17.875 13L13 17.875L11.8544 16.7294Z"
              fill="#9c9bf0"
            />
          </svg>
          <div class="tab__item__label">Zaloguj się</div>
        </li>
      </router-link>
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

    function tilt(e: HTMLElementEvent) {
      if (e.target.classList.contains("tab__item")) {
        gsap.to(e.target, {
          scale: 0.7,
          rotate: "10deg",
          ease: Power4.easeOut,
          duration: 0.4
        });
      }
    }

    function activateRoute(e: HTMLElementEvent) {
      const items = document.querySelectorAll(".tab__item");

      if (e.target.classList.contains("tab__item")) {
        items.forEach(item => item.classList.remove("tab__item--active"));
        e.target.classList.add("tab__item--active");

        gsap.to(e.target, {
          scale: 1,
          rotate: 0,
          ease: Back.easeOut.config(5)
        });
      }
    }
    return {
      activeRoute,
      activateRoute,
      tilt
    };
  }
});
</script>

<style lang="scss" scoped>
.tab {
  padding: 0 30px;
  position: fixed;
  bottom: 0;
  right: 0;
  background: linear-gradient(90deg, #5368ea, $main-color);
  width: 100vw;
  z-index: 90;
  border-radius: 5px 5px 0 0;

  &__items {
    list-style: none;
    padding: 0;
    display: grid;
    align-items: center;
    justify-items: center;
    grid-template-columns: repeat(4, 1fr);
  }

  &__item {
    cursor: pointer;
    max-height: 100%;
    @include flex(space-between);
    flex-direction: column;

    * {
      pointer-events: none;
    }

    &__label {
      display: none;
    }
  }

  &__icon path {
    fill: $inactive-color;
    transition: fill 0.5s ease-in-out;
  }

  .router-link-exact-active svg path {
    fill: #fff;
  }
}

@media all and (min-width: 700px) {
  .tab {
    position: absolute;
    top: 0;
    right: 0;
    width: auto;
    margin: 18px 40px 0 0;
    padding: 0;
    background: transparent;
    height: 38px;
    &__icon {
      display: none;
    }

    &__item {
      position: relative;
      &__login {
        background: linear-gradient(90deg, #5368ea, $main-color);
        box-shadow: 0 4px 7px 0 rgba($main-color, 0.65);
        color: #fff;
        padding: 9px 17px;
        transition: 0.3s;

        &:hover {
          box-shadow: none;
          transform: translateY(3px);
          transition: 0.3s;
        }
      }
      &__label {
        display: block;
        font-weight: 600;
        text-transform: uppercase;
        margin: 0 10px;
      }

      &::after {
        content: "";
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 13%;
        z-index: 2;
        background: $main-color;
        border-radius: 20px;
        transform: scaleX(0);
        transition: transform 0.3s;
      }

      &:hover::after,
      &--active::after {
        transform: scaleX(1);
        transition: transform 0.3s;
      }

      &--active.tab__item__login::after,
      &__login:hover::after {
        transform: scaleX(0);
      }
    }
  }

  .router-link-active .tab__item::after {
    transform: scaleX(1);
    transition: transform 0.3s;
  }

  .router-link-active .tab__item__login::after {
    transform: scaleX(0);
  }
}
</style>
