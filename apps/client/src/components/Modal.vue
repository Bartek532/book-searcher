<template>
  <div class="modal" v-if="modal.show">
    <div class="modal__window">
      <div class="modal__icon" :style="{ backgroundColor: bannerColor }">
        <img
          :src="require(`../assets/svgs/modal/${modal.type}.svg`)"
          :alt="modal.type"
        />
      </div>
      <span class="modal__label">{{ label }}!</span>
      <p class="modal__description">
        {{ modal.message }}
      </p>
      <div class="modal__buttons">
        <button
          class="modal__buttons__cancel"
          @click="handleCancelModal"
          v-if="modal.type !== 'success'"
        >
          Anuluj
        </button>
        <button
          class="modal__buttons__ok"
          @click="handleAcceptModal"
          v-if="['info', 'question', 'success'].includes(modal.type)"
        >
          Kontynuuj
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useModal } from "../utils/composable/useModal";
export default defineComponent({
  name: "Modal",
  setup(prp, ctx) {
    const { modal, hideModal } = useModal();

    const handleAcceptModal = () => {
      ctx.emit("modal-accepted");
      hideModal();
    };
    const handleCancelModal = () => {
      ctx.emit("modal-cancelled");
      hideModal();
    };

    const bannerInfo = [
      { type: "warning", label: "Błąd", color: "var(--red-100)" },
      { type: "success", label: "Sukces", color: "var(--green-100)" },
      { type: "question", label: "Pytanie", color: "var(--yellow-100)" },
      { type: "info", label: "Informacja", color: "var(--blue-300)" },
    ];

    const label = computed(() => {
      return (
        bannerInfo.find((item) => item.type === modal.type)?.label || "Błąd"
      );
    });

    const bannerColor = computed(() => {
      return (
        bannerInfo.find((item) => item.type === modal.type)?.color ||
        "var(--red-100)"
      );
    });

    return {
      handleAcceptModal,
      handleCancelModal,
      bannerColor,
      label,
      modal,
    };
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
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  @include flex;

  &__window {
    background-color: var(--white-100);
    border-radius: 20px;
    padding-bottom: 17px;
    @include flex;
    flex-flow: column wrap;
    width: 90vw;
    max-width: 500px;
  }

  &__icon {
    width: 100%;
    background-color: var(--red-100);
    @include flex;
    padding: 20px 0;
    border-radius: 20px 20px 0 0;
  }

  &__label {
    font-size: 1.85rem;
    font-weight: bold;
    margin: 20px 0;
  }

  &__description {
    font-weight: 500;
    padding: 0 20px;
    word-break: break-word;
    margin: 0;
    text-align: center;
    line-height: 1.3rem;
  }

  &__buttons {
    @include flex;
    margin-top: 30px;

    &__cancel,
    &__ok {
      padding: 6px 22px;
      border-radius: 3px;
      cursor: pointer;
      font-weight: bold;
      transition: color 0.2s, background-color 0.2s;
    }

    &__cancel {
      border: 2px solid var(--red-100);
      background-color: var(--red-100);
      color: var(--white-100);
      margin-left: 10px;

      &:hover {
        color: var(--red-100);
        background-color: var(--white-100);
      }
    }

    &__ok {
      border: 2px solid var(--green-100);
      background-color: var(--green-100);
      color: var(--white-100);

      &:hover {
        color: var(--green-100);
        background-color: var(--white-100);
      }
    }
  }
}

@media all and (min-width: 650px) {
  .modal__description {
    padding: 10px 25px;
  }

  .modal__label {
    margin-top: 30px;
  }
}
</style>
