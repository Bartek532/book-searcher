<template>
  <div class="tags">
    <div class="tags__icon" @click="tagsShown = !tagsShown">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        :class="{ tagsShown }"
      >
        <path
          d="M5.536 21.886C5.69777 21.9702 5.87939 22.0087 6.06138 21.9974C6.24337 21.9861 6.41886 21.9255 6.569 21.822L19.569 12.822C19.7018 12.73 19.8104 12.6071 19.8854 12.464C19.9603 12.3208 19.9995 12.1616 19.9995 12C19.9995 11.8384 19.9603 11.6792 19.8854 11.5361C19.8104 11.3929 19.7018 11.2701 19.569 11.178L6.569 2.17803C6.41897 2.07422 6.24341 2.01343 6.06131 2.00225C5.87922 1.99106 5.69753 2.0299 5.53593 2.11457C5.37433 2.19923 5.23896 2.32649 5.1445 2.48257C5.05003 2.63865 5.00006 2.81759 5 3.00003V21C4.99997 21.1826 5.0499 21.3616 5.14439 21.5178C5.23887 21.674 5.3743 21.8013 5.536 21.886Z"
          fill="#2524e9"
        />
      </svg>
      <span class="tag__icon__label">Tagi</span>
    </div>

    <div class="tags__checkboxes" v-if="tagsShown">
      <CheckboxInput
        :text="tag"
        v-for="tag in defaultTags"
        :key="tag"
        :value="tag"
        @select-tag="updateTags"
      />
    </div>
    <div v-if="error && validate" class="error tags__error">
      Wybierz conajmniej jeden tag.
    </div>
  </div>
</template>

<script lang="ts">
import CheckboxInput from "./inputs/Checkbox.vue";
import { tags as defaultTags } from "../data";
import { defineComponent, ref, Ref } from "vue";
export default defineComponent({
  name: "Tags",
  props: {
    validate: {
      type: Boolean,
      default: true
    }
  },
  components: {
    CheckboxInput
  },
  setup(prp, ctx) {
    const tagsShown = ref(false);
    const error = ref(true);
    const tags: Ref<string[]> = ref([]);
    function updateTags(isChecked: boolean, value: string) {
      if (isChecked) {
        tags.value.push(value);
      } else {
        tags.value = tags.value.filter(i => i !== value);
      }

      error.value = tags.value.length > 0 ? false : true;
      ctx.emit("tags-selected", tags.value);
    }

    if (window.innerWidth >= 720) {
      tagsShown.value = true;
    }
    return { defaultTags, updateTags, tags, tagsShown, error };
  }
});
</script>

<style lang="scss" scoped>
.tags {
  justify-self: flex-start;
  margin-bottom: 14px;

  &__icon {
    margin: 35px 0 15px 0;
    width: 100%;
    @include flex(flex-start);
    cursor: pointer;

    &__label {
      font-weight: bold;
      font-size: 0.84rem;
      text-transform: capitalize;
    }

    svg {
      margin-right: 10px;
      transition: 0.3s;

      &.tagsShown {
        transform: rotate(90deg);
        transition: 0.2s;
      }
    }
  }

  &__error {
    padding-left: 6px;
    width: 100%;
  }
}

@media all and (min-width: 720px) {
  .tags__icon {
    display: none;
  }
}
</style>
