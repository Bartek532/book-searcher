<template>
  <div class="file">
    <label for="file" class="file__label">
      <input
        type="file"
        name="file"
        id="file"
        @change="uploadFile"
        class="file__label__input"
      /><br />
      <img v-if="image" :src="image" alt="image" class="file__label__preview" />
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
    <div v-if="error" class="error file__error">{{ error }}</div>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from "vue";
import { HTMLInputEvent } from "../../types";
export default defineComponent({
  name: "File",
  setup(prp, ctx) {
    const image = ref("");
    const error = ref("");
    const imageTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    function uploadFile(e: HTMLInputEvent) {
      const file = e.target.files ? e.target.files[0] : "";
      if (!file) {
        error.value = "Dodaj obraz.";
        image.value = "";
      } else {
        if (!imageTypes.includes((file as File).type)) {
          error.value = "Nieodpowiedni plik.";
        } else {
          error.value = "";
          image.value = URL.createObjectURL(file);
        }
      }

      ctx.emit("file-uploaded", file);
    }

    return {
      uploadFile,
      image,
      error
    };
  }
});
</script>

<style lang="scss" scoped>
.file {
  width: 100%;
  margin-top: 15px;
  @include flex(center, flex-start);
  flex-flow: column wrap;

  &__label {
    display: inline-block;
    width: 34vw;
    max-width: 126px;
    height: 180px;
    border-radius: 10px;
    border: 1.5px solid lightgray;
    position: relative;
    &__input {
      display: none;
    }

    &__icon {
      @include flex;
      flex-flow: column wrap;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: gray;
      font-size: 0.84rem;
      margin-bottom: 7px;
      text-align: center;

      &__icon {
        margin-top: 8px;
      }
    }

    &__preview {
      width: 34vw;
      max-width: 126px;
      height: 182px;
      position: absolute;
      top: -1.9px;
      left: -1.5px;
      z-index: 10;
      border-radius: 10px;
    }
  }
}

@media all and (min-width: 720px) {
  .file {
    margin-right: 40px;
  }
}
</style>
