<template>
  <article class="field">
    <div class="field__icon">
      <img :src="require(`../assets/svgs/rooms/${label}.svg`)" :alt="label" />
    </div>
    <div class="field__label">{{ polishTranslate[label] }}</div>
  </article>
</template>

<script lang="ts">
import { polishTranslate } from "../data";
import { defineComponent } from "vue";
export default defineComponent({
  name: "Field",
  props: {
    label: {
      type: String,
      required: true
    }
  },
  setup() {
    return { polishTranslate };
  }
});
</script>

<style lang="scss" scoped>
.field {
  width: 40vw;
  max-width: 200px;
  min-height: 120px;
  height: 58vw;
  max-height: 250px;
  padding: 35px 10px;
  margin: 10px;
  border-radius: 10px;
  @include flex(space-between);
  flex-flow: column wrap;
  background-color: #fff;
  border: 2px solid rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s;
  position: relative;

  &::after {
    border-radius: 10px;
    @include pseudo;
    box-shadow: $box-shadow;
    opacity: 0;
  }

  &:hover {
    transform: translateY(-25px) rotate(7deg);
    transform-origin: "100% 100%";
    transition: all 0.3s;

    &::after {
      opacity: 1;
      transition: opacity 0.3s;
    }
  }
  &__icon {
    max-width: 150px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &__label {
    font-weight: 500;
    text-transform: capitalize;
    text-align: center;
    font-size: 0.9rem;

    @media all and (min-width: 450px) {
      font-size: 1.15rem;
    }
  }
}

@media all and (min-width: 1000px) {
  .field {
    margin: 20px;
  }
}

@media all and (max-width: 360px) {
  .field {
    padding: 30px 10px;
    &__icon {
      transform: scale(0.85);
    }
  }
}
</style>
