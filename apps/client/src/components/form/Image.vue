<template>
  <div class="file">
    <label class="file__label" :style="{ borderWidth: image ? 0 : '1.5px' }">
      <input
        type="file"
        name="image"
        id="image"
        @change="handleUploadFile"
        class="file__label__input"
        accept="image/*"
      />
      <img v-if="image" :src="image" alt="" class="file__label__preview" />
      <div class="file__label__icon">
        <span class="file__label__icon__label">Dodaj zdjęcie</span>
        <svg
          width="35"
          height="35"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="file__label__icon__icon"
        >
          <path
            d="M16 4C22.6 4 28 9.4 28 16C28 22.6 22.6 28 16 28C9.4 28 4 22.6 4 16C4 9.4 9.4 4 16 4ZM16 2C8.3 2 2 8.3 2 16C2 23.7 8.3 30 16 30C23.7 30 30 23.7 30 16C30 8.3 23.7 2 16 2Z"
            fill="lightgray"
          />
          <path
            d="M24 15H17V8H15V15H8V17H15V24H17V17H24V15Z"
            fill="lightgray"
          />
        </svg>
      </div>
    </label>
    <span v-if="error" class="file__error">{{ error }}</span>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from "vue";
import { HTMLInputEvent } from "../../types";
export default defineComponent({
  name: "Image",
  setup(prp, ctx) {
    const image = ref("");
    const error = ref("Dodaj obraz.");
    const availableImageTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
    ];
    const handleUploadFile = (e: HTMLInputEvent) => {
      const file = e.target.files ? e.target.files[0] : "";
      if (!file) {
        error.value = "Dodaj obraz.";
        image.value = "";
      } else {
        if (!availableImageTypes.includes((file as File).type)) {
          error.value = "Nieodpowiedni plik.";
        } else {
          error.value = "";
          image.value = URL.createObjectURL(file);
        }
      }

      ctx.emit("image-uploaded", file);
    };

    return {
      handleUploadFile,
      image,
      error,
    };
  },
});
</script>

<style lang="scss" scoped>
.file {
  width: auto;
  height: 180px;

  &__label {
    @include flex;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: 1.5px solid var(--gray-100);
    position: relative;
    cursor: pointer;

    &:focus-within,
    &:focus-within .file__label__preview {
      border: 1px solid var(--blue-100);
    }

    &__input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    &__icon {
      @include flex;
      flex-flow: column wrap;
      font-size: 0.88rem;
      color: var(--gray-100);
      padding: 0 20px;
      text-align: center;

      &__icon {
        margin-top: 8px;
      }
    }

    &__preview {
      max-height: 100%;
      position: absolute;
      width: auto;
      border-radius: 10px;
      z-index: 100;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 135px;
    }
  }

  &__error {
    color: var(--red-100);
    font-size: 0.8rem;
    padding: 5px;
    display: block;
  }
}
</style>
