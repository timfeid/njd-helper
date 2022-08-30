import axios from 'axios'
import 'typeface-merriweather'
import 'typeface-roboto'
import 'typeface-roboto-mono'
import Vue from 'vue'
import App from './App.vue'
import './resources/main.scss'

Vue.config.productionTip = false

if (!window.webConnector) {
  window.webConnector = {
    load() {
      return 8478406
    },
    component() {
      return 'player-stats'
    },
    newsId() {
      return 68791103
    },
    seasonId () {
      return '20222023'
    }
  }
}

new Vue({
  render: h => h(App),
}).$mount('#app')

axios.get(`https://www-league.nhlstatic.com/images/logos/team-sprites/${window.webConnector.seasonId()}.svg`).then((response) => {
  let node = document.createElement('div')
  node.style.display = 'none'
  node.innerHTML = response.data
  document.body.appendChild(node)
})
