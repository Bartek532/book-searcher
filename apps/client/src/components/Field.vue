<template>
  <router-link :to="path">
    <article class="field">
      <div class="field__icon">
        <img
          :src="require(`../assets/svgs/rooms/${img}.svg`)"
          :alt="label"
          loading="lazy"
          width="150"
          height="120"
        />
      </div>
      <span class="field__label">{{ label }}</span>
    </article>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Field",
  props: {
    label: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.field {
  width: 40vw;
  max-width: 200px;
  height: clamp(120px, 58vw, 250px);
  padding: 35px 10px;
  margin: 10px;
  border-radius: 10px;
  @include flex(space-between);
  flex-flow: column wrap;
  background-color: var(--white-100);
  border: 2px solid rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: transform 0.3s;
  position: relative;

  &::after {
    border-radius: 10px;
    @include pseudo;
    box-shadow: var(--primary-shadow);
    transition: opacity 0.3s;
    opacity: 0;
  }

  &:hover {
    transform: translateY(-25px) rotate(7deg);
    transform-origin: "100% 100%";

    &::after {
      opacity: 1;
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
    border: 0 none;
    background-color: transparent;

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
