<template>
  <div class="dashboard">
    <div class="options">
      <button
        @click="$router.push({ path: '/dashboard/add-book' })"
        class="option"
      >
        <div class="option__icon">
          <svg
            width="42"
            height="42"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 2C12.3008 2.04463 8.76575 3.53395 6.14985 6.14985C3.53395 8.76575 2.04463 12.3008 2 16C2.04463 19.6992 3.53395 23.2343 6.14985 25.8501C8.76575 28.466 12.3008 29.9554 16 30C19.6992 29.9554 23.2343 28.466 25.8501 25.8501C28.466 23.2343 29.9554 19.6992 30 16C29.9554 12.3008 28.466 8.76575 25.8501 6.14985C23.2343 3.53395 19.6992 2.04463 16 2V2ZM24 17H17V24H15V17H8V15H15V8H17V15H24V17Z"
              fill="#fff"
            />
          </svg>
        </div>
        <div class="option__label">Dodaj książkę</div>
      </button>
      <button
        @click="$router.push({ path: '/dashboard/library' })"
        class="option"
      >
        <div class="option__icon">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.75 2.99982H5.25C4.95256 2.97146 4.65576 3.05998 4.42245 3.24663C4.18913 3.43328 4.03762 3.70341 4 3.99982V32.9998H14V3.99982C13.9624 3.70341 13.8109 3.43328 13.5776 3.24663C13.3442 3.05998 13.0474 2.97146 12.75 2.99982V2.99982Z"
              fill="#fff"
            />
            <path
              d="M33.77 31.09L26.83 12.79C26.7834 12.6672 26.7131 12.5548 26.623 12.4592C26.5329 12.3636 26.4249 12.2866 26.3051 12.2328C26.1854 12.1789 26.0561 12.1492 25.9248 12.1453C25.7936 12.1414 25.6628 12.1634 25.54 12.21L22 13.59V9C22 8.73478 21.8946 8.48043 21.7071 8.29289C21.5196 8.10536 21.2652 8 21 8H16V33H22V14.69L28.93 33L33.77 31.09Z"
              fill="#fff"
            />
          </svg>
        </div>
        <div class="option__label">Moje książki</div>
      </button>
      <button
        @click="$router.push({ path: '/dashboard/move-book' })"
        class="option"
      >
        <div class="option__icon">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 11H13V6H16L12 2L8 6H11V11H6V8L2 12L6 16V13H11V18H8L12 22L16 18H13V13H18V16L22 12L18 8V11Z"
              fill="#fff"
            />
          </svg>
        </div>
        <div class="option__label">Zmień miejsce</div>
      </button>
      <button
        @click="$router.push({ path: '/dashboard/delete-book' })"
        class="option"
      >
        <div class="option__icon">
          <svg
            width="39"
            height="39"
            viewBox="0 0 39 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.875 6.5H25.1875L23.5625 4.875H15.4375L13.8125 6.5H8.125V9.75H30.875V6.5ZM9.75 30.875C9.75 31.737 10.0924 32.5636 10.7019 33.1731C11.3114 33.7826 12.138 34.125 13 34.125H26C26.862 34.125 27.6886 33.7826 28.2981 33.1731C28.9076 32.5636 29.25 31.737 29.25 30.875V11.375H9.75V30.875Z"
              fill="#fff"
            />
          </svg>
        </div>
        <div class="option__label">Usuń książkę</div>
      </button>
      <button
        @click="$router.push({ path: '/dashboard/account' })"
        class="option"
      >
        <div class="option__icon">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.0002 5.3335C17.4147 5.3335 18.7712 5.8954 19.7714 6.89559C20.7716 7.89579 21.3335 9.25234 21.3335 10.6668C21.3335 12.0813 20.7716 13.4379 19.7714 14.4381C18.7712 15.4383 17.4147 16.0002 16.0002 16.0002C14.5857 16.0002 13.2291 15.4383 12.2289 14.4381C11.2287 13.4379 10.6668 12.0813 10.6668 10.6668C10.6668 9.25234 11.2287 7.89579 12.2289 6.89559C13.2291 5.8954 14.5857 5.3335 16.0002 5.3335V5.3335ZM16.0002 18.6668C21.8935 18.6668 26.6668 21.0535 26.6668 24.0002V26.6668H5.3335V24.0002C5.3335 21.0535 10.1068 18.6668 16.0002 18.6668Z"
              fill="#fff"
            />
          </svg>
        </div>
        <div class="option__label">Moje konto</div>
      </button>
      <button @click="logout" class="option">
        <div class="option__icon">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 17V14H9V10H16V7L21 12L16 17ZM14 2C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6H14V4H5V20H14V18H16V20C16 20.5304 15.7893 21.0391 15.4142 21.4142C15.0391 21.7893 14.5304 22 14 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V4C3 3.46957 3.21071 2.96086 3.58579 2.58579C3.96086 2.21071 4.46957 2 5 2H14Z"
              fill="white"
            />
          </svg>
        </div>
        <div class="option__label">Wyloguj się</div>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    function logout() {
      store.dispatch("logout");
      router.push({ path: "/auth/login" });
    }

    return { logout };
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  min-height: 100vh;
  @include flex;
  padding: 50px 0;

  .options {
    @include flex;
    flex-wrap: wrap;
    margin-bottom: 40px;

    .option {
      @include flex(space-between);
      flex: 0 1 270px;
      border: 0 none;
      padding: 20px 30px;
      border-radius: 10px;
      position: relative;
      width: 270px;
      margin: 7px;
      transition: 0.3s;
      height: 85px;
      cursor: pointer;

      &::after {
        border-radius: 10px;
        @include pseudo;
        opacity: 1;
        transition: opacity 0.3s;
        box-shadow: $box-shadow;
      }

      &:focus,
      &:hover {
        transition: transform 0.3s;
        transform: translateY(1px);

        &::after {
          opacity: 0;
          transition: opacity 0.3s;
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
        color: #fff;
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
    padding: 0 250px;
  }
}
</style>
