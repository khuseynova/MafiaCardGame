<template>  
  <router-view></router-view>
</template>

<script>
import { onBeforeUnmount } from '@vue/runtime-core';
import SocketioServer from './services/socketio.js';
import axiosClient from './axios.js';

export default {

  created() {
    //this.$store.dispatch('autoLogin');
    SocketioServer.setupSocketConnection();
    if (!(localStorage.getItem('guestToken') || localStorage.getItem('authToken'))) 
      this.$store.dispatch('createGuest');
    if (localStorage.getItem('guestToken')) {
      this.$store.dispatch('getGuestByToken').then(() => {
        if (this.$store.getters.getGuestRoomId)
          this.$router.replace({name: 'room', params: {id: this.$store.getters.getGuestRoomId}});
      })
    }
    if (localStorage.getItem('authToken')) {
      this.$store.dispatch('autoLogin').then(() => {
        if (this.$store.getters.getRoomId)
          this.$router.replace({name: 'room', params: {id: this.$store.getters.getRoomId}});
      })
    }
  },
  beforeUnmount() {
    SocketioServer.disconnect();
  }
}
</script>

<style>

/* @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');*/
* {
  font-family: 'Bebas Neue';
}
</style>