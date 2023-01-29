import axiosClient from "../../../axios.js";

export default {
  async createRoom(context, payload) {
    const response = await axiosClient.post('/room/create',payload);
    if( response.status !== 200 || response['data']['room'] === null ) {
      const error = new Error(responseData.message || 'Failed to send room add request');
      throw error;
    }
    return response['data'];
  },
  async fetchRooms(context, isLoggedIn) {
    const config = {
      headers: {
        AuthToken: localStorage.getItem('guestToken'),
      }
    }
    
    const response = await axiosClient.get(`/${isLoggedIn ? 'user' : 'guest'}/room/show`,config);

    if( response.status === 200 && response['data']['room'] !== null ) {
      context.commit('setRooms', response['data']);
    } else {
      const error = new Error(responseData.message || 'Failed to send request.');
      throw error;
    } 
  }
}