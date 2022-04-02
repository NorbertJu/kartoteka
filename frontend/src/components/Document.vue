<template>
  <div class="document" v-if="!edit">
    <div class="flex">
      <h1>{{name}}</h1>
      <button v-if="canEdit && !edit" class="editButton" v-on:click="onEdit">Upraviť</button>
    </div>
    <h2>{{author}}</h2>
    <p>{{description}}</p>
    <div v-html="data" class="ql-editor"></div>
  </div>
  <Editor v-else 
    :data="data" 
    :name="name" 
    :author="author" 
    :description="description" 
    :onUpdate="onUpdate" 
    :onCancel="onCancel" 
    :onDelete="onDelete"
  />
</template>

<script>
import Editor from './Editor.vue'

export default {
  name: 'Document',
  components: {
    Editor
  },
  props: {
    data: String,
    author: String,
    description: String,
    name: String,
    edit: Boolean,
    canEdit: Boolean,
    onEdit: Function,
    onUpdate: Function,
    onCancel: Function,
    onDelete: Function,
  }
}
</script>

<style scoped>
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

  h2 {
    margin-top: 0;
  }
</style>