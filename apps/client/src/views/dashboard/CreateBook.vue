<template>
  <main class="add-book">
    <h1 class="title">Dodaj książkę</h1>
    <form class="form" @submit.prevent="createBook">
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
        <Image @image-uploaded="book.set('image', $event)" />

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
              :values="places[room]"
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
          <textarea v-model="description" rows="10"></textarea>
        </label>
      </div>

      <Button text="Dodaj" />
    </form>
    <Modal
      @modal-accepted="$router.go(-1)"
      @modal-canceled="$store.state.modal.error ? '' : $router.go()"
    />
    <LoadingModal />
  </main>
</template>

<script lang="ts">
import Modal from "../../components/modals/MainModal.vue";
import LoadingModal from "../../components/modals/LoadingModal.vue";
import Input from "../../components/inputs/Input.vue";
import Button from "../../components/inputs/Button.vue";
import Rate from "../../components/inputs/Rate.vue";
import Image from "../../components/inputs/Image.vue";
import Select from "../../components/inputs/Select.vue";
import Tags from "../../components/Tags.vue";
import { rooms, places } from "@book-searcher/data";
import { bookSchema } from "../../utils/validationSchemas";
import { useStore } from "vuex";
import { ref, defineComponent, watch } from "vue";
import { useForm, useField } from "vee-validate";
export default defineComponent({
  components: {
    Modal,
    LoadingModal,
    Input,
    Button,
    Rate,
    Tags,
    Image,
    Select,
  },
  setup() {
    const { handleSubmit, errors } = useForm({ validationSchema: bookSchema });

    const book = new FormData();

    const createBook = handleSubmit((data) => {
      if (!book.get("image")) {
        return;
      }

      Object.entries(data).forEach((item) =>
        book.set(item[0], JSON.stringify(item[1])),
      );

      if (!(tags.value as string[])?.includes("series")) {
        book.set("series", "");
      }

      console.log(book.get("room"), book.get("place"));
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
      createBook,
      book,
    };
    /*
    const store = useStore();
    const loading = ref(false);

    async function createBook(data: FormData) {
      let formLength = 0;
      data.forEach(item => {
        if (item) {
          formLength++;
        }
      });

      const errors = document.querySelectorAll(".error");
      const tags = JSON.parse(data.get("tags") as string);
      if (tags && tags.includes("series")) {
        formLength--;
      }

      if (errors.length === 0 && formLength >= 8) {
        loading.value = true;
        await store.dispatch("createBook", data);
        loading.value = false;

        if (!store.state.error) {
          store.dispatch("setModal", {
            show: true,
            type: "success",
            message: "Książka została dodana!"
          });
        } else {
          store.dispatch("setModal", {
            show: true,
            type: "error",
            message: store.state.error
          });
        }
      } else {
        store.dispatch("setModal", {
          show: true,
          type: "error",
          message: "Wypełnij poprawnie formularz!"
        });
      }
    }

    return {
      createBook,
      loading
    };
    */
  },
});
</script>

<style lang="scss" scoped>
.add-book {
  width: 100%;
  padding: 32px;
  align-self: flex-start;
  @include flex;
  flex-flow: column wrap;
  .title {
    border-bottom: 3px solid var(--blue-100);
    padding-bottom: 5px;
    margin: 15px 0;
    font-size: 1.6rem;
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
    margin-top: 30px;

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

    .image {
      flex: 0 1 160px;
    }
  }

  .tags {
    justify-self: start;
  }

  &__rest {
    @include flex;
    flex-flow: column wrap;
    width: 100%;

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
      }
    }
  }
}

@media all and (min-width: 370px) {
  .form {
    &__select-file-inputs {
      @include flex(space-between);
      max-width: 100%;
      margin-bottom: 25px;
      .selects {
        @include flex(center, flex-start);
        .select {
          @include flex(center, flex-start);
          margin: 8px 0;
        }
      }
    }
  }
}
</style>
