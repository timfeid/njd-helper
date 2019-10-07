<template>
  <div v-if="player">
    <div class="player-action-image" v-bind:style="{
      backgroundImage: `url('https://nhl.bamcontent.com/images/actionshots/${player.id}.jpg')`
    }">

    </div>
    <div class="d-flex">
      <div
        class="player-image"
        v-bind:style="{
          backgroundImage: `url('https://nhl.bamcontent.com/images/headshots/current/60x60/${player.id}.png')` }"
      />
    </div>
    <h3 class="text-center mt-3">
      {{ player.fullName }} | #{{ player.primaryNumber }}
    </h3>
    <div class="d-flex justify-content-center my-3">
      <div class="player-info">
        {{ player.primaryPosition.abbreviation }}
      </div>
      <div class="player-info">
        {{ player.height }}
      </div>
      <div class="player-info">
        {{ player.weight }}lbs
      </div>
      <div class="player-info">
        Age: {{ player.currentAge }}
      </div>
    </div>

    <div class="p-4">
      <div class="row my-2">
        <div class="col-3">
          <strong>Born</strong>
        </div>
        <div class="col-9" v-date="{ date: player.birthDate, format: 'MMMM d, Y' }" />
      </div>


      <div class="row my-2">
        <div class="col-3">
          <strong>Birthplace</strong>
        </div>
        <div class="col-9">
          {{ player.birthCity }},
          <span v-if="player.birthStateProvince">
            {{ player.birthStateProvince }},
          </span>
          {{ player.birthCountry }}
        </div>
      </div>


      <div class="row my-2">
        <div class="col-3">
          <strong>Shoots</strong>
        </div>
        <div class="col-9">
          {{ player.shootsCatches === 'L' ? 'Left' : 'Right' }}
        </div>
      </div>


      <div class="row my-2">
        <div class="col-3">
          <strong>Draft</strong>
        </div>
        <div class="col-9">
          <span v-if="!player.draft">Undrafted</span>
          <span v-else>
            {{ player.draft.year }} {{ player.draft.team.abbreviation }} rd {{ player.draft.round }}, pk {{ player.draft.pickInRound }} (#{{ player.draft.pickOverall }} overall)
          </span>
        </div>
      </div>
    </div>

    <div class="player-stats-block mt-5">
      <h5 class="text-center">Game Log</h5>
      <game-log :game-log="gameLog" v-if="player" />
    </div>

    <div class="player-stats-block">
      <h5 class="text-center">Career Stats</h5>
      <career-stats :seasons="seasons" :career="career" :playoffs="playoffs" v-if="player" />
    </div>
  </div>
</template>

<script>
import GameLog from '@/components/GameLog'
import CareerStats from '@/components/CareerStats'
import axios from 'axios'

export default {
  name: 'PlayerStats',
  data () {
    return {
      player: null
    }
  },

  async mounted () {
    let params = {
      expand: 'person.stats,stats.team',
      stats: 'yearByYear,careerRegularSeason,gameLog,yearByYearPlayoffs'
    }

    const {data} = await axios.get('https://statsapi.web.nhl.com/api/v1/people/' + window.webConnector.load(), {
      params
    })

    this.player = data.people[0]
    this.populateDraft()

  },

  components: {
    GameLog,
    CareerStats
  },

  computed: {
    gameLog () {
      if (this.player) {
        for (let stat of this.player.stats) {
          if (stat.type.displayName === 'gameLog') {
            return stat.splits
          }
        }
      }

      return null
    },

    seasons () {
      let seasons = []
      if (this.player) {
        for (let stat of this.player.stats) {
          if (stat.type.displayName === 'yearByYear') {
            for (let split of stat.splits) {
              if (split.league.id === 133) {
                seasons.push(split)
              }
            }
          }
        }
      }

      return seasons
    },

    playoffs () {
      let playoffs = []
      if (this.player) {
        for (let stat of this.player.stats) {
          if (stat.type.displayName === 'yearByYearPlayoffs') {
            for (let split of stat.splits) {
              if (split.league.id === 133) {
                playoffs.push(split)
              }
            }
          }
        }
      }

      return playoffs
    },

    career () {
      if (this.player) {
        for (let stat of this.player.stats) {
          if (stat.type.displayName === 'careerRegularSeason') {
            return stat.splits[0]
          }
        }
      }
      return null
    }
  },

  methods: {
    async populateDraft () {
      let params = {
        hydrate: 'draft,draft.team',
      }

      const {data} = await axios.get('https://statsapi.web.nhl.com/api/v1/people/' + window.webConnector.load(), {
        params
      })

      const person = data.people[0]
      this.$set(this.player, 'draft', person.draft && person.draft.length > 0 ? person.draft[0] : null)
    }
  }
}
</script>

<style lang="scss">
  .player {
    &-info {
      padding: 0 1rem;
      font-size: 14px;
      line-height: 18px;
      border-right: 1px solid #000;
      &:last-child {
        border-right: none;
      }
    }
    &-image {
      background: #fff;
      margin: -30px auto 0;
      border-radius: 30px;
      overflow: hidden;
      background-size: cover;
      background-position: center center;
      height: 60px;
      width: 60px;
      box-shadow: 0 0 .5rem rgba(0,0,0,.95);
    }
    &-action-image {
      z-index: -1;
      height: 12rem;
      width: 100%;
      background-size: cover;
      background-position: center center;
      overflow: hidden;
      position: relative;
      &::after {
        content: '';
        box-shadow: inset 0 0 5rem rgba(0,0,0,.95);
        position: absolute;
        top: -200px;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }

    &-stats-block {
      border-top: 5px solid #eaeaea;
      padding: 2rem 1rem;
    }
  }
</style>