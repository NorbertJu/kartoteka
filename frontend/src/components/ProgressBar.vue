<template>
  <div class="progresBar" v-on:click="onClick">
    <div class="bar">
      <div class="completed" v-bind:style="{'height': this.progress ? this.progress + 'px' : '0px'}"></div>
    </div>
    <span class="percentage"><strong>{{progress}}%</strong></span>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    progress: Number,
    onClick: Function
  }
}
</script>

<style scoped>
  .progresBar {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: calc(50% + 31px);
    left: calc(252px + 25px);
    transform: translate(-50%, -50%);
    cursor: pointer;
  }

  .bar {
    width: 10px;
    height: 100px;
    background-color: rgb(212, 212, 212);
    border-radius: 5px;
  }

  .percentage {
    padding-top: 10px;
  }

  .completed {
    background-color: rgb(20, 165, 223);
    border-radius: 5px;
    width: 100%;
    height: 0;
  }
</style>