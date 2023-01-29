import axiosClient from "../../../axios.js";

export default {
    async writeMessage(context, payload) {
        const response = await axiosClient.post('/message', payload);
        if (response.status !== 200 || response['data']['message'] === null) {
            const error = new Error(responseData.message || 'Failed to send room add request');
            throw error;
        }
    },

    async getMessages(context, id) {
        const response = await axiosClient.get('/message/'+id);
        if (response.status !== 200 || response['data'] === null) {
            const error = new Error(responseData.message || 'Failed to send room add request');
            throw error;
        }
        
        context.commit('setMessages', response['data']['messages']);
        
        return response['data']['messages'];
    }
}