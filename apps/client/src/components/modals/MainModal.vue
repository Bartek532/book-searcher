<template>
  <div class="modal" v-if="$store.state.modal.show">
    <div class="modal__window">
      <div class="modal__icon">
        <img
          :src="
            require(`../../assets/svgs/modal/${$store.state.modal.type}.svg`)
          "
          :alt="$store.state.modal.type"
        />
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
  },
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
    background-color: var(--white-100);
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
      border: 1px solid var(--blue-100);
      color: var(--blue-100);
      background-color: var(--white-100);
    }

    &__ok {
      background-color: var(--blue-100);
      color: var(--white-100);
      border: 1px solid var(--blue-100);
      transition: 0.3s;

      &:hover {
        background-color: var(--white-100);
        transition: 0.3s;
        color: var(--blue-100);
      }
    }
  }
}
</style>
