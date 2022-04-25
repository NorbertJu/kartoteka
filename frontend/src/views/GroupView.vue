<template>
  <div class="groups main">
    <template v-if="!id">
      <div class="flex">
        <h1>Skupiny</h1>
        <button class="newButton" v-on:click="newGroup()">+ Nová</button>
      </div>
      <Table :header="header" :data="groups" :onClick="openGroup" />
    </template>
    <template v-else>
      <Group 
        :name="name" 
        :manager="manager" 
        :members="members"
        :isMember="isMember"
        :users="users" 
        :edit="edit"
        :canEdit="canEdit"
        :onEdit="onEdit"
        :onUpdate="onGroupUpdate" 
        :onCancel="onEditCancel" 
        :onDelete="onGroupDelete"
        :onMemberClick="onMemberClick"
        :onAccept="onAccept"
        :onReject="onReject"
        :assignments="assignments"
        :assign="assign"
        :onAssign="onAssign"
        :onAssignUpdate="onAssignUpdate"
        :onAssignCancel="onAssignCancel"
        :documents="documents"
        :onAssignmentClick="onAssignmentClick"
      />
    </template>
  </div>
</template>

<script>
import Table from '../components/Table.vue'
import Group from '../components/Group.vue'

export default {
  name: 'GroupView',
  components: {
    Table,
    Group
  },
  data() {
    return {
      groups: [],
      header: {
        status: {
          label: "Status",
          width: 10,
          align: "center",
        },
        name: {
          label: "Názov",
          width: 45,
        },
        manager: {
          label: "Manažér",
          width: 45,
        },
      },
      name: '',
      manager: '',
      isMember: false,
      members: [],
      users: [],
      edit: false,
      canEdit: false,
      assignments: [],
      assign: false,
      documents: [],
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
  },
  methods: {
    async getGroups() {
      try {
        const response = await this.$api.getGroups();
        const data = response.data.map(res => ({
          name: res.name,
          manager: `${res.manager_id?.name} (${res.manager_id?.email})`,
          status: window.localStorage.getItem('user') == res.manager_id.name ? 'Manažér' : res.members.filter(member => member.member.name == window.localStorage.getItem('user'))[0]?.active ? "Člen" : "",
          _id: res._id
        }))
        this.groups = data
      } catch (err) {
        console.log(err)
      }
    },
    async getGroup() {
      try {
        if (this.id != 'new') {
          const response = await this.$api.getGroup(this.id);
          this.name = response.data?.name
          this.manager = response.data?.manager_id?.name
          this.members = response.data?.members.map(m => ({
            name: m.member.name,
            email: m.member.email,
            active: m.active,
            _id: m.member._id
          }))
          this.isMember = this.members?.filter(member => member.name == window.localStorage.getItem('user'))[0]?.active
        }
        await this.getAssignments(); 
      } catch (err) {
        console.log(err)
      }
    },
    async getGroupEdit() {
      try {
        if (this.id == 'new') {
          this.canEdit = true
        } else {
          const response = await this.$api.getGroupEdit(this.id)
          this.canEdit = response.data?.canEdit
        }
      } catch (err) {
        console.log(err)
      }
    },
    async getUsers() {
      try {
        const response = await this.$api.getUsers();
        let users = []
        for (let user of response.data) {
          let found = false
          for (let member of this.members) {
            if (user._id == member._id) {
              users.push({...member, added: true})
              found = true
              break;
            }
          }
          if (!found) {
            users.push({...user, added: false})
          }
        }
        this.users = users
      } catch (err) {
        console.log(err)
      }
    },
    async getDocuments() {
      try {
        const response = await this.$api.getDocuments();
        let documents = []
        for (let document of response.data) {
          let found = false
          for (let assignment of this.assignments) {
            if (assignment.document_id == document._id) {
              documents.push({...document, added: true, date_from: assignment.date_from, date_to: assignment.date_to})
              found = true
              break;
            }
          }
          if (!found) {
            documents.push({...document, added: false})
          }
        }
        this.documents = documents
      } catch (err) {
        console.log(err)
      }
    },
    async getAssignments() {
      try {
        const response = await this.$api.getAssignments(this.id);
        this.assignments = response.data.map(assignment => ({
          ...assignment,
          date_from: new Date(assignment.date_from).toISOString().slice(0, 10),
          date_to: new Date(assignment.date_to).toISOString().slice(0, 10),
          name: assignment.document_id.name,
          author: assignment.document_id.author,
          document_id: assignment.document_id._id,
        }))
      } catch (err) {
        console.log(err)
      }
    },
    async onGroupUpdate(data) {
      try {
        if (this.id == 'new') {
          const response = await this.$api.createGroup(data)
          this.$router.push({name: 'groupId', params: { id: response.data?._id }})
        } else {
          await this.$api.updateGroup({...data, id: this.id})
        }
        this.edit = false
        this.getGroups()
        this.getGroup()
      } catch (err) {
        console.log(err)
      }
    },
    async onAssignUpdate(data) {
      try {
        await this.$api.updateAssignments({documents: data, group_id: this.id})
        this.assign = false
        this.getGroup()
      } catch (err) {
        console.log(err)
      }
    },
    async onMemberClick(id) {
      try {
        await this.$api.updateMember({id: this.id})
      } catch (err) {
        console.log(err)
      }
    },
    onEditCancel() {
      this.edit = false
      if (this.id == 'new') {
        this.$router.push({name: 'group'})
      }
    },
    onAssignCancel() {
      this.assign = false
    },
    async onGroupDelete() {
      try {
        await this.$api.deleteGroup(this.id)
        await this.getGroups()
        this.$router.push({name: 'group'})
      } catch (err) {
        console.log(err)
      }
    },
    async onEdit() {
      this.edit = true;
      await this.getUsers();
    },
    async onAssign() {
      this.assign = true;
      await this.getDocuments();
    },
    newGroup() {
      this.edit = true;
      this.$router.push({name: 'groupId', params: { id: 'new' }})
    },
    openGroup(id) {
      this.$router.push({name: 'groupId', params: { id: id }})
    },
    onAssignmentClick(id, row) {
      if (this.canEdit) {
        this.$router.push({name: 'progressId', params: { id: id }})
      } else {
        this.$router.push({name: 'documentId', params: { id: row?.document_id }})
      }
    },
    async onAccept() {
      try {
        const updatedMembers = this.members.map(member => {
          if (member.name == window.localStorage.getItem('user')) {
            member.active = true
          }
          return {
            member: member._id,
            active: member.active
          }
        })
        await this.$api.updateGroup({members: updatedMembers, id: this.id})
        this.getGroups()
        this.getGroup()
      } catch (err) {
        console.log(err)
      }
    },
    async onReject() {
      try {
        const updatedMembers = this.members.filter(member => member.name != window.localStorage.getItem('user')).map(member => ({
          member: member._id,
          active: member.active
        }))
        await this.$api.updateGroup({members: updatedMembers, id: this.id})
        this.getGroups()
        this.$router.push({name: 'group'})
      } catch (err) {
        console.log(err)
      }
    },
  },
  watch: {
    id: {
      handler: async function(id) {
        if (id && this.$route.name == 'groupId') {
          this.getGroup();
          this.getGroupEdit();
        } else {
          this.name = ''
          this.manager = ''
          this.members = []
          this.edit = false
          this.assign = false
        }
      },
      immediate: true
    },
    canEdit: {
      handler: function(canEdit) {
        if (!canEdit) {
          this.edit = false
        }
      },
      immediate: true
    }
  },
  created() {
    this.getGroups()
  },
}
</script>

<style>
.newButton {
    outline: none;
    border: 1px solid rgb(20, 165, 223);
    border-radius: 20px;
    padding: 10px;
    background-color: white;
    color: rgb(20, 165, 223);
  }

  .newButton:hover {
    cursor: pointer;
    border: 1px solid white;
    background-color: rgb(20, 165, 223);
    color: white;
  }

  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>