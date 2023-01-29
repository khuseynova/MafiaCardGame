import { io } from "socket.io-client";
import store from "../store/index";

class SocketioService {
  socket;
  constructor() { }

  setupSocketConnection() {
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);

    // this.socket.emit('my message', 'Hello there from Vue.');

    // this.socket.on('my broadcast', (data) => {
    //   console.log(data);
    // });
    
    this.socket.on('room-created', (room) => {
      if (store.getters.isAuthenticated || !room.isPrivate)
        store.commit('rooms/addRoom', room);
    });

    this.socket.on('room-joined', (player) => {
      player.token ? store.commit('addGuestToGame', player) 
                   : store.commit('addUserToGame', player)
    });

    this.socket.on('game-started', () => {
      store.commit('setFirstTwoSeconds', true);
    });

    this.socket.on('after-two-seconds', () => {
      store.commit('setFirstTwoSeconds', false);
    });

    this.socket.on('assign-roles', (players) => {
      store.commit('deleteUsers');
      this.shuffle(players);
      players.forEach(player => {
        if (player.token) store.commit('addGuestToGame', player);
        else store.commit('addUserToGame', player);
      });
    });

    this.socket.on('open-chatting', () => {
      store.commit('openChatting', true);
    });

    this.socket.on('message-print', (data) => {
      store.commit('addMessage', data);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
}

export default new SocketioService();