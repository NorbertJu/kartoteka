<template>
  <div class="progress main">
    <template v-if="!id">
      <h1>Postup</h1>
      <Table :header="header" :data="documents" :onClick="openDocument" />
    </template>
    <template v-else>
      <h1>{{group_name}}</h1>
      <h2>{{document_name}} - {{document_author}}</h2>
      <h4>Od: {{date_from}} | Do: {{date_to}}</h4>
      <Table :header="progressHeader" :data="progresses" :onClick="() => {}" />
    </template>
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
      progresses: [],
      group_name: '',
      document_name: '',
      document_author: '',
      date_from: '',
      date_to: '',
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
      },
      progressHeader: {
        progress: {
          label: "Postup (%)",
          width: 10,
          align: "center",
          noFilter: true,
        },
        name: {
          label: "Meno",
          width: 45,
        },
        email: {
          label: "Email",
          width: 45,
        }
      }
    }
  },
  computed: {
    id() {
      return this.$route.params.id
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
    async getAssignmentProgress() {
      try {
        
        const response = await this.$api.getAssignmentProgress(this.id);
        if (response.data) {
          this.group_name = response.data.group
          this.document_name = response.data.document.name
          this.document_author = response.data.document.author
          this.date_from = new Date(response.data.date_from).toISOString().slice(0, 10)
          this.date_to = new Date(response.data.date_to).toISOString().slice(0, 10)
          this.progresses = response.data.members
        }
      } catch (err) {
        console.log(err)
      }
    },
    openDocument(id) {
      this.$router.push({name: 'documentId', params: { id: id }})
    }
  },
  watch: {
    id: {
      handler: async function(id) {
        if (id && this.$route.name == 'progressId') {
          this.getAssignmentProgress()
        } else {
          this.progresses = [],
          this.group_name = ''
          this.document_name = ''
          this.document_author = ''
          this.date_from = ''
          this.date_to = ''
        }
      },
      immediate: true
    },
  },
  created() {
    this.getDocumentsProgress()
  },
}
</script>

<style>

</style>