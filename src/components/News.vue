<template>
  <div>
    <div v-if="news">

      <h3 style="font-weight: 200;line-height: 1.1" class="text-primary mb-2">{{ news.headline }}</h3>
      <p style="font-size: 110%;line-height: 1.1" class="mb-2">{{ news.subhead }}</p>
      <div class="mb-3" style="font-weight: 200">
        By
        <span
          v-for="(contributor, index) in news.contributor.contributors"
          :key="index"
        >
          {{ contributor.name }}
          <a v-if="contributor.twitter" :href="`https://twitter.com/${contributor.twitter}`">{{ contributor.twitter }}</a>
        </span>
        / {{ news.contributor.source }}

      </div>
      <div class="mb-3" @click="viewVideo" v-if="news.media && news.media.type === 'video'">
        <div class="article-item__img-container">
          <div class="main-video video-preview video-preview--responsive" data-type="video" data-media-playback-id="61004103">
            <div class="video-preview__image-link">
              <img alt="" class=" " :src="mediaImage" title="" sizes="(min-width: 1308px) 943px, (min-width: 1024px) 66.6667vw, 100vw" :srcset="mediaSrcSet">
              <div class="video-preview__gradient p-3">
                <svg class="align-self-center" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
width="50px" height="50px" viewBox="0 0 314.068 314.068" style="enable-background:new 0 0 314.068 314.068;"
xml:space="preserve">
                  <g>
                    <g>
                      <g>
                        <path fill="#fff" d="M293.002,78.53C249.646,3.435,153.618-22.296,78.529,21.068C3.434,64.418-22.298,160.442,21.066,235.534
                          c43.35,75.095,139.375,100.83,214.465,57.47C310.627,249.639,336.371,153.62,293.002,78.53z M219.834,265.801
                          c-60.067,34.692-136.894,14.106-171.576-45.973C13.568,159.761,34.161,82.935,94.23,48.26
                          c60.071-34.69,136.894-14.106,171.578,45.971C300.493,154.307,279.906,231.117,219.834,265.801z M213.555,150.652l-82.214-47.949
                          c-7.492-4.374-13.535-0.877-13.493,7.789l0.421,95.174c0.038,8.664,6.155,12.191,13.669,7.851l81.585-47.103
                          C221.029,162.082,221.045,155.026,213.555,150.652z"/>
                      </g>
                    </g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                </svg>
                <h4 class="video-preview__blurb pl-2 ml-1">{{ news.media.blurb }}</h4>
                <div class="video-preview__time">
                  <span style="font-size: 1rem;margin-left: 1rem">
                    <font-awesome-icon :icon="['fas', 'clock']" /> {{ news.media.duration }}
                    </span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-html="news.preview" class="text-justify" style="line-height: 1.7;margin-top: 1rem;">

      </div>
      <div v-html="news.body" class="text-justify" style="line-height: 1.7">

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  components: {
  },

  data () {
    return {
      news: null
    }
  },
  async mounted () {
    let id = window.webConnector.newsId()
    const {data} = await axios.get(`https://nhl.bamcontent.com/nhl/id/v1/${id}/details/web-v1.json`)
    this.news = data
  },

  methods: {
    viewVideo () {
      window.webConnector.viewVideo(this.news.media.id)
    }
  },

  computed: {
    mediaSrcSet () {
      let srcSet = []
      for (let cut of Object.keys(this.news.media.image.cuts)) {
        srcSet.push(`${this.news.media.image.cuts[cut].at2x} ${this.news.media.image.cuts[cut].width}w`)
      }

      return srcSet.join(', ')
    },

    mediaImage () {
      return this.news.media.image.cuts[Object.keys(this.news.media.image.cuts)[0]].src
    }
  }
}
</script>
