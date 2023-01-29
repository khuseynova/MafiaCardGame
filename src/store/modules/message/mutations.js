export default {
    addMessage(state, message) {
        state.messages.push(message);
    },
    setMessages(state, messages) {
        state.messages = messages;
    }
}