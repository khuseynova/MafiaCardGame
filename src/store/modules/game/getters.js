export default {
    getGame(state) {
        return state.game;
    },
    getPlayers(state) {
        return state.players;
    },
    getFirstTwoSeconds(state) {
        return state.firstTwoSeconds;
    },
    getChattingOpen(state) {
        return state.chattingOpened;
    },
    getChattingEnabled(state) {
        return state.chattingEnabled;
    }
}