<template>
  <div class="document" v-if="!edit">
    <div class="flex">
      <h1>{{name}}</h1>
      <button v-if="canEdit && !edit" class="editButton" v-on:click="onEdit">Upraviť</button>
    </div>
    <h2>{{author}}</h2>
    <p>{{description}}</p>
    <div 
      ref="content" 
      class="content" 
      v-on:click="onContentClick($event)" 
      v-on:mousemove="moveBar($event)"
      v-bind:class="{ 'contentHover': setProgress }" 
    >
      <div v-html="data" class="ql-editor"></div>
      <div ref="progressLine" class="progressLine" v-bind:style="{'top': this.progressLine}"></div>
      <div ref="newProgressLine" class="newProgressLine" ></div>
    </div>
    <ProgressBar 
      :progress="progress" 
      :onClick="onProgressClick"
    />
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
import ProgressBar from './ProgressBar.vue'

export default {
  name: 'Document',
  components: {
    Editor,
    ProgressBar
  },
  props: {
    data: String,
    author: String,
    description: String,
    name: String,
    progress: Number,
    setProgress: Boolean,
    edit: Boolean,
    canEdit: Boolean,
    onEdit: Function,
    onProgressClick: Function,
    onProgressUpdate: Function,
    onUpdate: Function,
    onCancel: Function,
    onDelete: Function,
  },
  data() {
    return {
      isLoaded: false,
      resize: 0
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeProgress);
  },
  methods: {
    onContentClick(event) {
      if (this.setProgress) {
        const isFinished = (this.$refs.content.offsetHeight - this.$refs.newProgressLine.style.top.replace('px', '')) < 15 ? true : false
        let newProgress
        if (isFinished) {
          newProgress = 100
        } else {
          newProgress = Math.round(this.$refs.newProgressLine.style.top.replace('px', '') / this.$refs.content.offsetHeight * 100)
        }
        this.onProgressUpdate(newProgress)
      }
    },
    moveBar(event) {
      if (this.setProgress && event.layerY > 0) {
        const position = event.layerY + 'px'
        this.$refs.newProgressLine.style.top = position
      }
    },
    resizeProgress() {
      this.resize++;
    }
  },
  computed: {
    progressLine() {
      this.resize;
      if (this.isLoaded) {
        return this.$refs.content.offsetHeight / 100 * this.progress + 'px'
      }
      return '0px'
    }
  },
  watch: {
    setProgress: {
      handler: function(value) {
        if (this.$refs.newProgressLine) {
          if (value) {
            this.$refs.newProgressLine.style.display = 'block';
          } else {
            this.$refs.newProgressLine.style.display = 'none';
          }
        }
      },
      immediate: true
    },
    data(value){
      if (value){
        this.$nextTick(()=>{
          this.isLoaded = true
        })
      }
    }
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

  .content {
    position: relative;
  }

  .contentHover {
    background-color: rgb(235, 245, 245);
    cursor: pointer;
  }

  .contentHover .ql-editor {
    pointer-events: none;
  }

  .progressLine {
    position: absolute;
    border-top: 1px dotted rgba(20, 165, 223, 0.5);
    width: 100%;
  }

  .newProgressLine {
    display: none;
    position: absolute;
    border-top: 1px solid rgb(20, 165, 223);
    width: 100%;
  }
</style>