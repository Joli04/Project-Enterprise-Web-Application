<template>
  <div v-motion :delay="100"
       :enter="{ opacity: 1, y: 0, scale: 1 }"
       :initial="{ opacity: 0, y: 100 }"
       :variants="{ custom: { scale: 2 } }"
       class="mt-4 p-4">
    <div class="flex flex-row space-x-2">
      <button class="text-white bg-blue-regular font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white-text" @click="TogglePopup('buttonTriggerCreate')">Add user</button>
    </div>
    <div class="mt-4">
      <table class="text-center table-auto w-full text-black-text dark:text-white-text">
        <thead>
        <tr>
          <th scope="col" >Manager Id</th>
          <th scope="col" >Manager Name</th>
          <th scope="col" >Manager Email</th>
          <th scope="col" >Assigned Ship</th>
          <th></th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="manager in users" :key="manager.id" class="bg-purple-basic dark:bg-black-light">
          <td>{{ manager.id }}</td>
          <td >{{ manager.username }}</td>
          <td >{{ manager.email }}</td>
          <td >{{ getShipName(manager) }}</td>
          <td>
            <font-awesome-icon icon="fa-solid fa-trash" class="px-3 py-4 cursor-pointer" @click="deleteUser(manager.id)"/>
            <font-awesome-icon icon="fa-solid fa-pen-to-square" class="px-3 py-4 cursor-pointer" @click="TogglePopup('buttonTriggerEdit'); this.manager = manager"/>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>


  <edit-manger-form
      v-if="popupTrigger.buttonTriggerEdit"
      :TogglePopup="() => TogglePopup('buttonTriggerEdit')"
      :manager = this.manager
  />

  <create-manager-form
      v-if="popupTrigger.buttonTriggerCreate"
      :TogglePopup="() => TogglePopup('buttonTriggerCreate')"
  />

</template>

<script>
import UserService from "../../services/user.service";
import editMangerForm from "@/components/admin/forms/editMangerForm";
import createManagerForm from "@/components/admin/forms/createManagerForm";
import {isProxy, ref, toRaw} from 'vue';
import {library} from "@fortawesome/fontawesome-svg-core";
import {faTrash, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {useToast} from "vue-toastification";
library.add(faTrash, faPenToSquare)


export default {
  name: "ManagerTable",
  components: {
    editMangerForm,
    createManagerForm
  },

  created() {
    UserService.getUsersByRole("manager")
        .then(response => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
  },

  data() {
    return {
      users: [],
      ships: [],
      manager: null,
    }
  },

  setup(){
    const popupTrigger = ref({
      buttonTriggerEdit: false,
      buttonTriggerCreate: false
    });

    const TogglePopup = (trigger) => {
      popupTrigger.value[trigger] = !popupTrigger.value[trigger]
    };

    const toast = useToast();

    return {
      popupTrigger,
      TogglePopup,
      toast
    }
  },

  methods: {
    getShipName(user) {
      if (user.ship === null || user.ship === undefined){
        return "No ship assigned";
      }
      return toRaw(user.ship.name);
    },

    toggle(manager){
      this.manager = manager
    },

    deleteUser(user_id){
      if (confirm("Are you sure you want to delete this manager?")) {
        UserService.deleteUser(user_id).then(response => {
          console.log(response)
        }).catch(e => {
          console.log(e)
        })
      }
    },

  }
}
</script>

<style scoped>
table {
  border-collapse: separate;
  border-spacing: 0 10px;
}

td:first-child {
  border-radius: 10px 0 0 10px;
}

td:last-child {
  border-radius: 0 10px 10px 0;
}

</style>
