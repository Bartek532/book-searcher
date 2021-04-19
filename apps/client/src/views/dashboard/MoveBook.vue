<template>
  <main class="move">
    <div class="move__modal" v-if="modalOpen">
      <div class="move__modal__window">
        <button class="move__modal__window__close" @click="modalOpen = false">
          <img src="../../assets/svgs/icons/close.svg" alt="close" />
        </button>
        <section class="move__modal__window__section current-location">
          <h2 class="current-location__label">Obecne położenie</h2>
          <article class="current-location__content">
            <div class="position">
              <h3 class="position__label">Pokój</h3>
              <span class="position__text">{{
                polishTranslate[selectedBook.room]
              }}</span>
            </div>
            <div class="position">
              <h3 class="position__label">Miejsce</h3>
              <span class="position__text">{{
                polishTranslate[selectedBook.place]
              }}</span>
            </div>
          </article>
        </section>

        <form
          class="move__modal__window__form active-location"
          @submit.prevent="handleMoveBook"
        >
          <h2 class="active-location__label">Nowe położenie</h2>
          <fieldset class="active-location__content">
            <div class="position">
              <h3 class="position__label">Pokój</h3>
              <Select
                v-model="room"
                :values="rooms"
                name="rooms"
                label="pokój"
                :error="errors?.room"
              />
            </div>
            <div class="position">
              <h3 class="position__label">Miejsce</h3>
              <Select
                v-model="place"
                :values="places[room] || []"
                name="places"
                label="miejsce"
                :error="errors?.place"
              />
            </div>
          </fieldset>
          <Button text="Zapisz" />
        </form>
      </div>
    </div>
    <Modal @modal-accepted="getBooks('/')" />
    <h1 class="title">Zmień położenie</h1>
    <SearchInput @search="handleFilterBooks" />
    <Results @result-clicked="handleOpenMoveModal" :loading="loading" />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Results from "../../components/results/Results.vue";
import SearchInput from "../../components/form/SearchInput.vue";
import Button from "../../components/buttons/Button.vue";
import Select from "../../components/form/Select.vue";
import Modal from "../../components/Modal.vue";
import { rooms, places, polishTranslate } from "@book-searcher/data";
import type { Book } from "@book-searcher/types";
import { HTMLInputEvent } from "../../types";
import { useForm, useField } from "vee-validate";
import { moveBookSchema } from "../../utils/validationSchemas";
import { prepareQueryToSearch } from "../../utils/functions";
import { useBooks } from "../../utils/composable/useBooks";
import { useBook } from "../../utils/composable/useBook";

export default defineComponent({
  components: {
    Results,
    SearchInput,
    Modal,
    Button,
    Select,
  },
  setup() {
    const selectedBook = ref({} as Book);
    const modalOpen = ref(false);

    const { getBooks, loading, results } = useBooks();
    const { moveBook } = useBook();

    const { handleSubmit, errors } = useForm({
      validationSchema: moveBookSchema,
    });

    getBooks("/");

    const handleFilterBooks = (e: HTMLInputEvent) => {
      if (e.target?.value) {
        return getBooks(
          `/search?type=basic&q=${prepareQueryToSearch(e.target?.value)}`,
        );
      }
    };

    const handleOpenMoveModal = (slug: string) => {
      modalOpen.value = true;
      selectedBook.value =
        results.value.find((item: Book) => item.slug === slug) || ({} as Book);
    };

    const handleMoveBook = handleSubmit((data, { resetForm }) => {
      modalOpen.value = false;
      resetForm();
      return moveBook({
        id: selectedBook.value.id,
        ...data,
      } as { id: number; room: string; place: string });
    });

    const { value: room } = useField("room");
    const { value: place } = useField("place");

    return {
      getBooks,
      handleFilterBooks,
      handleOpenMoveModal,
      selectedBook,
      modalOpen,
      rooms,
      places,
      polishTranslate,
      errors,
      room,
      place,
      handleMoveBook,
      loading,
    };
  },
});
</script>

<style lang="scss" scoped>
.move {
  @include flex;
  flex-flow: column wrap;
  align-self: flex-start;
  padding-top: 15px;

  .title {
    border-bottom: 4px solid var(--blue-100);
    margin-bottom: 0;
    padding-bottom: 2px;
  }

  &__modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    @include flex;

    &__window {
      @include flex;
      flex-flow: column wrap;
      width: 90vw;
      max-width: 470px;
      background-color: var(--white-100);
      position: relative;
      border-radius: 10px;
      padding: 30px 25px;

      &__close {
        position: absolute;
        top: 10px;
        right: 7px;
        cursor: pointer;
        border: 0 none;
        background-color: transparent;
      }

      .current-location,
      .active-location {
        @include flex;
        flex-flow: column wrap;
        width: 100%;
        &__label {
          font-size: 1.2rem;
          text-transform: uppercase;
          font-weight: 700;
        }

        &__content {
          width: 100%;
          max-width: 260px;
          @include flex;
          flex-wrap: wrap;
          padding: 15px 0;

          .position {
            @include flex;
            flex-flow: column wrap;
            flex: 0 1 110px;
            margin: 7px;

            &__label {
              font-size: 0.93rem;
              font-weight: 600;
              margin: 0;
              margin-bottom: 3px;
            }

            &__text {
              text-transform: capitalize;
            }
          }
        }
      }

      .active-location {
        margin-top: 10px;

        &__label {
          color: var(--blue-100);
        }

        &__content {
          border: 0 none;
          padding: 6px 0;
          @include flex(center, flex-start);
          max-width: 400px;

          .position {
            margin: 7px;
            flex: 0 1 150px;

            &__label {
              margin-bottom: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
