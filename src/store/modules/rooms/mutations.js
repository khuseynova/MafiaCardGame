export default {
  addRoom(state, payload) {
    state.rooms.push(payload);
  },
  setRooms(state,payload) {
    state.rooms = payload;
  }
}