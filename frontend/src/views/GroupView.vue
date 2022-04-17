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
        :users="users" 
        :edit="edit"
        :canEdit="canEdit"
        :onEdit="onEdit"
        :onUpdate="onGroupUpdate" 
        :onCancel="onEditCancel" 
        :onDelete="onGroupDelete"
        :onMemberClick="onMemberClick"
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
        active: {
          label: "Člen",
          width: 10,
          align: "center",
          noFilter: true,
          type: "check"
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
      members: [],
      users: [],
      edit: false,
      canEdit: false,
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
          members: res.members,
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
        }
        await this.getUsers();
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
    async onGroupDelete() {
      try {
        await this.$api.deleteGroup(this.id)
        await this.getGroups()
        this.$router.push({name: 'group'})
      } catch (err) {
        console.log(err)
      }
    },
    onEdit() {
      this.edit = true;
    },
    newGroup() {
      this.edit = true;
      this.$router.push({name: 'groupId', params: { id: 'new' }})
    },
    openGroup(id) {
      this.$router.push({name: 'groupId', params: { id: id }})
    },
  },
  watch: {
    id: {
      handler: async function(id) {
        if (id) {
          this.getGroup();
          this.getGroupEdit();
        } else {
          this.name = ''
          this.manager = ''
          this.members = []
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