<template>
  <div class="group">
    <template v-if="!edit && !assign" >
      <div class="flex">
        <h1>{{name}}</h1>
        <div v-if="canEdit">
          <button class="editButton" v-on:click="onEdit">Upraviť</button>
          <button class="editButton ml" v-on:click="onAssign">Priradiť dokument</button>
        </div>
        <div v-if="!canEdit">
          <button v-if="!isMember" class="editButton" v-on:click="onAccept">Potvrdiť</button>
          <button class="deleteButton" v-on:click="onReject">{{isMember ? 'Opustiť' : 'Zamietnuť'}}</button>
        </div>
      </div>
      <h2>{{manager}}</h2>
      <Table :header="membersHeader" :data="members" :onClick="() => {}" />
      <br>
      <Table :header="assignmentsHeader" :data="assignments" :onClick="onAssignmentClick" />
    </template>
    <template v-if="edit">
      <div class="inputs">
        <div class="inputGroup">
          <label for="name">Názov: </label>
          <input type="text" id="name" name="name" v-model="name">
        </div>
      </div>
      <Table :header="usersHeader" :data="filteredUsers" :onClick="onUserClick" />
      <div class="buttons">
        <button class="updateButton" v-on:click="onUpdate(getMembers())">{{id == 'new' ? 'Vytvoriť' : 'Aktualizovať'}}</button>
        <button class="cancelButton" v-on:click="onCancel">Zrušiť</button>
        <button v-if="id != 'new'" class="deleteButton" v-on:click="onDelete">Odstrániť</button>
      </div>
    </template>
    <template v-if="assign">
      <h2>Dokumenty</h2>
      <Table :header="documentsHeader" :data="filteredDocuments" :onClick="onDocumentClick" />
      <div class="buttons">
        <button class="updateButton" v-on:click="onAssignUpdate(getAssignments())">Aktualizovať</button>
        <button class="cancelButton" v-on:click="onAssignCancel">Zrušiť</button>
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
    isMember: Boolean,
    users: Array,
    edit: Boolean,
    canEdit: Boolean,
    onEdit: Function,
    onUpdate: Function,
    onCancel: Function,
    onDelete: Function,
    onAccept: Function,
    onReject: Function,
    assignments: Array,
    assign: Boolean,
    onAssign: Function,
    onAssignUpdate: Function,
    onAssignCancel: Function,
    documents: Array,
    onAssignmentClick: Function,
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
      documentsHeader: {
        added: {
          label: "Priradený",
          width: 10,
          align: "center",
          noFilter: true,
          type: "check"
        },
        name: {
          label: "Názov",
          width: 35,
        },
        author: {
          label: "Autor",
          width: 35,
        },
        date_to: {
          label: "Dátom do",
          width: 20,
          type: "date",
        }
      },
      assignmentsHeader: {
        name: {
          label: "Názov",
          width: 25,
        },
        author: {
          label: "Autor",
          width: 25,
        },
        date_from: {
          label: "Dátum od",
          width: 25,
        },
        date_to: {
          label: "Dátum do",
          width: 25,
        },
      },
      addedUsers: [],
      addedDocuments: []
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
    filteredDocuments() {
      let documents = this.documents.map(document => {
        if (this.addedDocuments.includes(document._id)) {
          return {
            _id: document._id,
            name: document.name,
            author: document.author,
            date_from: document.date_from,
            date_to: document.date_to,
            added: !document.added
          } 
        }
        return document
      })
      return documents
    },
  },
  methods: {
    getMembers() {
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
    getAssignments() {
      const today = new Date()
      let week = new Date()
      week.setDate(week.getDate() + 7)
      const newAssignments = this.filteredDocuments.filter(document => document.added).map(document => ({
        document_id: document._id,
        date_from: document.date_from ? new Date(document.date_from) : today,
        date_to: document.date_to ? new Date(document.date_to) : week
      }))
      this.addedDocuments = []
      return newAssignments
    },
    onUserClick(id) {
      if (this.addedUsers.includes(id)) {
        this.addedUsers = this.addedUsers.filter(user => user != id)
      } else {
        this.addedUsers.push(id)
      }
    },
    onDocumentClick(id, e) {
      if (e.target.tagName == "INPUT") {
        return
      }
      if (this.addedDocuments.includes(id)) {
        this.addedDocuments = this.addedDocuments.filter(document => document != id)
      } else {
        this.addedDocuments.push(id)
      }
    }
  }
}
</script>

<style scoped>
  .ml {
    margin-left: 10px;
  }

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
    margin: 10px 0 10px 10px;
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
    margin: 10px 0 10px 10px;
  }

  .deleteButton:hover{
    cursor: pointer;
    border: 1px solid white;
    background-color: rgb(210, 50, 50);
    color: white;
  }

</style>