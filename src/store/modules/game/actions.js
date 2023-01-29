import axiosClient from "../../../axios.js";
import router from '../../../router.js';

export default {
    async getRoom(context, pin) {
        const config = {
            headers: {
                AuthToken: localStorage.getItem('guestToken'),
            }
        }

        let auth = this.getters.isAuthenticated;
        let id = router.currentRoute.value.params.id;
        
        const response = await axiosClient
            .get(`/${auth ? 'user' : 'guest'}/room/show/${id}/${auth ? pin : ''}`,config);
        
        context.commit('setGame', response['data']['room']);
        context.commit('setUsersToGame', response['data']['users']);
        context.commit('setGuestsToGame', response['data']['guests']);
        
        return response['data'];
    }
}