<template>
  <main class="container">
    <h1 class="container__title">Znajdź książkę</h1>
    <form @submit.prevent="handleSearch" class="form">
      <div class="form__inputs">
        <div>
          <Input
            v-model="title"
            placeholder="Tytuł"
            :validate="false"
            name="title"
          />
          <Input
            v-model="author"
            placeholder="Autor"
            :validate="false"
            name="author"
          />
        </div>
        <Tags v-model="tags" class="tags" />
      </div>
      <Button text="Szukaj" />
    </form>
  </main>
</template>

<script lang="ts">
import Input from "../components/form/Input.vue";
import Tags from "../components/Tags.vue";
import Button from "../components/buttons/Button.vue";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import { useField, useForm } from "vee-validate";
import { buildAdvancedQuery } from "../utils/functions";
export default defineComponent({
  name: "Search",
  components: {
    Input,
    Tags,
    Button,
  },
  setup() {
    const router = useRouter();
    const { handleSubmit } = useForm();

    const { value: title } = useField("title");
    const { value: author } = useField("author");
    const { value: tags } = useField("tags");

    const handleSearch = handleSubmit((data) => {
      router.push(
        `/ksiazki?${buildAdvancedQuery(data.tags, data.author, data.title)}`,
      );
    });

    return {
      title,
      author,
      tags,
      handleSearch,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  @include flex;
  flex-flow: column wrap;
  background: var(--white-100);
  align-self: flex-start;
  width: 84vw;
  padding-bottom: 30px;
  &__title {
    border-bottom: 4px solid var(--blue-100);
    padding-bottom: 5px;
    margin-top: 40px;
    font-size: 1.6rem;
  }
  .form {
    width: 100%;
    @include flex;
    flex-flow: column wrap;

    .tags {
      margin-top: 30px;
    }

    &__inputs {
      @include flex;
      flex-flow: column wrap;
      width: 100%;
    }
  }
}

@media all and (min-width: 850px) {
  .container {
    margin-bottom: 0;
    padding-top: 20px;
    align-items: center;

    .form {
      box-shadow: var(--primary-shadow);
      border-radius: 10px;
      padding: 20px 20px 35px 35px;
      margin-top: 10px;

      &__inputs {
        @include flex(space-between);
        flex-flow: row nowrap;
        width: 100%;

        .input {
          max-width: 290px;
        }
      }
    }
  }
}

@media all and (min-width: 1000px) {
  .container .form {
    max-width: 780px;
  }
}
</style>
