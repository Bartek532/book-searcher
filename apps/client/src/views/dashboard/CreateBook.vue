<template>
  <main>
    <form class="form" @submit.prevent="createBook">
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

      <Image @image-uploaded="book.set('image', $event)" />

      <Select
        v-model="room"
        :values="rooms"
        name="rooms"
        label="pokój"
        :error="errors?.room"
      />

      <Select
        v-model="place"
        :values="places[room]"
        name="places"
        label="miejsce"
        :error="errors?.place"
      />

      <Rate v-model="rate" />
      <Tags v-model="tags" />

      <textarea v-model="description"></textarea>

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
    const { handleSubmit, errors } = useForm();

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

<style></style>
