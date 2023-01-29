export default {
    setGame(state, payload) {
        state.game = payload
    },
    addUserToGame(state, player) {
        let present = false
        state.players.users.forEach(element => {
            if (element.id === player.id) present = true;
        });
        if (!present) state.players.users.push(player);
    },
    addGuestToGame(state, guest) {
        let present = false;
        state.players.guests.forEach(element => {
            if (element.id === guest.id) present = true;
        });
        if (!present) state.players.guests.push(guest);
    },
    setUsersToGame(state, users) {
        state.players.users = users;
    },
    setGuestsToGame(state, guests) {
        state.players.guests = guests;
    },
    deleteUsers(state) {
        state.players = {
            guests: [],
            users: [],
        }
    },
    setFirstTwoSeconds(state, bool) {
        state.firstTwoSeconds = bool;
    },
    openChatting(state, bool) {
        state.chattingOpened = bool;
        state.chattingEnabled = bool;
    },
    enableChatting(state, bool) {
        state.chattingEnabled = bool;
    }
}