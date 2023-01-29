export default {
  userId(state) {
    return state.user.data.id;
  },
  getUserToken(state) {
    return state.user.token;
  },
  isAuthenticated() {
    //if token exist will convert its value to bool
    return !!localStorage.getItem('authToken');
  },
  /*
  userName(state) {
    //console.log(state.user);
    //return state.user.data.firstname;
  }
  */
 getNickName() {
   return localStorage.getItem('nickname');
 },
 getRoomId(state) {
   return state.user.room_id;
 }
}