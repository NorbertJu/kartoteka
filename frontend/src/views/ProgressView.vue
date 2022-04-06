<template>
  <div class="progress main">
    <h1>Postup</h1>
    <Table :header="header" :data="documents" :onClick="openDocument" />
  </div>
</template>

<script>
import Table from '../components/Table.vue'

export default {
  name: 'ProgressView',
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
          width: 20,
        },
        author: {
          label: "Autor",
          width: 20,
        },
        description: {
          label: "Popis",
          width: 50,
        }
      }
    }
  },
  methods: {
    async getDocumentsProgress() {
      try {
        const response = await this.$api.getDocumentsProgress();
        const data = response.data.map(res => ({
          progress: res.state,
          name: res.document_id.name,
          description: res.document_id.description,
          author: res.document_id.author,
          _id: res.document_id._id,
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
    this.getDocumentsProgress()
  },
}
</script>

<style>

</style>