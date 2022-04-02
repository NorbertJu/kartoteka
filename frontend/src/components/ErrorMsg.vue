<template>
  <div v-if="message" class="error">
    {{message}}
  </div>
</template>

<script>
export default {
  name: 'ErrorMsg',
  props: {
    message: String
  },
}
</script>

<style scoped>
  .error {
    display: inline-block;
    color: red;
    background-color: rgb(255, 225, 225);
    border: 1px solid red;
    padding: 8px;
    border-radius: 20px;
  }
</style>