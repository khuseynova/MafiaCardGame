import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  state() {
    return {
      game: {},
      players: {
          users: [],
          guests: []
      },
      firstTwoSeconds: false,
      chattingOpened: false,
      chattingEnabled: false
    };
  },
  mutations,
  actions,
  getters,
}