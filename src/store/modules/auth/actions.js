//Implementation of autologout function ???
//let timer;
import axiosClient from "../../../axios.js";

export default {
  async signUp(context, payload) {

    const config = {
      headers: {
        AuthToken: localStorage.getItem('guestToken'),
      }
    }

    const response = await axiosClient.post('/register',payload,config);

    //console.log(re);
    context.commit('setUser',response.data);
    
  },
  async login(context, payload) {
    const config = {
      headers: {
        AuthToken: localStorage.getItem('guestToken'),
      }
    }
    const response = await axiosClient.post('/login',payload,config);

    context.commit('setUser',response.data);
    context.commit('addUserToRoom', response['data']['user']['room_id']);
  },

  async autoLogin(context) {
    const response = await axiosClient.get('/user');
    context.commit('setUser', response['data']);
    context.commit('addUserToRoom', response['data']['user']['room_id']);
  },
  async logout(context) {
    const response = await axiosClient.post('/logout');
    if( response.status !== 200 ) {
      const error = new Error('Failed to authenticate. Check your data.');
      throw error;     
    }
    
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    
    context.commit("removeUser");
    context.dispatch('createGuest');
  },
}