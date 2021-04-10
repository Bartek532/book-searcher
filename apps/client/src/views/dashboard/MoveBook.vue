<template>
  <main class="move">
    <h1 class="title">Zmień miejsce</h1>
    <SearchInput @search="filterBooks" />
    <Results @result-clicked="openMoveModal" />
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

        <form class="move__modal__window__form active-location">
          <h2 class="active-location__label">Nowe położenie</h2>
          <fieldset class="active-location__content">
            <div class="position">
              <h3 class="position__label">Pokój</h3>
              <Select
                name="rooms"
                :values="rooms"
                class="position__select"
                label="pokój"
              />
            </div>
            <div class="position">
              <h3 class="position__label">Miejsce</h3>
              <Select
                name="places"
                :values="rooms"
                class="position__select"
                label="miejsce"
              />
            </div>
          </fieldset>
          <Button text="Zapisz" @click="moveBook" />
        </form>
      </div>
    </div>
    <LoadingModal />
    <Modal />
  </main>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, ref, reactive } from "vue";
import Results from "../../components/Results.vue";
import SearchInput from "../../components/inputs/SearchInput.vue";
import Button from "../../components/inputs/Button.vue";
import Select from "../../components/inputs/Select.vue";
import LoadingModal from "../../components/modals/LoadingModal.vue";
import Modal from "../../components/modals/MainModal.vue";
import { rooms, places, polishTranslate } from "@book-searcher/data";
import type { Book } from "@book-searcher/types";
import { HTMLInputEvent } from "../../types";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    Results,
    SearchInput,
    LoadingModal,
    Modal,
    Button,
    Select,
  },
  setup() {
    const store = useStore();
    const selectedBook = ref({});
    const modalOpen = ref(false);

    store.dispatch("getAllBooks");

    const filterBooks = async (e: HTMLInputEvent) => {
      return await store.dispatch("searchByQuery", e.target.value);
    };

    const openMoveModal = (slug: string) => {
      modalOpen.value = true;
      selectedBook.value = store.state.results.find(
        (item: Book) => item.slug === slug,
      );

      console.log(selectedBook);
    };

    return {
      filterBooks,
      selectedBook,
      modalOpen,
      openMoveModal,
      rooms,
      places,
      polishTranslate,
    };

    /*
    const modalOpen = ref(false);
    const activeBook = ref({});
    const data = reactive({ room: "bedroom", place: "wardrobe" } as {
      id: number;
      room: string;
      place: string;
    });

    function selectRoom(e: HTMLInputEvent) {
      data.room = e.target.value;
      const availablePlaces =
        places[
          data.room as "bedroom" | "living-room" | "corridor" | "carriage-room"
        ];
      data.place = availablePlaces[availablePlaces.length - 1];
    }

    async function moveBook() {
      modalOpen.value = false;
      loading.value = true;
      try {
        await axios.put("/api/books/move", data);
        store.dispatch("setModal", {
          show: true,
          type: "success",
          message: "Zmieniono położenie.",
        });
      } catch (err) {
        store.dispatch("setModal", {
          show: true,
          type: "error",
          message: err.response.data.message,
        });
      } finally {
        loading.value = false;
      }
    }

    store.dispatch("getAllBooks");

    return {
      rooms,
      places,
      polishTranslate,
      data,
      selectRoom,
      moveBook,
      modalOpen,
      closeModal,
      openMoveModal,
      activeBook,
      loading,
    };
    */
  },
});
</script>

<style lang="scss" scoped>
.move {
  @include flex;
  flex-flow: column wrap;
  align-self: flex-start;

  .title {
    border-bottom: 3px solid var(--blue-100);
    margin-bottom: 0;
  }

  &__modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    @include flex;

    &__window {
      @include flex;
      flex-flow: column wrap;
      width: 90vw;
      max-width: 470px;
      /*min-height: 320px;*/
      background-color: var(--white-100);
      position: relative;
      border-radius: 10px;
      padding: 30px 37px;

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
          @include flex(space-between);
          flex-wrap: wrap;
          padding: 15px 0;

          .position {
            @include flex;
            flex-flow: column wrap;
            flex: 0 1 120px;
            margin: 4px;

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
          padding: 0;
          @include flex;

          .position {
            margin: 7px;

            &__label {
              margin-bottom: 5px;
            }
          }
        }
      }
    }
  }
}
/*
.move__modal {


  &__window {
    @include flex;
    flex-flow: column wrap;
    width: 80vw;
    max-width: 470px;
    min-height: 320px;
    background-color: var(--white-100);
    position: relative;
    border-radius: 10px;
    padding: 40px 37px;

    &__close {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
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
        @include flex(space-evenly);
        flex-wrap: wrap;
        padding: 15px 0;

        .position {
          @include flex;
          flex-flow: column wrap;
          flex: 0 1 auto;
          margin: 4px;

          &__label {
            font-size: 0.93rem;
            font-weight: 600;
          }

          &__text {
            text-transform: capitalize;
          }
        }
      }
    }


}

.not-found {
  font-size: 1.5rem;
  line-height: 37px;
  width: 80%;
  max-width: 500px;
  text-align: center;
  transform: translateY(150px);

  .bold,
  .again {
    font-weight: bold;
  }

  .again {
    display: block;
    color: #0466c8;
  }
}
*/
</style>
