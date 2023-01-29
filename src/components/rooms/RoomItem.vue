<template>
  <!-- component -->
  <div class="ml-36 w-full lg:w-5/6">
    <div class="bg-white opacity-90 my-6 shadow-md shadow-red-600">
      <table class="min-w-max w-full table-auto">
        <tbody class="text-gray-600 text-sm font-light">
          <tr class="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
            <td class="w-1/4 py-3 px-6">
              <div class="flex justify-center">
                <span class="font-medium">{{ roomName }}</span>
              </div>
            </td>
            <td class="w-1/4 py-3 px-6">
              <div class="flex justify-center">
                <span>{{ type }}</span>
              </div>
            </td>
            <td class="w-1/4 py-3 px-6">
              <div class="flex justify-center">
                <span>{{ nbPlayers }}</span>
              </div>
            </td>
            <td class="w-1/4 py-3 px-6 text-center">
              <router-link :to="{ name: 'room', params: { id: roomId } }">
                <button
                    class="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-white py-3 px-5 bg-red-800 rounded hover:bg-gray-300 hover:text-red-800 hover:font-extrabold focus:outline-none"
                >
                  Join game
                </button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "players", "typeOfRoom", "roomId"],
  data() {
    return {
      roomName: this.name,
      nbPlayers: this.players,
      type: this.typeOfRoom,
    };
  },
};
</script>
