<template>
  <div id="app">
    <component :is="component" />
  </div>
</template>

<script>
import News from './components/News.vue'
import PlayerStats from './components/PlayerStats.vue'

export default {
  name: 'app',
  data () {
    return {
      component: window.webConnector.component()
    }
  },

  components: {
    News,
    PlayerStats,
  }
}
</script>
