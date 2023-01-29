export default {
  hasRooms(state) {
    return state.rooms.length > 0;
  },
  rooms(state) {
    // check with getters if room exists ???
    return state.rooms;
  }
}