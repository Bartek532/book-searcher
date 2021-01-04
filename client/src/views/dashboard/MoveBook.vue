<template>
  <div class="page">
    <h1 class="title"><span>Zmień miejsce</span></h1>
    <SearchInput />
    <Results class="all-books" @result-clicked="openMoveModal($event.id)" />
    <div class="move-modal" v-if="modalOpen">
      <div class="move-modal__window">
        <div class="move-modal__window__close" @click="closeModal">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.22499 4.81099C6.03639 4.62883 5.78378 4.52803 5.52159 4.53031C5.25939 4.53259 5.00858 4.63776 4.82317 4.82317C4.63776 5.00858 4.53259 5.25939 4.53031 5.52158C4.52804 5.78378 4.62883 6.03638 4.81099 6.22499L10.586 12L4.80999 17.775C4.71448 17.8672 4.6383 17.9776 4.58589 18.0996C4.53348 18.2216 4.50589 18.3528 4.50474 18.4856C4.50358 18.6184 4.52889 18.75 4.57917 18.8729C4.62945 18.9958 4.7037 19.1075 4.79759 19.2014C4.89149 19.2953 5.00314 19.3695 5.12603 19.4198C5.24893 19.4701 5.38061 19.4954 5.51339 19.4942C5.64617 19.4931 5.77739 19.4655 5.89939 19.4131C6.0214 19.3607 6.13174 19.2845 6.22399 19.189L12 13.414L17.775 19.189C17.9636 19.3711 18.2162 19.4719 18.4784 19.4697C18.7406 19.4674 18.9914 19.3622 19.1768 19.1768C19.3622 18.9914 19.4674 18.7406 19.4697 18.4784C19.4719 18.2162 19.3711 17.9636 19.189 17.775L13.414 12L19.189 6.22499C19.3711 6.03638 19.4719 5.78378 19.4697 5.52158C19.4674 5.25939 19.3622 5.00858 19.1768 4.82317C18.9914 4.63776 18.7406 4.53259 18.4784 4.53031C18.2162 4.52803 17.9636 4.62883 17.775 4.81099L12 10.586L6.22499 4.80999V4.81099Z"
              fill="#bebebe"
            />
          </svg>
        </div>
        <section class="move-modal__window__section current-location">
          <h2 class="current-location__label">Obecne położenie</h2>
          <article class="current-location__content">
            <div class="position">
              <span class="position__label">Pokój</span
              ><span class="position__text">{{
                polishTranslate[activeBook.room]
              }}</span>
            </div>
            <div class="position">
              <span class="position__label">Miejsce</span
              ><span class="position__text">{{
                polishTranslate[activeBook.place]
              }}</span>
            </div>
          </article>
        </section>

        <section class="move-modal__window__section active-location">
          <h2 class="active-location__label">Nowe położenie</h2>
          <article class="active-location__content">
            <div class="position">
              <span class="position__label">Pokój</span>
              <Select
                name="rooms"
                :values="rooms"
                @change="selectRoom"
                class="position__select"
              />
            </div>
            <div class="position">
              <span class="position__label">Miejsce</span
              ><Select
                name="places"
                :values="places[data.room]"
                class="position__select"
                @change="data.place = $event.target.value"
              />
            </div>
          </article>
        </section>

        <Button text="Zapisz" @click="moveBook" />
      </div>
    </div>
    <LoadingModal v-if="loading" />
    <Modal />
  </div>
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
import { rooms, places, polishTranslate } from "../../data";
import { HTMLInputEvent } from "../../types";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    Results,
    SearchInput,
    Select,
    Button,
    LoadingModal,
    Modal
  },
  setup() {
    const store = useStore();
    const modalOpen = ref(false);
    const activeBook = ref({});
    const data = reactive({ room: "bedroom", place: "wardrobe" } as {
      id: number;
      room: string;
      place: string;
    });

    const loading = ref(false);

    function openMoveModal(identifier: number) {
      modalOpen.value = true;
      data.id = identifier;
      activeBook.value = store.state.results.find(
        ({ id }: { id: number }) => id === identifier
      );
    }

    function closeModal() {
      modalOpen.value = false;
      data.room = "bedroom";
      data.place = "wardrobe";
    }

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
          message: "Zmieniono położenie."
        });
      } catch (err) {
        store.dispatch("setModal", {
          show: true,
          type: "error",
          message: err.response.data.message
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
      loading
    };
  }
});
</script>

<style lang="scss" scoped>
.page {
  @include flex;
  flex-flow: column wrap;
}

.all-books {
  width: 100%;
  transform: translateY(-35px);
}

.search {
  transform: translateY(40px);
}

.move-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
  @include flex;

  &__window {
    @include flex;
    flex-flow: column wrap;
    width: 80vw;
    max-width: 470px;
    min-height: 320px;
    background-color: #fff;
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

    .active-location {
      margin-top: 30px;
      &__label {
        color: $main-color;
      }

      .position {
        margin: 7px;
      }

      .position__label {
        margin-bottom: 5px;
      }
    }
  }
}
</style>
