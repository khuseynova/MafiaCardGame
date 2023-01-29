import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

export default {
  state() {
    return {
      user: {
        data: {},
        token: localStorage.getItem('authToken'),
        room_id: ''
      }
    }
  },
  mutations,
  actions,
  getters,
};