<template>
  <div class="note">
    <span class="icon" v-on:click="onClick(note)" v-bind:class="{ 'opened': open }">
      <i class='far fa-comment-dots'></i>
    </span>
    <textarea v-if="open" maxlength="500" v-model="note"/>
  </div>
</template>

<script>
export default {
  name: 'Note',
  props: {
    note: String,
    open: Boolean,
    onClick: Function,
  }
}
</script>

<style scoped>
  .note {
    position: fixed;
    bottom: 20px;
    width: calc(100% - 252px - 100px);
  }

  .icon {
    position: absolute;
    right: -20px;
    bottom: 0px;
    cursor: pointer;
    color: rgb(20, 165, 223);
    font-size: 30px;
  }

  .opened {
    position: absolute;
    bottom: 150px;
  }

  textarea {
    position: absolute;
    bottom: 0;
    width: calc(100% - 20px);
    height: 120px;
    outline: none;
    resize: none;
    border: 1px solid rgb(20, 165, 223);
    border-radius: 20px;
    box-shadow: 0px 0px 5px 5px rgb(100, 100, 100, 0.2);
    padding: 10px;
    background-color: white;
  }
</style>