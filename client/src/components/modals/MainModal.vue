<template>
  <div class="modal" v-if="$store.state.modal.show">
    <div class="modal__window">
      <div class="modal__icon">
        <svg
          v-if="$store.state.modal.error"
          width="70"
          height="70"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.9999 36.6668C10.7949 36.6668 3.33325 29.2052 3.33325 20.0002C3.33325 10.7952 10.7949 3.3335 19.9999 3.3335C29.2049 3.3335 36.6666 10.7952 36.6666 20.0002C36.6666 29.2052 29.2049 36.6668 19.9999 36.6668ZM18.3333 25.0002V28.3335H21.6666V25.0002H18.3333ZM18.3333 11.6668V21.6668H21.6666V11.6668H18.3333Z"
            fill="#E5383B"
          />
        </svg>
        <svg
          v-else
          width="60"
          height="60"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8V8ZM12.03 4.97C11.9586 4.89882 11.8735 4.84277 11.7799 4.80522C11.6863 4.76766 11.5861 4.74936 11.4853 4.75141C11.3845 4.75347 11.2851 4.77583 11.1932 4.81717C11.1012 4.85851 11.0185 4.91797 10.95 4.992L7.477 9.417L5.384 7.323C5.24182 7.19052 5.05378 7.1184 4.85948 7.12183C4.66518 7.12525 4.47979 7.20397 4.34238 7.34138C4.20497 7.47879 4.12625 7.66418 4.12283 7.85848C4.1194 8.05278 4.19152 8.24083 4.324 8.383L6.97 11.03C7.04128 11.1012 7.12616 11.1572 7.21958 11.1949C7.313 11.2325 7.41305 11.2509 7.51375 11.2491C7.61444 11.2472 7.71374 11.2251 7.8057 11.184C7.89766 11.1429 7.9804 11.0837 8.049 11.01L12.041 6.02C12.1771 5.8785 12.2523 5.68928 12.2504 5.49296C12.2485 5.29664 12.1698 5.10888 12.031 4.97H12.03Z"
            fill="#7FEF3E"
          />
        </svg>
      </div>

      <div class="modal__info">
        {{ $store.state.modal.message }}
      </div>
      <div class="modal__button">
        <button class="modal__button__cancel" @click="cancel">Anuluj</button>
        <button class="modal__button__ok" @click="accept">Kontynuuj</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "Modal",
  setup(prp, ctx) {
    const store = useStore();
    function accept() {
      ctx.emit("modal-accepted");
      store.dispatch("setModal", { show: false });
    }
    function cancel() {
      ctx.emit("modal-canceled");
      store.dispatch("setModal", { show: false });
    }

    return { accept, cancel };
  }
});
</script>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
  @include flex;

  &__icon {
    transform: translateY(-25px);
  }

  &__info {
    font-weight: 600;
    font-size: 1.05rem;
    text-align: center;
    transform: translateY(-10px);

    @media all and(min-width:1000px) {
      font-size: 1.2rem;
    }
  }

  &__window {
    @include flex;
    flex-flow: column wrap;
    width: 80vw;
    max-width: 470px;
    min-height: 300px;
    background-color: #fff;
    position: relative;
    border-radius: 10px;
    padding: 20px 37px;
  }

  &__button {
    position: absolute;
    right: 15px;
    bottom: 15px;

    &__cancel,
    &__ok {
      margin: 0 5px;
      padding: 8px 15px;
      border-radius: 5px;
      font-weight: 600;
      cursor: pointer;
    }

    &__cancel {
      border: 1px solid $main-color;
      color: $main-color;
      background-color: #fff;
    }

    &__ok {
      background-color: $main-color;
      color: #fff;
      border: 1px solid $main-color;
      transition: 0.3s;

      &:hover {
        background-color: #fff;
        transition: 0.3s;
        color: $main-color;
      }
    }
  }
}
</style>
