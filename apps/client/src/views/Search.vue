<template>
  <main class="container">
    <h2>Znajdź książkę</h2>
    <form @submit.prevent="onSubmit" class="form">
      <div class="form__inputs">
        <Input v-model="title" name="Tytuł" :validate="false" />
        <Input v-model="author" name="Autor" :validate="false" />
        <Tags v-model="tags" />
      </div>
      <Button text="Szukaj" />
      {{ tags }}
    </form>
  </main>
</template>

<script lang="ts">
import Input from "../components/inputs/Input.vue";
import Tags from "../components/Tags.vue";
import Button from "../components/inputs/Button.vue";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import { useField, useForm } from "vee-validate";
export default defineComponent({
  components: {
    Input,
    Tags,
    Button,
  },
  setup() {
    const { handleSubmit, values, errors } = useForm({
      initialValues: { title: "", author: "" },
    });

    const { value: title } = useField("title");
    const { value: author } = useField("author");
    const { value: tags } = useField("tags");

    const onSubmit = handleSubmit((data: any) => {
      console.log(data);
    });

    return {
      title,
      author,
      tags,
      onSubmit,
      errors,
      values,
    };
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
