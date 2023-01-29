import { createStore } from "vuex";

import authModule from "./modules/auth";
import roomModule from "./modules/rooms";
import guestModule from "./modules/guest";
import gameModule from "./modules/game";
import messageModule from "./modules/message";

const store = createStore({
    modules: {
        auth: authModule,
        rooms: roomModule,
        guests: guestModule,
        game: gameModule,
        message: messageModule
    }
});

export default store;