<template>
  <div class="result__background">
    <div class="result__container">
      <div class="result__icons">
        <BackButton @click="$router.go(-1)" />
        <svg
          width="30"
          height="30"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          :class="[
            'result__bookmark',
            { 'result__bookmark--active': activeBookmark }
          ]"
          @click="manageUserLibrary"
        >
          <path
            d="M7.74275 11.5713L3.5 14.1169V3C3.5 2.60218 3.65804 2.22064 3.93934 1.93934C4.22064 1.65804 4.60218 1.5 5 1.5H11C11.3978 1.5 11.7794 1.65804 12.0607 1.93934C12.342 2.22064 12.5 2.60218 12.5 3V14.1169L8.25725 11.5713L8 11.4169L7.74275 11.5713Z"
            fill="none"
            stroke="#2524E9"
          />
        </svg>
        <svg
          width="32"
          height="32"
          viewBox="0 0 1024 1024"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="result__star"
          @click="rateModal = true"
        >
          <path
            d="M742.1 586.8L785.5 839.7C788.5 857.1 776.8 873.6 759.4 876.6L742.1 586.8ZM742.1 586.8L925.8 407.7L742.1 586.8ZM642.093 322.172L645.233 328.539L652.258 329.56L906.116 366.453C906.122 366.454 906.128 366.455 906.135 366.456C916.379 367.988 923.291 377.403 921.758 387.342L921.746 387.416L921.736 387.491C921.164 391.493 919.276 395.189 916.359 398.051C916.356 398.053 916.354 398.056 916.351 398.058L732.676 577.134L727.594 582.088L728.795 589.083L772.195 841.983L772.196 841.994C773.924 852.013 767.192 861.557 757.106 863.296L757.097 863.298L757.087 863.3C753.083 863.996 748.936 863.342 745.443 861.483L745.413 861.467L745.382 861.451L518.282 742.051L512 738.748L505.718 742.051L278.618 861.451L278.607 861.456L278.597 861.462C275.548 863.072 272.109 863.795 268.67 863.55C265.231 863.305 261.93 862.101 259.14 860.075C256.351 858.049 254.185 855.281 252.888 852.087C251.591 848.893 251.215 845.399 251.802 842.001L251.804 841.992L251.805 841.983L295.205 589.083L296.406 582.088L291.324 577.134L107.624 398.034L107.623 398.033C104.103 394.601 102.088 389.912 102.023 384.995C101.958 380.088 103.841 375.355 107.258 371.833C110.119 368.92 113.811 367.036 117.809 366.464L117.825 366.462L117.842 366.46L371.742 329.56L378.767 328.539L381.907 322.172L495.375 92.1374C495.379 92.1283 495.384 92.1191 495.389 92.1099C499.995 82.9338 511.136 79.2187 520.224 83.7053L520.232 83.7092L520.24 83.713C523.866 85.4974 526.803 88.4341 528.587 92.0604L528.593 92.0721L642.093 322.172Z"
            fill="none"
            stroke="#F59B66"
            stroke-width="77"
          />
        </svg>
      </div>
      <div class="result__info">
        <div
          class="result__info__image"
          :style="{ backgroundImage: `url(${data.img})` }"
        ></div>
        <div class="result__info__data">
          <div class="result__info__data__title">
            {{ data.name }}
          </div>
          <div
            class="result__info__data__author"
            @click="searchByAuthor(data.author)"
          >
            {{ data.author }}
          </div>
          <Checkbox
            :text="data.series"
            :check="false"
            v-if="data.series"
            @click="searchBySeries(data.series)"
          />
          <div class="result__info__data__rates">
            <div class="result__info__data__rates__star">
              <svg
                width="14"
                height="14"
                viewBox="0 0 7 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.95531 2.72367L4.38147 2.48415L3.67792 0.990544C3.6587 0.94965 3.62709 0.916546 3.58803 0.896423C3.49009 0.845792 3.37108 0.887985 3.32211 0.990544L2.61856 2.48415L1.04471 2.72367C1.00132 2.73017 0.961648 2.75159 0.931274 2.78404C0.894554 2.82356 0.87432 2.87674 0.875017 2.93187C0.875715 2.98701 0.897287 3.0396 0.934994 3.07809L2.07369 4.24065L1.80467 5.88226C1.79836 5.92044 1.8024 5.95972 1.81632 5.99563C1.83024 6.03153 1.85349 6.06264 1.88344 6.08541C1.91338 6.10819 1.94882 6.12172 1.98573 6.12448C2.02265 6.12723 2.05956 6.1191 2.09229 6.10101L3.50001 5.32597L4.90774 6.10101C4.94617 6.12243 4.9908 6.12957 5.03357 6.12178C5.14143 6.1023 5.21395 5.9952 5.19536 5.88226L4.92633 4.24065L6.06503 3.07809C6.09602 3.04628 6.11648 3.00474 6.12268 2.9593C6.13942 2.84571 6.06379 2.74055 5.95531 2.72367Z"
                  fill="#2524E9"
                />
              </svg>
            </div>
            <div class="result__info__data__rates__rate">
              {{
                (
                  data.UserBookRate.reduce((acc, { rate }) => acc + rate, 0) /
                  data.UserBookRate.length
                ).toFixed(1)
              }}
              / 6
            </div>
          </div>
        </div>
      </div>
      <div class="result__description">
        <div class="result__places">
          <div class="result__places__room">
            <div class="icon">
              <svg
                width="27"
                height="27"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 6V21H3V19H5V3H14V4H19V19H21V21H17V6H14ZM10 11V13H12V11H10Z"
                  fill="#F59B66"
                />
              </svg>
            </div>
            <router-link :to="`/rooms/${data.room}`" class="text">
              {{ capitalize(polishTranslate[data.room]) }}
            </router-link>
          </div>
          <div class="result__places__place">
            <div class="icon">
              <svg
                width="27"
                height="27"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                  fill="#F59B66"
                />
                <path
                  d="M13 4.069V2H11V4.069C9.2403 4.29368 7.60497 5.09617 6.35057 6.35057C5.09617 7.60497 4.29368 9.2403 4.069 11H2V13H4.069C4.29335 14.7598 5.09574 16.3953 6.3502 17.6498C7.60466 18.9043 9.24017 19.7066 11 19.931V22H13V19.931C14.7599 19.7068 16.3955 18.9045 17.65 17.65C18.9045 16.3955 19.7068 14.7599 19.931 13H22V11H19.931C19.7066 9.24017 18.9043 7.60466 17.6498 6.3502C16.3953 5.09574 14.7598 4.29335 13 4.069V4.069ZM12 18C8.691 18 6 15.309 6 12C6 8.691 8.691 6 12 6C15.309 6 18 8.691 18 12C18 15.309 15.309 18 12 18Z"
                  fill="#F59B66"
                />
              </svg>
            </div>
            <span class="text" @click="searchByRooms(data.room, data.place)">
              {{ capitalize(polishTranslate[data.place]) }}
            </span>
          </div>
        </div>
        <p>
          {{ data.description }}
        </p>
      </div>
      <div class="result__tags">
        <Checkbox
          v-for="tag in data.BookTag"
          :key="tag.tagName"
          :text="tag.tagName"
          :check="false"
          @click="searchByTag(tag.tagName)"
        />
      </div>
      <Button text="Szukaj więcej" @click="$router.push({ path: '/search' })" />
    </div>
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
import { polishTranslate } from "../data";
export default defineComponent({
  components: {
    BackButton,
    Checkbox,
    RateModal,
    Modal,
    LoadingModal,
    Button
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  setup(prp) {
    interface Book {
      id: number;
      rates: number[];
      tags: string[];
      name: string;
      author: string;
      img: string;
      slug: string;
      room: string;
      place: string;
      series: string;
      description: string;
    }
    let data = reactive({} as Book);

    const router = useRouter();
    const route = useRoute();

    const store = useStore();
    const rateModal = ref(false);

    function capitalize(val: string) {
      return val.slice(0, 1).toUpperCase() + val.slice(1);
    }

    //Search book
    data = store.state.results.find(
      (item: object & { slug: string }) => item.slug === prp.slug
    );

    const loading = ref(false);
    //Rate book
    async function rateBook(rate: number) {
      rateModal.value = false;
      loading.value = true;
      try {
        await axios.put("/api/books/rate", {
          rate: rate,
          id: data.id
        });
        store.dispatch("setModal", {
          show: true,
          type: "success",
          message: "Dziękujemy za opinię!"
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

    //Bookmark book
    const activeBookmark = ref(route.path.startsWith("/dashboard/library"));
    async function manageUserLibrary() {
      const requestData = {
        url: "/api/books/bookmark",
        message: "Dodano książkę do biblioteki."
      };
      if (activeBookmark.value) {
        requestData.url = "/api/users/deleteFromLibrary";
        requestData.message = "Usunięto książkę z biblioteki.";
      }

      loading.value = true;
      try {
        await axios.put(requestData.url, {
          id: data.id
        });
        store.dispatch("setModal", {
          show: true,
          type: "success",
          message: requestData.message
        });
        activeBookmark.value = requestData.message.startsWith("Dodano") && true;
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

    if (!data) {
      router.push({ path: "/" });
      router.go(-1);
    }

    onMounted(() => {
      window.scrollTo(0, 0);
    });

    return {
      data,
      capitalize,
      rateModal,
      rateBook,
      manageUserLibrary,
      activeBookmark,
      searchByTag,
      searchBySeries,
      searchByRooms,
      searchByAuthor,
      loading,
      polishTranslate
    };
  }
});
</script>

<style lang="scss" scoped>
.result {
  &__container {
    @include flex;
    position: relative;
    flex-flow: column wrap;
    padding: 80px 0 100px 0;
    width: 85vw;
    max-width: 400px;
  }

  &__bookmark {
    position: absolute;
    top: 20px;
    right: 0;
    cursor: pointer;

    path {
      stroke: $inactive-color;
    }

    &--active path {
      fill: $inactive-color;
    }
  }

  &__star {
    position: absolute;
    top: 20px;
    right: 50px;
    cursor: pointer;
  }

  &__info {
    @include flex(space-between);
    min-width: 80%;
    max-width: 95%;

    &__image {
      width: 40vw;
      max-width: 125px;
      height: 187px;
      border-radius: 10px;
      background-position: center center;
      background-size: cover;
      margin-right: 30px;
    }

    &__data {
      @include flex(center, flex-start);
      flex-flow: column wrap;
      max-width: 50%;
      .checkbox {
        font-size: 0.8rem;
        margin: 5px 0 8px 0;
        padding: 6px 12px;
        border: 2px solid #f59b66;
      }

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

      &__rates {
        margin-top: 11px;
        background-color: rgba($main-color, 0.3);
        @include flex;
        font-weight: 600;
        font-size: 0.7rem;
        color: $main-color;
        padding: 2px 14px 2px 10px;
        border-radius: 13px;

        &__star {
          margin-right: 3px;
          transform: translateY(1.2px);
        }
      }
    }
  }

  &__description {
    border-top: 2px solid lightgray;
    color: gray;
    width: 100%;
    margin-top: 25px;

    p {
      padding: 0 10px;
      font-size: 0.95rem;
      line-height: 1.35rem;
    }
  }

  &__places {
    width: 100%;
    @include flex(space-between);

    &__place {
      flex-flow: row-reverse nowrap;
    }
    &__room,
    &__place {
      @include flex;
      margin: 14px 0 8px 0;
      .icon {
        margin: 0 8px;
      }

      .text {
        font-weight: 600;
        font-size: 0.8rem;
        color: #000;
        letter-spacing: 0.7px;
        transform: translateY(-2px);

        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }

  &__tags {
    margin-top: 20px;
  }
}

@media all and (min-width: 700px) {
  .result {
    &__background {
      width: 100vw;
      min-height: 100vh;
      @include flex;
      background-image: url("https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHw%3D&w=1000&q=80");
      background-size: cover;
    }

    &__container {
      backdrop-filter: blur(20px);
      padding: 80px 20px 40px 20px;
      color: #fff;
      margin: 40px;
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

  nav {
    display: none;
  }
}
</style>
