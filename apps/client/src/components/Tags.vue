<template>
  <article class="tags">
    <button
      class="tags__summary"
      @click="tagsOpen = !tagsOpen"
      type="button"
      v-if="!isTagsShow"
    >
      <div :class="['tags__icon', { 'tags__icon--active': tagsOpen }]">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.536 21.886C5.69777 21.9702 5.87939 22.0087 6.06138 21.9974C6.24337 21.9861 6.41886 21.9255 6.569 21.822L19.569 12.822C19.7018 12.73 19.8104 12.6071 19.8854 12.464C19.9603 12.3208 19.9995 12.1616 19.9995 12C19.9995 11.8384 19.9603 11.6792 19.8854 11.5361C19.8104 11.3929 19.7018 11.2701 19.569 11.178L6.569 2.17803C6.41897 2.07422 6.24341 2.01343 6.06131 2.00225C5.87922 1.99106 5.69753 2.0299 5.53593 2.11457C5.37433 2.19923 5.23896 2.32649 5.1445 2.48257C5.05003 2.63865 5.00006 2.81759 5 3.00003V21C4.99997 21.1826 5.0499 21.3616 5.14439 21.5178C5.23887 21.674 5.3743 21.8013 5.536 21.886Z"
            fill="#2524e9"
          />
        </svg>
      </div>
      <span class="tags__label">Tagi</span>
    </button>
    <div class="tags__checkboxes" v-if="tagsOpen || isTagsShow">
      <CheckboxInput
        :text="tag"
        v-for="tag in tags"
        :key="tag"
        :value="tag"
        v-model="checkedTags"
        @change="$emit('update:modelValue', checkedTags)"
      />
    </div>
  </article>
</template>

<script lang="ts">
import CheckboxInput from "./form/Checkbox.vue";
import { tags } from "../data";
import { defineComponent, ref, onUnmounted } from "vue";
export default defineComponent({
  name: "Tags",
  components: {
    CheckboxInput,
  },
  props: {
    modelValue: {
      type: Object as () => string[],
    },
  },
  setup() {
    const checkedTags = ref([]);
    const tagsOpen = ref(false);
    const isTagsShow = ref(window.innerWidth > 700);

    const handleShowTags = () => {
      isTagsShow.value = window.innerWidth > 700;
    };

    window.addEventListener("resize", handleShowTags);

    onUnmounted(() => {
      window.removeEventListener("resize", handleShowTags);
    });

    return { checkedTags, tags, tagsOpen, isTagsShow };
  },
});
</script>

<style lang="scss" scoped>
.tags {
  margin-bottom: 14px;
  width: 80vw;
  max-width: 310px;

  &__summary {
    list-style-type: none;
    @include flex(flex-start);
    border: 0 none;
    background-color: transparent;
    font-size: 1rem;
    margin-bottom: 7px;
    cursor: pointer;
    padding: 0;
  }

  &__icon--active svg {
    transform: rotate(90deg);
    transition: transform 0.3s;
  }

  &__icon svg {
    transform-origin: center center;
    margin-right: 10px;
    transition: transform 0.3s;
  }

  &__label {
    font-weight: 600;
    text-transform: capitalize;
  }
  &__error {
    padding-left: 6px;
    width: 100%;
  }
}

@media all and (min-width: 850px) {
  .tags {
    max-width: 400px;
  }
}
</style>
