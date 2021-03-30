<template>
  <div class="result__background">
    <section class="result__container" v-if="!loading">
      <BackButton />
      <div class="result__icons">
        <button class="result__icons__bookmark" @click="manageUserLibrary">
          <span class="sr-only">bookmark</span>
          <svg
            width="30"
            height="30"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            :class="{ 'result__icons__bookmark--active': activeBookmark }"
          >
            <path
              d="M7.74275 11.5713L3.5 14.1169V3C3.5 2.60218 3.65804 2.22064 3.93934 1.93934C4.22064 1.65804 4.60218 1.5 5 1.5H11C11.3978 1.5 11.7794 1.65804 12.0607 1.93934C12.342 2.22064 12.5 2.60218 12.5 3V14.1169L8.25725 11.5713L8 11.4169L7.74275 11.5713Z"
              fill="none"
              stroke="#2524E9"
            />
          </svg>
        </button>

        <button class="result__icons__star" @click="rateModal = true">
          <span class="sr-only">star</span>
          <img src="../assets/svgs/icons/star.svg" alt="" />
        </button>
      </div>
      <div class="result__info">
        <div class="result__info__image">
          <img v-lazy="book.img" :alt="book.name" />
        </div>
        <div class="result__info__data">
          <span class="result__info__data__title">
            {{ book.name }}
          </span>
          <router-link
            :to="`/ksiazki?tags=&author=${encodeURIComponent(book.author)}`"
            class="result__info__data__author"
          >
            {{ book.author }}
          </router-link>
          <button
            class="result__info__data__series"
            v-if="book.series"
            @click="
              $router.push(`/ksiazki?series=${encodeURIComponent(book.series)}`)
            "
          >
            {{ book.series }}
          </button>
          <div class="result__info__data__rates">
            <img
              class="result__info__data__rates__star"
              src="../assets/svgs/icons/star-small.svg"
              alt="rates"
            />
            <span class="result__info__data__rates__rate">
              {{
                (
                  book.UserBookRate?.reduce((acc, { rate }) => acc + rate, 0) /
                  book.UserBookRate?.length
                ).toFixed(1)
              }}
              / 6
            </span>
          </div>
        </div>
      </div>
      <div class="result__description">
        <div class="result__places">
          <span class="result__places__room">
            <img src="../assets/svgs/icons/room.svg" alt="" />
            <router-link
              :to="`/pokoje/${encodeURIComponent(polishTranslate[book.room])}`"
              class="text"
            >
              {{ capitalize(polishTranslate[book.room]) }}
            </router-link>
          </span>
          <span class="result__places__place">
            <img src="../assets/svgs/icons/place.svg" alt="" />
            <router-link
              :to="`/ksiazki?room=${book.room}&place=${book.place}`"
              class="text"
            >
              {{ capitalize(polishTranslate[book.place]) }}
            </router-link>
          </span>
        </div>
        <p>
          {{ book.description }}
        </p>
      </div>
      <div class="result__tags">
        <Checkbox
          v-for="tag in book.BookTag"
          :key="tag.tagName"
          :text="tag.tagName"
          @click="$router.push(`/ksiazki?tags=${tag.tagName}`)"
        />
      </div>
      <Button text="Szukaj więcej" @click="$router.push({ path: '/search' })" />
    </section>
    <RateModal
      :slug="slug"
      v-if="rateModal"
      @close-modal="rateModal = false"
      @rate-book="rateBook"
    />
    <Modal
      @modal-accepted="
        $store.state.modal.message.includes('Zaloguj') &&
          $router.push({ path: '/auth/login' })
      "
    />
    <LoadingModal v-if="loading" />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import BackButton from "../components/Back.vue";
