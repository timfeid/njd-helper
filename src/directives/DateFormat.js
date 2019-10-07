import moment from 'moment-timezone'
import Vue from 'vue'

const DateFormat = {
  bind(el, binding) {
    el.innerHTML = moment(binding.value.date).tz(moment.tz.guess()).format(binding.value.format)
  }
}

export default DateFormat

Vue.directive('date', DateFormat)
