<template>
  <main class="management">
    <h1 class="title">Otrzymane prośby</h1>
    <div class="requests">
      <div class="request" v-for="request in requests" :key="request.id">
        <div class="request__info">
          <div class="request__info__avatar">
            {{ request.name ? request.name[0] : "" }}
          </div>

          <div class="request__info__name">
            {{ request.name }}
          </div>

          <div class="request__info__email">
            {{ request.email }}
          </div>
        </div>
        <button @click="handleAcceptRequest(request.id)">Akceptuj</button>
        <button @click="handleRejectRequest(request.id)">Odrzuć</button>
      </div>
      {{ requests }}
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUser } from "../../utils/composable/useUser";

export default defineComponent({
  name: "Admin",
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
    font-size: 1.65rem;
  }

  .requests {
    @include flex;
    padding: 1.5rem 0;
    flex-flow: column wrap;
    width: 100%;
    border-radius: 20px;
    position: relative;
    max-width: 600px;
    gap: 2rem;

    .request {
      &__info {
        @include flex;
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
        }

        &__name {
          font-weight: 600;
          font-size: 1.1rem;
          line-height: 1.5rem;
          margin: 0 1.3rem 0 0.7rem;
        }

        &__email {
          font-size: 0.9rem;
        }
      }
    }
  }
}

@media all and (min-width: 700px) {
  .management .requests {
    box-shadow: var(--primary-shadow);
    margin-top: 30px;
  }
}
</style>
