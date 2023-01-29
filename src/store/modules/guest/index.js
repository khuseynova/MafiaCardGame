import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"


export default {
  state() {
    return {
      guest: {
        data: {},
        token: localStorage.getItem('guestToken'),
        room_id: ''
      }
    }
  },
  mutations,
  actions,
  getters,
}