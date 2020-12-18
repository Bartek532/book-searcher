<template>
  <div class="choose__rooms">
    <Button text="Pokaż wszystko" class="rooms__btn" @click="searchBooks" />
    <div class="rooms">
      <Field
        v-for="room in rooms"
        :label="room"
        :key="room"
        class="room__field"
        @click="$router.push({ path: `/rooms/${room}` })"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Field from "../../components/Field.vue";
import Button from "../../components/inputs/Button.vue";
import { rooms } from "../../data";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  components: {
    Field,
    Button
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    function searchBooks() {
      store.dispatch("searchByRooms");
      router.push({ path: "/results" });
    }
    return { rooms, searchBooks };
  }
};
</script>

<style lang="scss" scoped>
.choose__rooms {
  min-height: 100vh;
  padding: 70px 0;
  @include flex;
  flex-flow: column wrap;

  button {
    transform: translateY(-40px);
  }

  .rooms {
    flex-wrap: wrap;
    @include flex;
    padding-bottom: 30px;
  }
}

@media all and (min-width: 1000px) {
  button {
    transform: translateY(-70px);
  }
}
</style>
