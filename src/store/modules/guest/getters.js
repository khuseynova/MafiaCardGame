export default {
  getGuestData(state) {
    return state.guest.data;
  },
  getGuestRoomId(state) {
    return state.guest.room_id
  },
  getGuestId(state) {
    return state.guest.data.id
  }
}