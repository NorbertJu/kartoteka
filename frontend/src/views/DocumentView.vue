<template>
  <div class="documents main">
    <template v-if="!id">
      <div class="flex">
        <h1>Dokumenty</h1>
        <button class="newButton" v-on:click="newDocument()">+ Nový</button>
      </div>
      <Table :header="header" :data="documents" :onClick="openDocument" />
    </template>
    <template v-else>
      <Document 
        :name="name" 
        :author="author" 
        :data="data" 
        :description="description" 
        :progress="progress"
        :setProgress="setProgress"
        :edit="edit" 
        :canEdit="canEdit"
        :onEdit="onEdit"
        :onProgressClick="onProgressClick" 
        :onProgressUpdate="onProgressUpdate"
        :onUpdate="onDocumentUpdate" 
        :onCancel="onEditorCancel" 
        :onDelete="onDocumentDelete"
      />
    </template>
  </div>
</template>

<script>
import Table from '../components/Table.vue'
import Document from '../components/Document.vue'

export default {
  name: 'DocumentView',
  components: {
    Table,
    Document
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
      name: '',
      author: '',
      data: '',
      description: '',
      progress: 0,
      setProgress: false,
      edit: false,
      canEdit: false
    }
  },
  computed: {
    id() {
      return this.$route.params.id
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
    async getDocument() {
      try {
        if (this.id != 'new') {
          const response = await this.$api.getDocument(this.id);
          this.name = response.data?.name
          this.author = response.data?.author
          this.data = response.data?.data
          this.description = response.data?.description
        }
      } catch (err) {
        console.log(err)
      }
    },
    async getProgress() {
      try {
        if (this.id != 'new') {
          const response = await this.$api.getProgress(this.id);
          if (!response.data) {
            await this.$api.createProgress({document_id: this.id, state: 0});
          } else {
            this.progress = response.data?.state
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    async updateProgress() {
      try {
        await this.$api.updateProgress({document_id: this.id, state: this.progress});
      } catch (err) {
        console.log(err)
      }
    },
    async getDocumentEdit() {
      try {
        if (this.id == 'new') {
          this.canEdit = true
        } else {
          const response = await this.$api.getDocumentEdit(this.id)
          this.canEdit = response.data?.canEdit
        }
      } catch (err) {
        console.log(err)
      }
    },
    openDocument(id) {
      this.$router.push({name: 'documentId', params: { id: id }})
    },
    async onDocumentUpdate(data) {
      try {
        if (this.id == 'new') {
          const response = await this.$api.createDocument(data)
          this.$router.push({name: 'documentId', params: { id: response.data?.id }})
        } else {
          await this.$api.updateDocument({...data, id: this.id})
        }
        this.edit = false
        this.getDocuments()
        this.getDocument()
      } catch (err) {
        console.log(err)
      }
    },
    onEditorCancel() {
      this.edit = false
      if (this.id == 'new') {
        this.$router.push({name: 'document'})
      }
    },
    async onDocumentDelete() {
      try {
        await this.$api.deleteDocument(this.id)
        await this.getDocuments()
        this.$router.push({name: 'document'})
      } catch (err) {
        console.log(err)
      }
    },
    onEdit() {
      this.edit = true;
    },
    onProgressClick() {
      this.setProgress = !this.setProgress
    },
    onProgressUpdate(progress) {
      if (this.setProgress) {
        this.progress = progress
        this.updateProgress()
        this.setProgress = false
      }
    },
    newDocument() {
      this.edit = true;
      this.$router.push({name: 'documentId', params: { id: 'new' }})
    }
  },
  watch: {
    id: {
      handler: async function(id) {
        if (id) {
          this.getDocument();
          this.getProgress();
          this.getDocumentEdit();
        } else {
          this.name = ''
          this.author = ''
          this.data = ''
          this.description = ''
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
    this.getDocuments()
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
