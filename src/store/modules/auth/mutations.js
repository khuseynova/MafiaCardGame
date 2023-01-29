export default {
  setUser(state, payload) {

    //CANT ACCESS TO USERNAME IN USER.DATA
    state.user.data = payload.user;
    state.user.token = payload.token ?? localStorage.getItem('authToken');
    //state.user.nickName = state.user.data.nickname;

    localStorage.removeItem('guest');
    localStorage.removeItem('guestToken');
    if(!localStorage.getItem('authToken')) 
      localStorage.setItem('authToken', payload['token']);
  },

  removeUser(state) {
    state.user.data = {};
    state.user.token = '';
    state.user.room_id = ''
  },

  addUserToRoom(state, room_id) {
    state.user.room_id = room_id;
  }
}