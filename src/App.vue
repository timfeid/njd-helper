<template>
  <div id="app">
    <news />
  </div>
</template>

<script>
import News from './components/News.vue'

export default {
  name: 'app',
  components: {
    News
  }
}
</script>

<style>
  #app {
    margin: 15px;
  }
</style>
