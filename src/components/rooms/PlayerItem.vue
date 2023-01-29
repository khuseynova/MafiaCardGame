<template>
  <img src="../../assets/game_room/mafiaUser.jpeg" alt="userIcon" class="playerI">
</template>

<script>
export default {
  props: ["players"],
  data() {
    return {
      nbPlayers: this.players
    };
  },
}
</script>

<style scoped>
.playerI{
  border-radius: 50%;
  width: 7%;
  height: 3%;
}
</style>