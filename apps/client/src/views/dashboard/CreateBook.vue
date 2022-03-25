<template>
  <main class="add-book">
    <Modal @modal-accepted="$router.go(-1)" />
    <h1 class="title">Dodaj książkę</h1>
    <form class="form" @submit.prevent="handleCreateBook">
      <div class="form__text-inputs">
        <Input
          placeholder="Tytuł"
          v-model="name"
          :error="errors?.name"
          name="title"
        />
        <Input
          placeholder="Autor"
          v-model="author"
          :error="errors?.author"
          name="author"
        />

        <Input
          placeholder="Cykl"
          v-model="series"
          :error="errors?.series"
          name="series"
          v-if="tags?.includes('series')"
        />
      </div>

      <div class="form__select-file-inputs">
        <Image @image-uploaded="book.set('img', $event)" />

        <div class="selects">
          <div class="select">
            <span class="select__label">Pokój</span>

            <Select
              v-model="room"
              :values="rooms"
              name="rooms"
              label="pokój"
              :error="errors?.room"
            />
          </div>

          <div class="select">
            <span class="select__label">Miejsce</span>
            <Select
              v-model="place"
              :values="places[room] || []"
              name="places"
              label="miejsce"
              :error="errors?.place"
            />
          </div>
        </div>
      </div>

      <Tags v-model="tags" />

      <div class="form__rest">
        <div class="rate">
          <span class="rate__label">Ocena</span>
          <Rate v-model="rate" />
        </div>
        <label class="textarea">
          <span class="textarea__label">Opis</span>
          <textarea
            v-model="description"
            rows="10"
            :style="{
              borderColor: errors.description ? 'var(--red-100)' : '#000',
            }"
          ></textarea>
          <span class="textarea__error" v-if="errors?.description">{{
            errors.description
          }}</span>
        </label>
      </div>

      <Button text="Dodaj" class="form__submit-btn" />
    </form>
  </main>
</template>

<script lang="ts">
import Modal from "../../components/Modal.vue";
import Input from "../../components/form/Input.vue";
import Button from "../../components/buttons/Button.vue";
import Rate from "../../components/form/Rate.vue";
import Image from "../../components/form/Image.vue";
import Select from "../../components/form/Select.vue";
import Tags from "../../components/Tags.vue";
import { rooms, places } from "@book-searcher/data";
import { bookSchema } from "../../utils/validationSchemas";
import { defineComponent, watch } from "vue";
import { useForm, useField } from "vee-validate";
import { useBook } from "../../utils/composable/useBook";
export default defineComponent({
  components: {
    Modal,
    Input,
    Button,
    Rate,
    Tags,
    Image,
    Select,
  },
  setup() {
    const { handleSubmit, errors } = useForm({
      validationSchema: bookSchema,
    });
    const { createBook } = useBook();

    const book = new FormData();

    const handleCreateBook = handleSubmit((data) => {
      if (!book.get("img")) {
        return;
      }

      Object.entries(data).forEach((item) =>
        book.set(
          item[0],
          typeof item[1] === "string" ? item[1] : JSON.stringify(item[1]),
        ),
      );

      if (book.get("rate") === "undefined") {
        book.set("rate", "3");
      }

      if (!(tags.value as string[])?.includes("series")) {
        book.set("series", "");
      }

      return createBook(book);
    });

    const { value: name } = useField("name");
    const { value: author } = useField("author");
    const { value: rate } = useField("rate");
    const { value: tags } = useField("tags");
    const { value: description } = useField("description");
    const { value: series } = useField("series");
    const { value: room } = useField("room");
    const { value: place, resetField: resetPlace } = useField("place");

    watch(room, () => resetPlace());

    return {
      name,
      author,
      rate,
      tags,
      description,
      series,
      rooms,
      room,
      place,
      places,
      errors,
      handleCreateBook,
      book,
    };
  },
});
</script>

<style lang="scss" scoped>
.add-book {
  width: 100%;
  padding: 20px;
  align-self: flex-start;
  @include flex;
  flex-flow: column wrap;
  .title {
    border-bottom: 4px solid var(--blue-100);
    padding-bottom: 5px;
    margin: 15px 0;
  }
}
.form {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;

  &__select-file-inputs {
    @include flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 30px 0;
    max-width: 330px;

    .selects {
      flex: 0 1 170px;
      @include flex;
      flex-flow: column wrap;
      margin: 25px 0;

      .select {
        @include flex;
        flex-flow: column wrap;
        margin: 6px 0;

        &__label {
          font-weight: 600;
          text-transform: capitalize;
          font-size: 0.87rem;
          margin-bottom: 3px;
        }
      }
    }

    .file {
      flex: 0 1 130px;
    }
  }

  .tags {
    justify-self: start;
  }

  &__rest {
    @include flex;
    flex-flow: column wrap;
    width: 100%;
    max-width: 330px;

    .rate {
      @include flex(space-between);
      width: 100%;
      margin: 10px 0;
      &__label {
        font-weight: 600;
        text-transform: capitalize;
        font-size: 0.87rem;
        margin-bottom: 3px;
      }
    }

    .textarea {
      width: 100%;
      @include flex(center, flex-start);
      flex-flow: column wrap;
      margin-top: 15px;
      &__label {
        font-weight: 600;
        text-transform: capitalize;
        font-size: 0.87rem;
        margin-bottom: 6px;
      }

      textarea {
        width: 100%;
        padding: 9px 14px;
        resize: none;
        border: 1px solid #000;
      }

      &__error {
        color: var(--red-100);
        font-size: 0.8rem;
        padding: 5px;
        display: block;
      }
    }
  }
}

@media all and (min-width: 340px) {
  .form {
    &__select-file-inputs {
      @include flex(space-between);
      margin-bottom: 25px;
      .selects {
        @include flex(center, flex-start);
        .select {
          @include flex(center, flex-start);
          margin: 8px 0;
        }
      }
    }

    .tags {
      justify-self: center;
    }
  }
}

@media all and (min-width: 800px) {
  .add-book .title {
    margin-bottom: 25px;
  }
  .form {
    grid-template-columns: 1fr 1fr;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
    padding: 40px 50px 50px 50px;
    max-width: 900px;
    grid-gap: 30px 0;
    border-radius: 30px;

    .form__submit-btn {
      grid-column: 1 / span 2;
    }
  }
}
</style>
