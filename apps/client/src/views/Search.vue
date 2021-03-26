<template>
  <main class="container">
    <h2>Znajdź książkę</h2>
    <form @submit.prevent="onSubmit" class="form">
      <div class="form__inputs">
        <Input
          name="Tytuł"
          placeholder="Niewinny"
          :validate="false"
          v-model="title"
        />
        <Input
          name="Autor"
          placeholder="Lee Child"
          :validate="false"
          v-model="author"
        />
        <Tags @tags-selected="tags = $event" :validate="false" />
      </div>
      <Button text="Szukaj" />
    </form>
  </main>
</template>

<script lang="ts">
import Input from "../components/inputs/Input.vue";
import Tags from "../components/Tags.vue";
import Button from "../components/inputs/Button.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, defineComponent, Ref } from "vue";
export default defineComponent({
  components: {
    Input,
    Tags,
    Button,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const title = ref("");
    const author = ref("");
    const tags: Ref<string[]> = ref([]);

    const query = new FormData();

    function onSubmit() {
      router.push({ path: "/results" });
      store.dispatch("advancedSearch", {
        name: title.value,
        author: author.value,
        tags: tags.value,
      });
    }

    return { onSubmit, query, title, author, tags };
  },
});
</script>

<style lang="scss" scoped>
.container {
  @include flex(center, flex-start);
  flex-flow: column wrap;
  background: #fff;
  width: 100%;
  .form {
    width: 100%;
    @include flex;
    flex-flow: column wrap;

    &__inputs {
      @include flex;
      flex-flow: column wrap;
      width: 100%;
    }
  }
}

@media all and (min-width: 720px) {
  .container {
    margin-bottom: 0;
    padding-top: 100px;
    align-items: center;

    .form {
      max-width: 700px;
      box-shadow: $box-shadow;
      border-radius: 10px;

      &__search {
        @include flex(space-between);
        flex-flow: row nowrap;
        width: 100%;

        &__inputs {
          width: 46%;
        }

        .tags {
          max-width: 50%;
        }
      }
    }
  }
}

@media all and (min-width: 1000px) {
  .container .form {
    max-width: 800px;
  }
}
</style>
