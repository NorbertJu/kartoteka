<template>
  <div class="main home">
    <h1>Vitaj v kartotéke!</h1>
    <h2>Priradené dokumenty</h2>
    <Table :header="header" :data="documents" :onClick="openDocument" />
  </div>
</template>

<script>
import Table from '../components/Table.vue'

export default {
  name: 'HomeView',
  components: {
    Table
  },
  data() {
    return {
      documents: [],
      header: {
        progress: {
          label: "Postup (%)",
          width: 10,
          align: "center",
          noFilter: true,
        },
        name: {
          label: "Názov",
          width: 30,
        },
        author: {
          label: "Autor",
          width: 30,
        },
        date_to: {
          label: "Dátum do",
          width: 30,
        }
      }
    }
  },
  methods: {
    async getUserAssignments() {
      try {
        const response = await this.$api.getUserAssignments();
        const data = response.data.map(res => ({
          ...res,
          date_to: new Date(res.date_to).toISOString().slice(0, 10)
        }))
        this.documents = data
      } catch (err) {
        console.log(err)
      }
    },
    openDocument(id) {
      this.$router.push({name: 'documentId', params: { id: id }})
    }
  },
  created() {
    this.getUserAssignments()
  },
}
</script>

<style>

</style>
