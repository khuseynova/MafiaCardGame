// import axiosClient from "@/axios";
import axiosClient from "../../../axios.js";

export default {
  async createGuest(context) {
    const response = await axiosClient.post('/guest');

//    console.log(response);

    context.commit('setGuest',response['data']);
    // console.log(this.$state.rootGetters.getGuestData);
    
  },

  async getGuestByToken(context) {
    const config = {
      headers: {
        AuthToken: localStorage.getItem('guestToken'),
      }
    }

    const response = await axiosClient.get('/guest/token',config);
    context.commit('setGuest',response['data']);
    context.commit('addGuestToRoom', response['data']['guest']['room_id']);
  }
}