import Vue from 'vue'
import App from './App.vue'
import './resources/main.scss'

Vue.config.productionTip = false

if (!window.webConnector) {
  window.webConnector = {
    load() {
      return 8472382
    },
    component() {
      return 'news'
    },
    newsId() {
      return 300086148
    }
  }
}

new Vue({
  render: h => h(App),
}).$mount('#app')
