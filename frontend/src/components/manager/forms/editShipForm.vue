<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

  <Teleport to="#modal">
    <div class="modal-bg">
      <div class="modal p-10 rounded-md shadow-md bg-purple-basic dark:bg-black-light" v-motion-fade>
        <font-awesome-icon class="close-popup text-black-light dark:text-white-text" icon="fa-solid fa-xmark" @click="TogglePopup(); update(current.id, current)"/>
      <h1 class="font-bold text-black-text dark:text-white-text">Edit Ship</h1>
      <form class="w-full max-w-sm">
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-black-light dark:text-white-text md:text-right mb-1 md:mb-0 pr-4" for="name">
              Ship name
            </label>
          </div>
          <div class="md:w-2/3">
            <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                id="name"
                type="text"
                v-model="current.name">
          </div>
        </div>

        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-black-light dark:text-white-text md:text-right mb-1 md:mb-0 pr-4" for="status">
              Status
            </label>
          </div>
          <div class="md:w-2/3">
            <select v-model="current.status">
              <option v-for="status in statuses" :value="status" :key="status.id">{{ status.status }}</option>
            </select>
          </div>
        </div>

        <div class="md:flex md:items-center">
          <button class="shadow bg-blue-regular w-full mt-2 text-black-light dark:text-white-text font-bold py-2 px-4 rounded-md"
                  type="button"
                  @click="TogglePopup(); update(current.id, current)">
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
  </Teleport>
</template>

<script>
import ShipService from "@/services/ship.service";
import {Ship, status} from "@/models/ship"
import {toRaw} from "vue";

export default {
  name: "editUserForm",
  props: ['TogglePopup', 'ship'],

  data() {
    return {
      current: this.ship,
      statuses: status
    }
  },

  methods: {
    update(ship_id, current) {
      ShipService.updateShip(ship_id, toRaw(current))
    },
  },
}
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 5%;
}

label {
  width: 100%;
  text-align: center;
}

input {
  width: 100%;
  padding: 1%;
}

input:focus {
  border: 2px solid black;
}

select {
  width: 100%;
  padding: 1%;
}


</style>