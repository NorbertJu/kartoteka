<template>
  <div class="group">
    <template v-if="!edit" >
      <div class="flex">
        <h1>{{name}}</h1>
        <button v-if="canEdit" class="editButton" v-on:click="onEdit">Upraviť</button>
        <button v-if="!canEdit" class="editButton" v-on:click="onAccept">Potvrdiť</button>
      </div>
      <h2>{{manager}}</h2>
      <Table :header="membersHeader" :data="members" :onClick="() => {}" />
    </template>
    <template v-else>
      <div class="inputs">
        <div class="inputGroup">
          <label for="name">Názov: </label>
          <input type="text" id="name" name="name" v-model="name">
        </div>
      </div>
      <Table :header="usersHeader" :data="filteredUsers" :onClick="onUserClick" />
      <div class="buttons">
        <button class="updateButton" v-on:click="onUpdate(getData())">{{id == 'new' ? 'Vytvoriť' : 'Aktualizovať'}}</button>
        <button class="cancelButton" v-on:click="onCancel">Zrušiť</button>
        <button v-if="id != 'new'" class="deleteButton" v-on:click="onDelete">Odstrániť</button>
      </div>
    </template>
  </div>
</template>

<script>
import Table from './Table.vue'

export default {
  name: 'Group',
  components: {
    Table
  },
  props: {
    name: String,
    manager: String,
    members: Array,
    users: Array,
    edit: Boolean,
    canEdit: Boolean,
    onEdit: Function,
    onUpdate: Function,
    onCancel: Function,
    onDelete: Function,
    onAccept: Function,
  },
  data() {
    return {
      membersHeader: {
        active: {
          label: "Člen",
          width: 10,
          align: "center",
          noFilter: true,
          type: "check"
        },
        name: {
          label: "Meno",
          width: 45,
        },
        email: {
          label: "Email",
          width: 45,
        },
      },
      usersHeader: {
        added: {
          label: "Pridaný",
          width: 10,
          align: "center",
          noFilter: true,
          type: "check"
        },
        name: {
          label: "Meno",
          width: 45,
        },
        email: {
          label: "Email",
          width: 45,
        },
      },
      addedUsers: []
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    filteredUsers() {
      let users = this.users.map(user => {
        if (this.addedUsers.includes(user._id)) {
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            active: user.active || false,
            added: !user.added
          } 
        }
        return user
      })
      return users
    },
  },
  methods: {
    getData() {
      const newMembers = this.filteredUsers.filter(user => user.added).map(user => ({
        member: user._id,
        active: user.active || false
      }))
      this.addedUsers = []
      return {
        name: this.name,
        members: newMembers
      }
    },
    onUserClick(id) {
      if (this.addedUsers.includes(id)) {
        this.addedUsers = this.addedUsers.filter(user => user != id)
      } else {
        this.addedUsers.push(id)
      }
    }
  }
}
</script>

<style scoped>
  h2 {
    margin-top: 0;
  }

  .inputs {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    color: rgb(20, 165, 223)
  }

  input {
    flex: 1;
    outline: none;
    border: none;
    border-bottom: 1px solid rgb(20, 165, 223);
    margin-bottom: 10px;
  }

  .inputGroup {
    display: flex;
  }

  .editButton {
    outline: none;
    border: 1px solid rgb(20, 165, 223);
    border-radius: 20px;
    padding: 10px;
    background-color: white;
    color: rgb(20, 165, 223);
  }

  .editButton:hover {
    cursor: pointer;
    border: 1px solid white;
    background-color: rgb(20, 165, 223);
    color: white;
  }

  .updateButton {
    outline: none;
    border: 1px solid rgb(20, 165, 223);
    border-radius: 20px;
    padding: 10px;
    background-color: white;
    color: rgb(20, 165, 223);
    margin: 10px 0;
  }

  .updateButton:hover {
    cursor: pointer;
    border: 1px solid white;
    background-color: rgb(20, 165, 223);
    color: white;
  }

  .cancelButton{
    outline: none;
    border: 1px solid rgb(160, 160, 160);
    border-radius: 20px;
    padding: 10px;
    background-color: white;
    color: rgb(160, 160, 160);
    margin: 10px;
  }

  .cancelButton:hover{
    cursor: pointer;
    border: 1px solid white;
    background-color: rgb(160, 160, 160);
    color: white;
  }

  .deleteButton{
    outline: none;
    border: 1px solid rgb(210, 50, 50);
    border-radius: 20px;
    padding: 10px;
    background-color: white;
    color: rgb(210, 50, 50);
    margin: 10px 0;
  }

  .deleteButton:hover{
    cursor: pointer;
    border: 1px solid white;
    background-color: rgb(210, 50, 50);
    color: white;
  }

</style>