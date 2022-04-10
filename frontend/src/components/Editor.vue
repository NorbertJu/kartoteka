<template>
  <div class="editor">
    <div class="inputs">
      <div class="inputGroup">
        <label for="name">Názov: </label>
        <input type="text" id="name" name="name" v-model="name">
      </div>
      <div class="inputGroup">
      <label for="author">Autor: </label>
      <input type="text" id="author" name="author" v-model="author">
      </div>
      <label for="description">Popis: </label>
      <textarea rows="4" maxlength="500" id="description" name="description" v-model="description" />
    </div>
    <QuillEditor ref="quill" theme="snow" :toolbar="toolbar" />
    <div class="buttons">
      <button class="updateButton" v-on:click="onUpdate(getData())">{{id == 'new' ? 'Vytvoriť' : 'Aktualizovať'}}</button>
      <button class="cancelButton" v-on:click="onCancel">Zrušiť</button>
      <button v-if="id != 'new'" class="deleteButton" v-on:click="onDelete">Odstrániť</button>
    </div>
  </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  name: 'Editor',
  components: {
    QuillEditor
  },
  props: {
    name: String,
    author: String,
    description: String,
    data: {
      type: String,
      default: ''
    },
    onUpdate: Function,
    onCancel: Function,
    onDelete: Function,
  },
  data() {
    return {
      toolbar: [
        [{ size: ['huge', 'large', false, 'small']}, { 'header': '1' }, { 'header': '2' }], 
        [{ 'font': [] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['image']
      ],
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  methods: {
    getData() {
      return {
        name: this.name,
        author: this.author,
        description: this.description,
        data: this.$refs.quill.getHTML()
      }
    }
  },
  watch: {
    data: {
      handler: async function(data) {
        while (!this.$refs.quill) {
          await new Promise(r => setTimeout(r, 100));
        } 
        this.$refs.quill.setHTML(data)
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.editor {
  height: 100%;
  display: flex;
  flex-direction: column;
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