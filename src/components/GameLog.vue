<template>
  <div>
    <div class="stats-table table-container table-container--scrollable mb-3">
      <table class="table table-responsive" v-if="type === 'skater'">
        <thead>
          <tr>
            <th>Opponent</th>
            <th>Date</th>
            <th>G</th>
            <th>A</th>
            <th>P</th>
            <th>+/-</th>
            <th>PIM</th>
            <th>PPG</th>
            <th>PPP</th>
            <th>SHG</th>
            <th>SHP</th>
            <th>GWG</th>
            <th>OTG</th>
            <th>S</th>
            <th>S%</th>
            <th>FO%</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(game, index) in showedGames" :key="index">
            <td>
              <div style="position: relative;">
                <svg width="25" height="25" class="homepage__game__team__img" style="position: relative;">
                  <use :xlink:href="'#team-'+game.opponent.id+'-'+seasonId+'-light'"></use>
                </svg>
                {{ game.opponent.abbreviation }}
              </div>
            </td>
            <td class="text-uppercase" v-date-format="{ date: game.date, format: 'MMM DD' }">

            </td>
            <td>
              {{ game.stat.goals }}
            </td>
            <td>
              {{ game.stat.assists }}
            </td>
            <td>
              {{ game.stat.goals + game.stat.assists }}
            </td>
            <td>
              {{ game.stat.plusMinus }}
            </td>
            <td>
              {{ game.stat.pim }}
            </td>
            <td>
              {{ game.stat.powerPlayGoals }}
            </td>
            <td>
              {{ game.stat.powerPlayPoints }}
            </td>
            <td>
              {{ game.stat.shortHandedGoals }}
            </td>
            <td>
              {{ game.stat.shortHandedPoints }}
            </td>
            <td>
              {{ game.stat.gameWinningGoals }}
            </td>
            <td>
              {{ game.stat.overTimeGoals }}
            </td>
            <td>
              {{ game.stat.shots }}
            </td>
            <td>
              {{ (typeof game.stat.shotPct !== 'undefined') ? parseFloat(game.stat.shotPct).toFixed(2) : '&mdash;' }}
            </td>
            <td>
              {{ (typeof game.stat.faceoffPct !== 'undefined') ? parseFloat(game.stat.faceoffPct).toFixed(2) : '&mdash;' }}
            </td>
          </tr>
        </tbody>
      </table>
      <table class="table table-responsive" v-if="type === 'goalie'">
        <thead>
          <tr>
            <th>Opponesnt</th>
            <th>Date</th>
            <th>Starter</th>
            <th>D</th>
            <th>SA</th>
            <th>GA</th>
            <th>SV%</th>
            <th>SO</th>
            <th>TOI</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="game in showedGames" :key="game.id">
            <td>
              <div style="">
                <svg width="25" height="25" class="homepage__game__team__img">
                  <use :xlink:href="'#team-'+game.opponent.id+'-'+seasonId+'-light'"></use>
                </svg>
                {{ game.opponent.abbreviation }}
              </div>
            </td>
            <td class="text-uppercase" v-date-format="{ date: game.date, format: 'MMM DD' }">

            </td>
            <td>
              {{ game.stat.gamesStarted > 0 ? 'Yes' : 'No' }}
            </td>
            <td>
              {{ game.stat.decision }}
            </td>
            <td>
              {{ game.stat.shotsAgainst }}
            </td>
            <td>
              {{ game.stat.goalsAgainst }}
            </td>
            <td>
              {{ game.stat.savePercentage }}
            </td>
            <td>
              {{ game.stat.shutouts }}
            </td>
            <td>
              {{ game.stat.timeOnIce }}
            </td>
          </tr>
        </tbody>

      </table>
    </div>
    <div class="text-center">
      <button @click="totalGamesToShow += 5" class="btn btn-primary">
        Show More
      </button>
    </div>
  </div>
</template>

<script>
import DateFormat from '@/directives/DateFormat'

export default {
  directives: {
    DateFormat
  },

  props: {
    gameLog: {
      required: true,
      type: Array
    },
    type: {
      required: true,
      type: String
    }
  },

  components: {
  },

  computed: {
    seasonId() {
      return window.webConnector.seasonId()
    },
    showedGames () {
      let gameLog = this.gameLog.slice()
      return gameLog.splice(0, this.totalGamesToShow)
    }
  },

  data () {
    return {
      totalGamesToShow: 5,
      // showMoreIcon: faPlusCircle
    }
  }
}
</script>
