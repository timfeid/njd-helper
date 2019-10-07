const doIt = () => {
  // let value = binding.value
  // for (let team of teams) {
  //   if (team[value.findBy] === value.value) {
  //     return team[value.fill]
  //   }
  // }
}

const Team = {
  bind(el, binding) {
    el.innerHTML = doIt(binding)
  },

  update(el, binding) {
    el.innerHTML = doIt(binding)
  }
}

export default Team
