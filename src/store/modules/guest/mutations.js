export default {
  setGuest(state, payload) {
    state.guest.data = payload['guest'];
    state.guest.token = payload['token'] ?? localStorage.getItem('guestToken');
    if (!localStorage.getItem('guestToken'))
      localStorage.setItem('guestToken', payload['token']);
  },

  addGuestToRoom(state, room_id) {
    state.guest.room_id = room_id;
  }
}