<template>
  <main class="management">
    <Modal />
    <h1 class="title">Otrzymane prośby</h1>
    <div v-if="!requests.length" class="management__empty">
      <span class="bold">Pusto!</span> Wszystko na dzisiaj zrobione!
    </div>
    <div class="requests" v-else>
      <div class="request" v-for="request in requests" :key="request.id">
        <div class="request__info">
          <div class="request__info__avatar">
            {{ request.name ? request.name[0] : "" }}
          </div>

          <div class="request__info__wrapper">
            <div class="request__info__wrapper__name">
              {{ request.name }}
            </div>

            <div class="request__info__wrapper__email">
              {{ request.email }}
            </div>
          </div>
        </div>
        <div class="request__btns">
          <button
            @click="handleAcceptRequest(request.id)"
            class="request__btns__btn"
            title="Zaakceptuj"
          >
            <span class="sr-only">zaakceeptuj</span>
            <svg
              width="29"
              height="24"
              viewBox="0 0 38 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M31.8417 0.95646C32.4932 0.336199 33.3602 -0.00670681 34.2597 9.94157e-05C35.1592 0.00690564 36.0209 0.362892 36.663 0.992941C37.305 1.62299 37.6772 2.47782 37.701 3.37706C37.7247 4.27629 37.3983 5.1496 36.7904 5.81269L18.3367 28.8914C18.0194 29.2331 17.6364 29.5074 17.2107 29.6978C16.7849 29.8882 16.3252 29.9908 15.8589 29.9994C15.3926 30.008 14.9293 29.9226 14.4969 29.7481C14.0644 29.5736 13.6715 29.3137 13.3417 28.9839L1.10402 16.7462C0.763222 16.4286 0.489876 16.0456 0.300289 15.6202C0.110701 15.1947 0.00875743 14.7353 0.000539827 14.2696C-0.00767777 13.8038 0.0779995 13.3412 0.252459 12.9093C0.426918 12.4774 0.686585 12.085 1.01597 11.7556C1.34536 11.4262 1.73771 11.1666 2.16963 10.9921C2.60155 10.8177 3.06418 10.732 3.52993 10.7402C3.99568 10.7484 4.455 10.8504 4.8805 11.0399C5.30599 11.2295 5.68894 11.5029 6.0065 11.8437L15.6912 21.5238L31.7538 1.05821C31.7827 1.0226 31.8136 0.988632 31.8463 0.95646H31.8417Z"
                fill="#52b788"
              />
            </svg>
          </button>
          <button
            @click="handleRejectRequest(request.id)"
            class="request__btns__btn"
            title="Odrzuć"
          >
            <span class="sr-only">odrzuć</span>
            <svg
              width="25"
              height="25"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30.7263 25.1013L21.6251 16L30.7263 6.89877C30.9007 6.72224 30.9985 6.4841 30.9985 6.23596C30.9985 5.98782 30.9007 5.74967 30.7263 5.57315L26.4269 1.27377C26.34 1.18652 26.2367 1.11729 26.123 1.07006C26.0092 1.02282 25.8873 0.998505 25.7641 0.998505C25.641 0.998505 25.519 1.02282 25.4053 1.07006C25.2915 1.11729 25.1882 1.18652 25.1013 1.27377L16.0001 10.375L6.8988 1.27377C6.72299 1.09802 6.48458 0.999284 6.23599 0.999284C5.9874 0.999284 5.74898 1.09802 5.57318 1.27377L1.2738 5.57315C1.18655 5.66007 1.11732 5.76337 1.07009 5.87711C1.02285 5.99085 0.998535 6.1128 0.998535 6.23596C0.998535 6.35912 1.02285 6.48107 1.07009 6.59481C1.11732 6.70855 1.18655 6.81185 1.2738 6.89877L10.3751 16L1.2738 25.1013C1.09805 25.2771 0.999314 25.5155 0.999314 25.7641C0.999314 26.0127 1.09805 26.2511 1.2738 26.4269L5.57318 30.7263C5.6601 30.8135 5.7634 30.8828 5.87714 30.93C5.99088 30.9772 6.11283 31.0015 6.23599 31.0015C6.35915 31.0015 6.4811 30.9772 6.59484 30.93C6.70858 30.8828 6.81188 30.8135 6.8988 30.7263L16.0001 21.625L25.1013 30.7263C25.2771 30.902 25.5155 31.0008 25.7641 31.0008C26.0127 31.0008 26.2511 30.902 26.4269 30.7263L30.7263 26.4269C30.8136 26.34 30.8828 26.2367 30.93 26.1229C30.9773 26.0092 31.0016 25.8872 31.0016 25.7641C31.0016 25.6409 30.9773 25.519 30.93 25.4052C30.8828 25.2915 30.8136 25.1882 30.7263 25.1013V25.1013Z"
                fill="#e5383b"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUser } from "../../utils/composable/useUser";
import Modal from "../../components/Modal.vue";

export default defineComponent({
  name: "Admin",
  components: {
    Modal,
  },
  setup() {
    const {
      getAllPendingAdminRequests,
      adminRequests,
      acceptAdminRequest,
      rejectAdminRequest,
    } = useUser();
    getAllPendingAdminRequests();

    const handleAcceptRequest = async (id: number) => {
      await acceptAdminRequest(id);
      await getAllPendingAdminRequests();
    };

    const handleRejectRequest = async (id: number) => {
      await rejectAdminRequest(id);
      await getAllPendingAdminRequests();
    };

    return {
      requests: adminRequests,
      handleAcceptRequest,
      handleRejectRequest,
    };
  },
});
</script>

<style lang="scss" scoped>
$imgKey: random(5);
$list: #bc4749, #2a9d8f, #b5838d, #ef476f, #118ab2;
$nth: nth($list, $imgKey);

.management {
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

  &__empty {
    font-size: 1.6rem;
    width: 100%;
    padding: 0 20px;
    max-width: 500px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 2.3rem;

    .bold {
      font-weight: bold;
      font-size: 1.8rem;
      display: block;
      margin-bottom: 0.5rem;
    }
  }

  .requests {
    @include flex;
    padding: 1.7rem 0;
    flex-flow: column wrap;
    width: 100%;
    border-radius: 20px;
    position: relative;
    max-width: 570px;
    gap: 1.6rem;

    .request {
      @include flex(space-between);
      width: 100%;
      gap: 1rem;

      &__info {
        @include flex(flex-start);
        width: 100%;
        gap: 1.5rem;

        &__avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          color: var(--white-100);
          font-weight: 600;
          font-size: 1.6rem;
          background-color: $nth;
          @include flex;
          flex: 0 0 50px;
        }

        &__wrapper {
          @include flex(flex-start);
          flex-wrap: wrap;
          gap: 0.1rem;
          &__name {
            font-weight: 600;
            font-size: 1.1rem;
            line-height: 1.5rem;
            margin-right: 1rem;
          }

          &__email {
            font-size: 0.9rem;
          }
        }
      }

      &__btns {
        @include flex;
        gap: 0.5rem;

        &__btn {
          background: transparent;
          border: 0 none;
          cursor: pointer;
        }
      }
    }
  }
}

@media all and (min-width: 400px) {
  .management .requests .request .request__btns {
    gap: 0.9rem;
  }
}

@media all and (min-width: 550px) {
  .management
    .requests
    .request
    .request__info
    .request__info__wrapper
    .request__info__wrapper__name {
    margin-right: 1.5rem;
  }
}

@media all and (min-width: 700px) {
  .management .requests {
    box-shadow: var(--primary-shadow);
    margin-top: 30px;
    padding: 1.7rem 2rem;
  }
}
</style>
