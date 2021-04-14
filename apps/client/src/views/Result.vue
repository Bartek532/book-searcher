<template>
  <main class="result">
    <section class="result__container" v-if="!firstLoading">
      <BackButton />
      <div class="result__icons">
        <button
          class="result__icons__bookmark"
          @click="handleManageUserLibrary"
        >
          <span class="sr-only">bookmark</span>
          <svg
            width="30"
            height="30"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            :class="{ 'result__icons__bookmark--active': isBookInUserLibrary }"
          >
            <path
              d="M7.74275 11.5713L3.5 14.1169V3C3.5 2.60218 3.65804 2.22064 3.93934 1.93934C4.22064 1.65804 4.60218 1.5 5 1.5H11C11.3978 1.5 11.7794 1.65804 12.0607 1.93934C12.342 2.22064 12.5 2.60218 12.5 3V14.1169L8.25725 11.5713L8 11.4169L7.74275 11.5713Z"
              fill="none"
              stroke="#2524E9"
            />
          </svg>
        </button>

        <RateBook :bookId="book.id" @loading="loading = $event" />
      </div>
      <div class="result__info">
        <div class="result__info__image">
          <img
            :src="book.img"
            :alt="book.name"
            loading="lazy"
            width="200"
            height="130"
          />
        </div>
        <div class="result__info__data">
          <span class="result__info__data__title">
            {{ book.name }}
          </span>
          <router-link
            :to="`/ksiazki?author=${encodeURIComponent(book.author)}`"
            class="result__info__data__author"
          >
            {{ book.author }}
          </router-link>
          <button
            class="result__info__data__series"
            v-if="book.series"
            @click="
              $router.push({
                path: '/ksiazki',
                query: { series: encodeURIComponent(book.series) },
              })
            "
          >
            {{ book.series }}
          </button>
          <div class="result__info__data__rates">
            <img
              class="result__info__data__rates__star"
              src="../assets/svgs/icons/star-small.svg"
              alt="star"
              width="14"
              height="14"
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
            <img
              src="../assets/svgs/icons/room.svg"
              alt=""
              width="27"
              height="27"
            />
            <router-link
              :to="`/pokoje/${encodeURIComponent(polishTranslate[book.room])}`"
              class="text"
            >
              {{ capitalize(polishTranslate[book.room]) }}
            </router-link>
          </span>
          <span class="result__places__place">
            <img
              src="../assets/svgs/icons/place.svg"
              alt=""
              width="27"
              height="27"
            />
            <router-link
              :to="{
                path: '/ksiazki',
                query: { room: book.room, place: book.place },
              }"
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
          @click="
            $router.push({ path: '/ksiazki', query: { tags: tag.tagName } })
          "
        />
      </div>
      <Button text="Szukaj więcej" @click="$router.push({ path: '/szukaj' })" />
    </section>
    <Modal />
    <LoadingModal :show="firstLoading || loading" />
  </main>
</template>

<script lang="ts">
import BackButton from "../components/buttons/Back.vue";
import Checkbox from "../components/form/Checkbox.vue";
import Button from "../components/buttons/Button.vue";
import RateBook from "../components/RateBook.vue";
import LoadingModal from "../components/loading/LoadingModal.vue";
import Modal from "../components/Modal.vue";
import { ref, defineComponent, onMounted, watch } from "vue";
import { polishTranslate } from "@book-searcher/data";
import { fetcher } from "../utils/fetcher";
import { useUserBooks } from "../utils/hooks";
import { capitalize } from "../utils/functions";
import type { Book } from "@book-searcher/types";
export default defineComponent({
  name: "Result",
  components: {
    BackButton,
    Checkbox,
    RateBook,
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
    const book = ref({} as Book);
    const firstLoading = ref(true);
    const loading = ref(false);
    const rateModal = ref(false);
    const isBookInUserLibrary = ref(false);

    const {
      loading: libraryLoading,
      addToUserBooks,
      deleteFromUserBooks,
      getUserBook,
      book: userBook,
      error,
    } = useUserBooks();

    const searchBook = async () => {
      try {
        const { data }: { data: Book } = await fetcher(
          `/api/books/${prp.slug}`,
          "GET",
        );
        book.value = data;
        await getUserBook(book.value.id);
        if (Object.keys(userBook.value).length) {
          isBookInUserLibrary.value = true;
        }
      } catch (err) {
        console.log(err);
      } finally {
        firstLoading.value = false;
      }
    };

    const handleManageUserLibrary = () => {
      if (isBookInUserLibrary.value) {
        deleteFromUserBooks(book.value.id);
        if (!error.value) {
          isBookInUserLibrary.value = false;
          return;
        }
      }
      addToUserBooks(book.value.id);
      if (!error.value) {
        isBookInUserLibrary.value = true;
        return;
      }
    };

    searchBook();

    onMounted(() => {
      window.scrollTo(0, 0);
    });

    watch(
      () => libraryLoading.value,
      () => (loading.value = libraryLoading.value),
    );

    return {
      book,
      capitalize,
      rateModal,
      loading,
      firstLoading,
      polishTranslate,
      isBookInUserLibrary,
      handleManageUserLibrary,
    };
  },
});
</script>

<style lang="scss" scoped>
.result {
  align-self: flex-start;
  &__container {
    @include flex;
    position: relative;
    flex-flow: column wrap;
    width: 100%;
    max-width: 470px;
    padding: 70px 30px 30px 30px;
  }

  &__icons {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;

    &__bookmark {
      border: 0 none;
      background-color: transparent;
      margin: 0 7px;
      cursor: pointer;
      path {
        stroke: var(--blue-200);
      }
      &--active path {
        fill: var(--blue-200);
      }
    }
  }

  &__info {
    @include flex;
    padding-top: 10px;

    &__image {
      margin-right: 30px;
      width: 40%;
      img {
        max-width: 100%;
        height: 100%;
      }
    }

    &__data {
      @include flex(center, flex-start);
      flex-flow: column wrap;
      width: 45%;

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
        background-color: rgba(var(--blue-100-rgb), 0.3);
        @include flex;
        font-weight: 600;
        font-size: 0.7rem;
        color: var(--blue-100);
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
    border-top: 2px solid var(--gray-100);
    width: 100%;
    margin-top: 28px;

    p {
      padding: 0 5px;
      font-size: 0.9rem;
      line-height: 1.65rem;
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
        color: var(--black-100);
        letter-spacing: 0.3px;
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
      box-shadow: var(--primary-shadow);
      margin-top: 30px;
    }

    &__info {
      &__image {
        max-width: 35%;
      }

      &__data {
        max-width: 45%;
      }
    }
  }
}
</style>
