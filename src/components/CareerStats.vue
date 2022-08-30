<template>
  <div>
    <ul class="mb-3 nav nav-pills justify-content-center">
      <li class="nav-item">
        <a @click="nav = 'regular'" class="nav-link" :class="{ active: nav === 'regular' }" href="javascript:;">
          Regular Seasons
        </a>
      </li>
      <li class="nav-item" v-if="playoffs.length > 0">
        <a @click="nav = 'playoffs'" class="nav-link" :class="{ active: nav === 'playoffs' }" href="javascript:;">
          Playoffs
        </a>
      </li>
    </ul>

    <div class="stats-table table-container table-container--scrollable">
      <table class="table table-responsive" v-if="type === 'skater'">
        <thead>
          <tr>
            <th @click="sortBy('season')" :class="{ 'stats--highlight': sortedBy === 'season' }">
              Season
            </th>
            <th @click="sortBy('team')" :class="{ 'stats--highlight': sortedBy === 'team' }">
              Team
            </th>
            <th @click="sortBy('games')" :class="{ 'stats--highlight': sortedBy === 'games' }">
              GP
            </th>
            <th @click="sortBy('goals')" :class="{ 'stats--highlight': sortedBy === 'goals' }">
              G
            </th>
            <th @click="sortBy('assists')" :class="{ 'stats--highlight': sortedBy === 'assists' }">
              A
            </th>
            <th @click="sortBy('points')" :class="{ 'stats--highlight': sortedBy === 'points' }">
              P
            </th>
            <th @click="sortBy('plusMinus')" :class="{ 'stats--highlight': sortedBy === 'plusMinus' }">
              +/-
            </th>
            <th @click="sortBy('pim')" :class="{ 'stats--highlight': sortedBy === 'pim' }">
              PIM
            </th>
            <th @click="sortBy('powerPlayGoals')" :class="{ 'stats--highlight': sortedBy === 'powerPlayGoals' }">
              PPG
            </th>
            <th @click="sortBy('powerPlayPoints')" :class="{ 'stats--highlight': sortedBy === 'powerPlayPoints' }">
              PPP
            </th>
            <th @click="sortBy('shortHandedGoals')" :class="{ 'stats--highlight': sortedBy === 'shortHandedGoals' }">
              SHG
            </th>
            <th @click="sortBy('shortHandedPoints')" :class="{ 'stats--highlight': sortedBy === 'shortHandedPoints' }">
              SHP
            </th>
            <th @click="sortBy('gameWinningGoals')" :class="{ 'stats--highlight': sortedBy === 'gameWinningGoals' }">
              GWG
            </th>
            <th @click="sortBy('overTimeGoals')" :class="{ 'stats--highlight': sortedBy === 'overTimeGoals' }">
              OTG
            </th>
            <th @click="sortBy('shots')" :class="{ 'stats--highlight': sortedBy === 'shots' }">
              S
            </th>
            <th @click="sortBy('shotPct')" :class="{ 'stats--highlight': sortedBy === 'shotPct' }">
              S%
            </th>
            <th @click="sortBy('faceOffPct')" :class="{ 'stats--highlight': sortedBy === 'faceOffPct' }">
              FO%
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="season in sortedSeasons" :key="season.season">
            <td :class="{ 'stats--highlight': sortedBy === 'season' }">
              {{ season.season.substr(0, 4) }}-{{ season.season.substr(4, season.season.length) }}
            </td>
            <td class="text-left" :class="{ 'stats--highlight': sortedBy === 'team' }">
              {{ season.team.abbreviation }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'games' }">
              {{ season.stat.games }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'goals' }">
              {{ season.stat.goals }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'assists' }">
              {{ season.stat.assists }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'points' }">
              {{ season.stat.points }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'plusMinus' }">
              {{ season.stat.plusMinus }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'pim' }">
              {{ season.stat.pim }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'powerPlayGoals' }">
              {{ season.stat.powerPlayGoals }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'powerPlayPoints' }">
              {{ season.stat.powerPlayPoints }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'shortHandedGoals' }">
              {{ season.stat.shortHandedGoals }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'shortHandedPoints' }">
              {{ season.stat.shortHandedPoints }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'gameWinningGoals' }">
              {{ season.stat.gameWinningGoals }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'overTimeGoals' }">
              {{ season.stat.overTimeGoals }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'shots' }">
              {{ season.stat.shots }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'shotPct' }">
              {{ (typeof season.stat.shotPct !== 'undefined') ? parseFloat(season.stat.shotPct).toFixed(2) : '&mdash;' }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'faceOffPct' }">
              {{ (typeof season.stat.faceoffPct !== 'undefined') ? parseFloat(season.stat.faceoffPct).toFixed(2) : '&mdash;' }}
            </td>
          </tr>

          <tr class="font-weight-bold">
            <td :class="{ 'stats--highlight': sortedBy === 'season' }">
              Career
            </td>
            <td class="text-left" :class="{ 'stats--highlight': sortedBy === 'team' }">
              &mdash;
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'games' }">
              {{ career.stat.games }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'goals' }">
              {{ career.stat.goals }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'assists' }">
              {{ career.stat.assists }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'points' }">
              {{ career.stat.points }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'plusMinus' }">
              {{ career.stat.plusMinus }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'pim' }">
              {{ career.stat.pim }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'powerPlayGoals' }">
              {{ career.stat.powerPlayGoals }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'powerPlayPoints' }">
              {{ career.stat.powerPlayPoints }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'shortHandedGoals' }">
              {{ career.stat.shortHandedGoals }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'shortHandedPoints' }">
              {{ career.stat.shortHandedPoints }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'gameWinningGoals' }">
              {{ career.stat.gameWinningGoals }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'overTimeGoals' }">
              {{ career.stat.overTimeGoals }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'shots' }">
              {{ career.stat.shots }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'shotPct' }">
              {{ (typeof career.stat.shotPct !== 'undefined') ? parseFloat(career.stat.shotPct).toFixed(2) : '&mdash;' }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'faceOffPct' }">
              {{ (typeof career.stat.faceoffPct !== 'undefined') ? parseFloat(career.stat.faceoffPct).toFixed(2) : '&mdash;' }}
            </td>
          </tr>
        </tbody>
      </table>
      <table class="table table-responsive" v-if="type === 'goalie'">
        <thead>
          <tr>
            <th @click="sortBy('season')" :class="{ 'stats--highlight': sortedBy === 'season' }">
              Season
            </th>
            <th @click="sortBy('team')" :class="{ 'stats--highlight': sortedBy === 'team' }">
              Team
            </th>
            <th @click="sortBy('games')" :class="{ 'stats--highlight': sortedBy === 'games' }">
              GP
            </th>
            <th @click="sortBy('gamesStarted')" :class="{ 'stats--highlight': sortedBy === 'gamesStarted' }">
              GS
            </th>
            <th @click="sortBy('wins')" :class="{ 'stats--highlight': sortedBy === 'wins' }">
              W
            </th>
            <th @click="sortBy('losses')" :class="{ 'stats--highlight': sortedBy === 'losses' }">
              L
            </th>
            <th @click="sortBy('ot')" :class="{ 'stats--highlight': sortedBy === 'ot' }">
              OT
            </th>
            <th @click="sortBy('shotsAgainst')" :class="{ 'stats--highlight': sortedBy === 'shotsAgainst' }">
              SA
            </th>
            <th @click="sortBy('goalsAgainst')" :class="{ 'stats--highlight': sortedBy === 'goalsAgainst' }">
              GA
            </th>
            <th @click="sortBy('goalAgainstAverage')" :class="{ 'stats--highlight': sortedBy === 'goalAgainstAverage' }">
              GAA
            </th>
            <th @click="sortBy('saves')" :class="{ 'stats--highlight': sortedBy === 'saves' }">
              S
            </th>
            <th @click="sortBy('savePercentage')" :class="{ 'stats--highlight': sortedBy === 'savePercentage' }">
              SV%
            </th>
            <th @click="sortBy('shutouts')" :class="{ 'stats--highlight': sortedBy === 'shutouts' }">
              SO
            </th>
            <th @click="sortBy('timeOnIce')" :class="{ 'stats--highlight': sortedBy === 'timeOnIce' }">
              MIN
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="season in sortedSeasons" :key="season.season">
            <td :class="{ 'stats--highlight': sortedBy === 'season' }">
              {{ season.season.substr(0, 4) }}-{{ season.season.substr(4, season.season.length) }}
            </td>
            <td class="text-left" :class="{ 'stats--highlight': sortedBy === 'team' }">
              {{ season.team.abbreviation }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'games' }">
              {{ season.stat.games }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'gamesStarted' }">
              {{ season.stat.gamesStarted }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'wins' }">
              {{ season.stat.wins }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'losses' }">
              {{ season.stat.losses }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'ot' }">
              {{ season.stat.ot }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'shotsAgainst' }">
              {{ format(season.stat.shotsAgainst) }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'goalsAgainst' }">
              {{ season.stat.goalsAgainst }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'goalAgainstAverage' }">
              {{ season.stat.goalAgainstAverage.toFixed(3) }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'saves' }">
              {{ format(season.stat.saves) }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'savePercentage' }">
              {{ season.stat.savePercentage.toFixed(3) }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'shutouts' }">
              {{ season.stat.shutouts }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'timeOnIce' }">
              {{ format(parseInt(season.stat.timeOnIce)) }}
            </td>
          </tr>

          <tr class="font-weight-bold">
            <td :class="{ 'stats--highlight': sortedBy === 'season' }">
              Career
            </td>
            <td class="text-left" :class="{ 'stats--highlight': sortedBy === 'team' }">
              &mdash;
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'games' }">
              {{ career.stat.games }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'gamesStarted' }">
              {{ career.stat.gamesStarted }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'wins' }">
              {{ career.stat.wins }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'losses' }">
              {{ career.stat.losses }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'ot' }">
              {{ career.stat.ot }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'shotsAgainst' }">
              {{ format(career.stat.shotsAgainst) }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'goalsAgainst' }">
              {{ career.stat.goalsAgainst }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'goalAgainstAverage' }">
              {{ career.stat.goalAgainstAverage.toFixed(3) }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'saves' }">
              {{ format(career.stat.saves) }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'savePercentage' }">
              {{ career.stat.savePercentage.toFixed(3) }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'shutouts' }">
              {{ career.stat.shutouts }}
            </td>
            <td :class="{ 'stats--highlight': sortedBy === 'timeOnIce' }">
              {{ format(parseInt(career.stat.timeOnIce)) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Team from '@/directives/Team'

const formatter = new Intl.NumberFormat()

export default {
  directives: {
    Team
  },

  props: {
    seasons: {
      required: true,
      type: Array
    },
    playoffs: {
      required: true,
      type: Array
    },
    career: {
      required: true,
      type: Object
    },
    type: {
      required: true,
      type: String,
    }
  },

  components: {
  },

  computed: {
    sortedSeasons () {
      let seasons = this.nav === 'regular' ? this.seasons : this.playoffs
      return seasons.sort((a, b) => {
        if (this.sortedBy === 'season') {
          if (this.sortedDirection === 'asc') {
            return parseFloat(b.season, 10) - parseFloat(a.season, 10)
          }

          return parseFloat(a.season, 10) - parseFloat(b.season, 10)
        }
        if (this.sortedBy === 'team') {
          if (this.sortedDirection === 'asc') {
            return (b.team.abbreviation.substr(0, 1) > a.team.abbreviation.substr(0, 1)) ? -1 : 1
          }

          return (a.team.abbreviation.substr(0, 1) < b.team.abbreviation.substr(0, 1)) ? 1 : -1
        }
        if (this.sortedDirection === 'asc') {
          return parseFloat(b.stat[this.sortedBy], 10) - parseFloat(a.stat[this.sortedBy], 10)
        }

        return parseFloat(a.stat[this.sortedBy], 10) - parseFloat(b.stat[this.sortedBy], 10)
      })
    }
  },

  data () {
    return {
      sortedBy: 'season',
      sortedDirection: 'desc',
      nav: 'regular',
    }
  },

  methods: {
    sortBy (sortBy) {
      if (this.sortedBy === sortBy) {
        this.sortedDirection = this.sortedDirection === 'asc' ? 'desc' : 'asc'
        return
      }
      this.sortedDirection = 'asc'
      this.sortedBy = sortBy
    },
    format(number) {
      return formatter.format(number)
    }
  }
}
</script>