import Checkbox from "../components/inputs/Checkbox.vue";
import Button from "../components/inputs/Button.vue";
import RateModal from "../components/modals/RateModal.vue";
import LoadingModal from "../components/modals/LoadingModal.vue";
import Modal from "../components/modals/MainModal.vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { ref, defineComponent, onMounted, reactive } from "vue";
import { polishTranslate } from "@book-searcher/data";
import { fetcher } from "../utils/fetcher";
import type { Book } from "@book-searcher/types";
export default defineComponent({
  components: {
    BackButton,
    Checkbox,
    RateModal,
    Modal,
    LoadingModal,
    Button,
  },
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  setup(prp) {
    const book = ref({});

    const router = useRouter();
    const route = useRoute();
    const loading = ref(true);

    const store = useStore();
    const rateModal = ref(false);

    function capitalize(val: string) {
      return val.slice(0, 1).toUpperCase() + val.slice(1);
    }

    const searchBook = async () => {
      loading.value = true;
      try {
        const { data }: { data: Book } = await fetcher(
          `/api/books/${prp.slug}`,
          "GET",
        );
        book.value = data;
      } catch (err) {
        console.log(err);
      } finally {
        loading.value = false;
      }
    };

    searchBook();

    //Search book
    //Rate book
    /*
    async function rateBook(rate: number) {
      rateModal.value = false;
      loading.value = true;
      try {
        await axios.put("/api/books/rate", {
          rate: rate,
          id: data.id,
        });
        store.dispatch("setModal", {
          show: true,
          type: "success",
          message: "Dziękujemy za opinię!",
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

    //Bookmark book
    const activeBookmark = ref(route.path.startsWith("/dashboard/library"));
    async function manageUserLibrary() {
      const requestData = {
        url: "/api/books/bookmark",
        message: "Dodano książkę do biblioteki.",
      };
      if (activeBookmark.value) {
        requestData.url = "/api/users/deleteFromLibrary";
        requestData.message = "Usunięto książkę z biblioteki.";
      }

      loading.value = true;
      try {
        await axios.put(requestData.url, {
          id: data.id,
        });
        store.dispatch("setModal", {
          show: true,
          type: "success",
          message: requestData.message,
        });
        activeBookmark.value = requestData.message.startsWith("Dodano") && true;
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

    //Search by tags
    function searchByTag(tag: string) {
      router.push({ path: "/results" });
      store.dispatch("advancedSearch", { tags: [tag] });
    }

    //Search by series
    function searchBySeries(series: string) {
      router.push({ path: "/results" });
      store.dispatch("searchBySeries", series);
    }

    //Search by places
    function searchByRooms(room: string, place: string) {
      router.push({ path: "/results" });
      store.dispatch("searchByRooms", { room, place });
    }

    function searchByAuthor(author: string) {
      router.push({ path: "/results" });
      store.dispatch("advancedSearch", { author });
    }
    */

    onMounted(() => {
      window.scrollTo(0, 0);
    });

    return {
      book,
      capitalize,
      rateModal,
      loading,
      polishTranslate,
    };
  },
});
</script>

<style lang="scss" scoped>
.result {
  &__container {
    @include flex;
    position: relative;
    flex-flow: column wrap;
    width: 100%;
    max-width: 400px;
    padding: 70px 30px 30px 30px;
  }

  &__icons {
    position: absolute;
    top: 20px;
    right: 30px;
    cursor: pointer;

    &__bookmark {
      path {
        stroke: $inactive-color;
      }
      &--active path {
        fill: $inactive-color;
      }
    }

    &__star,
    &__bookmark {
      border: 0 none;
      background-color: transparent;
      margin-left: 7px;
    }
  }

  &__info {
    @include flex;

    &__image {
      margin-right: 30px;
      max-width: 40%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    &__data {
      @include flex(center, flex-start);
      flex-flow: column wrap;
      min-width: 40%;

      &__title {
        font-weight: 600;
        font-size: 1rem;
        margin-bottom: 5px;
      }

      &__author {
        font-size: 0.9rem;
        margin-bottom: 15px;
        color: gray;

        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }

      &__series {
        margin: 7px 0;
        padding: 7px 14px;
        border: 2px solid #f59b66;
        font-size: 0.9rem;
        text-align: left;
        cursor: pointer;
        background-color: transparent;
        transition: opacity 0.3s;

        &:hover {
          opacity: 0.5;
        }
      }

      &__rates {
        margin-top: 11px;
        background-color: rgba($main-color, 0.3);
        @include flex;
        font-weight: 600;
        font-size: 0.7rem;
        color: $main-color;
        padding: 3px 14px 3px 8px;
        border-radius: 13px;

        &__star {
          margin-right: 5px;
          transform: translateY(-0.5px);
        }
      }
    }
  }

  &__description {
    border-top: 2px solid lightgray;
    color: rgb(71, 67, 67);
    width: 100%;
    margin-top: 28px;

    p {
      padding: 0 5px;
      font-size: 0.95rem;
      line-height: 1.55rem;
      margin: 5px 0;
    }
  }

  &__places {
    width: 100%;
    @include flex(space-between);

    &__place {
      flex-direction: row-reverse;
    }
    &__room,
    &__place {
      @include flex;
      margin: 14px 0 8px 0;

      .text {
        font-weight: 600;
        font-size: 0.8rem;
        color: #000;
        letter-spacing: 0.7px;
        margin: 0 8px;

        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }

  &__tags {
    margin-top: 15px;
  }
}

@media all and (min-width: 700px) {
  .result {
    &__container {
      border-radius: 15px;
      box-shadow: $box-shadow;
      margin-top: 30px;
    }
  }
}

/*
@media all and (min-width: 700px) {
  .result {
    &__background {
      @include flex;
    }

    &__container {
      backdrop-filter: blur(20px);
      color: #fff;
      border-radius: 15px;

      .back {
        left: 30px;
      }
    }

    &__info__data {
      &__author {
        color: lightgray;
      }
      &__rates {
        color: $inactive-color;
        background-color: rgba($inactive-color, 0.2);

        &__star path {
          fill: $inactive-color;
        }
      }
    }

    &__places .text {
      color: #edf6f9;
    }

    &__bookmark {
      right: 30px;
    }

    &__star {
      right: 75px;
    }

    &__description {
      color: #fff;
    }
  }
}
*/
</style>
