<template>
  <div class="container">
    <form @submit.prevent="onSubmit" class="form">
      <h3>Dodaj książkę</h3>

      <div class="form__wrapper">
        <div class="form__wrapper__inputs">
          <Input name="Tytuł" v-model="title" />
          <Input name="Autor" v-model="author" />
          <Input name="Cykl" v-model="series" v-if="seriesShow" />
        </div>
        <div class="file-select">
          <Image @file-uploaded="book.set('file', $event)" />
          <div class="selects">
            <div class="select select__room">
              <span>Pokój</span>
              <Select name="rooms" :values="rooms" @change="roomSelected" />
            </div>
            <div class="select select__place">
              <span>Miejsce</span>
              <Select
                name="places"
                :values="selectedRoomPlaces"
                @change="book.set('place', $event.target.value)"
              />
            </div>
          </div>
        </div>
        <Tags @tags-selected="setTags" />

        <div class="form__wrapper__rest">
          <div class="rate">
            <span>Ocena</span>
            <Rate @rate-given="book.set('rate', $event)" />
          </div>

          <div class="description">
            <span>Opis</span>
            <textarea
              @input="setDescription()"
              v-model="description"
            ></textarea>
            <div v-if="descriptionError" class="error description__error">
              {{ descriptionError }}
            </div>
          </div>
        </div>
      </div>

      <Button text="Dodaj" />
    </form>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { rooms, places } from "../data";
import Input from "./inputs/Input.vue";
import Tags from "./Tags.vue";
import Select from "./inputs/Select.vue";
import Rate from "./inputs/Rate.vue";
import Image from "./inputs/Image.vue";
import Button from "./inputs/Button.vue";
import { HTMLInputEvent } from "../types";
export default defineComponent({
  name: "Form",
  components: {
    Input,
    Tags,
    Select,
    Rate,
    Image,
    Button
  },
  setup(prp, ctx) {
    const book = new FormData();
    const title = ref("");
    const author = ref("");
    const series = ref("");
    const seriesShow = ref(false);

    book.append("room", "bedroom");
    book.append("place", "wardrobe");

    //Select place in room
    const selectedRoomPlaces = ref(["wardrobe", "chest-of-drawers"]);

    function roomSelected(e: HTMLInputEvent) {
      const roomFromSelect = e.target.value;
      const selectedPlace = Object.entries(places).find(
        i => i[0] === roomFromSelect
      );
      selectedRoomPlaces.value = selectedPlace ? selectedPlace[1] : [];
      book.set(
        "place",
        selectedRoomPlaces.value[selectedRoomPlaces.value.length - 1]
      );
      book.set("room", roomFromSelect);

      console.log(book.get("place"), book.get("room"));
    }

    function setTags(tags: string[]) {
      if (tags.includes("series")) {
        seriesShow.value = true;
      } else {
        seriesShow.value = false;
      }
      book.set("tags", JSON.stringify(tags));
    }

    const descriptionError = ref("");
    const description = ref("");

    function setDescription() {
      descriptionError.value =
        description.value.trim().length < 10
          ? "Opis musi zawierać conajmnniej 10 znaków."
          : "";
    }

    function onSubmit() {
      book.set("name", title.value);
      book.set("author", author.value);
      book.set("series", series.value);
      book.set("description", description.value);
      ctx.emit("form-submitted", book);
    }

    return {
      book,
      selectedRoomPlaces,
      rooms,
      roomSelected,
      setDescription,
      descriptionError,
      description,
      setTags,
      title,
      author,
      series,
      seriesShow,

      onSubmit
    };
  }
});
</script>
<style lang="scss">
.container {
  width: 100vw;
  @include flex;
  min-height: 100vh;
  padding-bottom: 60px;
}
.form {
  width: 100vw;
  @include flex;
  flex-flow: column wrap;
  padding: 30px 38px;
  z-index: 1;
  max-width: 850px;
  border-radius: 30px;

  &__wrapper {
    @include flex;
    width: 100%;
    flex-wrap: wrap;
    &__inputs,
    &__rest,
    .tags,
    .file-select {
      width: 100%;
      @include flex;
      flex: 0 1 310px;
    }

    &__inputs,
    &__rest {
      flex-flow: column wrap;
    }

    .tags {
      align-content: flex-start;
      flex-flow: column wrap;
      width: 100%;
    }
  }
}

h3 {
  align-self: flex-start;
  border-bottom: 2px solid $main-color;
  padding: 0 20px 5px 3px;
  margin-bottom: 10px;
}

span {
  font-weight: 600;
  text-transform: capitalize;
  font-size: 0.87rem;
}

.file-select {
  width: 100%;
  @include flex(space-between);
  margin-top: 25px;
  .selects {
    @include flex(center, flex-start);
    flex-flow: column wrap;

    .select {
      display: flex;
      flex-flow: column wrap;
      margin: 15px 0;

      span {
        margin-bottom: 8px;
      }
    }
  }
}

.rate {
  width: 100%;
  @include flex(space-between);
  margin: 10px 0;
}

.description {
  margin-top: 14px;
  width: 100%;

  textarea {
    width: 100%;
    border: 2px solid lightgray;
    height: 140px;
    margin-top: 9px;
    padding: 9px 14px;
    resize: none;
    border-radius: 5px;

    &:focus {
      border: 2px solid $main-color;
      box-shadow: 0 0 12px 1px $main-color;
      transition: 0.3s;
    }
  }
}

@media all and (min-width: 700px) {
  .form__wrapper__inputs,
  .form__wrapper__rest,
  .tags,
  .file-select {
    margin: 5px;
  }

  .tags {
    margin: 15px 0;
  }
}

@media all and (min-width: 800px) {
  .container {
    background: linear-gradient(90deg, #fad7a1, #e96d71);
    padding: 40px 0;
  }
  .form {
    position: relative;
    background-color: #fff;
    padding: 35px 50px;
    z-index: 100;
  }
  .form__wrapper__inputs,
  .form__wrapper__rest,
  .tags,
  .file-select {
    margin: 25px;
  }
}
</style>
