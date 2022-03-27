<template>
  <div class="document main">
    <h1>Dokumenty</h1>
    <Table :header="header" :data="documents"/>
  </div>
</template>

<script>
import Table from '../components/Table.vue'

export default {
  name: 'EvaluationLists',
  components: {
    Table
  },
  data() {
    return {
      documents: [],
      header: {
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
          width: 60,
        },
      },
    }
  },
  methods: {
    async getDocuments() {
      try {
        const response = await this.$api.getDocuments();
        this.documents = response.data
      } catch (err) {
        console.log(err)
      }
    }, 
  },
  created() {
    this.getDocuments()
  },
}

</script>

<style>

</style>
