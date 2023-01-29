<template>
  <section class="backgr">

    <div>
    <my-header></my-header>
  </div>
  <!--PROBLEMS WITH CSS-->
  <!--create ROOMFORM-->
  <!---->
  <div class="roomPage py-9">
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
    </base-dialog>

    <!--THIS IS BUTTON CSS FIX-->

    <!---->
    <div
      class="available italic text-white font-semibold shadow-xl shadow-white uppercase text-3xl w-96 mt-20 leading-normal"
    >
      <p class="text-center shadow-xl shadow-red-800">Available Rooms</p>
    </div>
    <base-card class="w-1/4 bg-white opacity-50">
      <section>
        <!-- <div> v-if="isLoggedIn" -->
          <button v-if="isLoggedIn && !room_id" class="bg-red-900 hover:bg-orange-500 text-white font-bold p-2 m-3 px-4 rounded" v-on:click="toggleFormModal">Create Room</button>
          <div v-else-if="room_id">You already have room</div>
          <div v-else><span>Want to Create Room?  </span><router-link class="underline" to="/auth/login">Login</router-link></div>
          <div v-if="showRoomForm">
            <room-form
              :show="showRoomForm"
              @close="toggleFormModal"
              @roomCreation="submitRoomData"
            ></room-form>
          </div>
      </section>
    </base-card>
    <!---->
    <base-spinner v-if="isLoading"></base-spinner>
    <div v-else-if="hasRooms && !isLoading">
      <table class="min-w-max w-5/6 ml-36 table-auto">
        <thead>
          <tr
            class="bg-gray-300 text-gray-800 uppercase text-sm leading-normal"
          >
            <th class="w-1/4 py-3">Room admin</th>
            <th class="w-1/4 py-3">Room type</th>
            <th class="w-1/4 py-3">Number of players</th>
            <th class="w-1/4 py-3">Join room</th>
          </tr>
        </thead>
      </table>
      <div class="scrollb">
        <section v-for="(room, index) in availableRooms" :key="index">
          <room-item
              :name="room.nickname"
              :players="room.number_of_players"
              :typeOfRoom="room.isPrivate ? 'private' : 'public'"
              :roomId="room.id"
          >
          </room-item>
        </section>
      </div>

    </div>
    <h3 v-else>THERE ARE NO AVAILABLE ROOMS :(</h3>
  </div>
  </section>
  
</template>

<script>
import RoomItem from "../components/rooms/RoomItem.vue";
import RoomForm from "../components/rooms/RoomForm.vue";

export default {
  components: {
    RoomItem,
    RoomForm,
  },
  data() {
    return {
      showRoomForm: false,
      rooms: [],
      isLoading: false,
      error: "",
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    availableRooms() {
      return this.$store.getters["rooms/rooms"];
    },
    hasRooms() {
      return this.$store.getters["rooms/hasRooms"];
    },
    room_id() {
      return this.$store.getters.getRoomId
    }
  },
  methods: {
    toggleFormModal() {
      this.showRoomForm = !this.showRoomForm;
    },
    submitRoomData(data) {
      const newRoom = {
        //room id must be given by the back end
        //id: 'id5',
        ...data,
      };
      this.toggleFormModal();
      this.$store.dispatch("rooms/createRoom", newRoom);
      //this.rooms.push(value);
    },
    async loadRooms(isLoggedIn) {
      this.isLoading = true;
      //console.log(load);
      try {
        await this.$store.dispatch("rooms/fetchRooms", this.isLoggedIn);
      } catch (error) {
        this.error = error.message || "Something failed!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.loadRooms();
  },
};
</script>

<style>
.available {
  margin-left: 39%;
  margin-top: 8.4%;
  
}

/* .roomPage{
  background-image: url("../assets/join_room/joinRoomBG1.jpg");
  background-size: cover;
  
} */

.backgr{
  background-image: url("../assets/join_room/joinRoomBG1.jpg");
  background-size: cover;
  height: 100vh;
}

.scrollb{
  height: 420px;
  overflow: scroll;
}

</style>
