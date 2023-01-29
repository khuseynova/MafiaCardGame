<template>
  <base-dialog v-bind:show="!!error" title="An error occurred"
    @close="handleError">
    <p>{{error }}</p>
  </base-dialog>

  <base-dialog :show="!!showForm" title="Room Creation Form">
    <form  class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="submitForm">
      <div class="mb-4">
        <!-- <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Room Name" v-model.trim="room.name" required> -->
        <p>Please provide number of players</p>
        <input type="number" class="border-2 rounded-md py-1 px-3 w-1/4" placeholder="Select" min="4" max="25" v-model.trim="room.number_of_players">
          <div v-if="v$.room.number_of_players.$errors.length" >
              <p v-for="e in v$.room.number_of_players.$errors" :key="e.$uid" class="text-red-700">
                {{e.$message}}
              </p>
          </div>

        <div class="mt-2"><p>Please select Room type:</p></div>
      
        <input type="radio" id="public" value="public" v-model="room.type" >
        <label for="public">Public </label><br>
        <input type="radio" id="private" value="private" v-model="room.type" >
        <label for="private">Private </label><br>

        <section v-show="isPublic">  

          <input id="result" class="shadow appearance-none border rounded w-7/10 py-2 px-3 text-gray-700 mb-3 leading-tight" type="number" min="0" placeholder="Room Pin Code" v-model.trim="room.PIN">
        

          <button type="button" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 m-3 px-4 rounded" @click="generatePinCode(4)"><div>Generate Pin Code</div></button>
          <div v-if="v$.room.PIN.$errors.length" >
              <p v-for="e in v$.room.PIN.$errors" :key="e.$uid" class="text-red-700">
                {{e.$message}}
              </p>
            </div>
          <!-- <p class="text-red-700" v-if="!isFormValid">Pin Code must contain at least 4 digital numbers</p> -->

        </section>
      </div>

      <div class="flex items-center justify-between">
        <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Create Room" required>
      </div>

    </form>
    <!-- <h4>{{roomName}}|{{nbPlayers}}|{{roompinCode}}|{{roomType}}</h4> -->
  </base-dialog>

</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, requiredIf, numeric, minValue, maxValue, minLength, maxLength } from '@vuelidate/validators'

export default {
  // emits: ['roomCreation'],//+close from 
  props: ['show'],
  setup () {
        return { v$: useVuelidate() }
      },
  data() {
    return {
      room: {  
        type: 'public',
        number_of_players: null,
        PIN: ''
      },
      showForm: this.show,
      isFormValid: true,
    }
  },
  validations(){
    return{
      room:{
        type: {required},
        PIN:{required:requiredIf(function() { return this.room.type === 'private' }), minLength:minLength(4), maxLength:maxLength(4)},
        number_of_players:{required, numeric, minValue:minValue(4), maxValue:maxValue(25)}
      }
    }
  },
  computed: {
    isPublic() {
      if(this.room.type === 'public') {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    generatePinCode(str_length){
      var result = "";
      var chars = "0123456789";
      for (var i = 0; i < str_length; i++){
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
      this.room.PIN = result;
    },
    submitForm() {
      this.isFormValid = true;
      this.v$.$validate();

      if(!this.v$.room.$errors.length) {
        const payload = {
          ...this.room,
          isPrivate: this.room.type === 'private' ? 1 : 0
        }
        if (payload.type === 'public') delete payload.PIN;
        delete payload.type;
        try {
          this.$store.dispatch('rooms/createRoom', payload)
            .then((data) => {
              this.showForm = false;
              this.$store.commit('setGame', data);
              this.$store.commit('addUserToGame', this.$store.state.auth.user.data);
              this.$router.replace(`/room/${data.id}`);
            });
        } catch(e) {
          this.error = e.message | 'Failed to create room'
          return;
        }
      } else {
        this.isFormValid = false
      }
    }
  }
}
</script>