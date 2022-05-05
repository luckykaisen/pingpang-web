
const getDefaultState = () => {
  return {
    showNavMenu: true
  }
}

const state = getDefaultState()

const actions = {
  hidNavMenu(content) {
    content.state.showNavMenu = false
  },
}

export default {
  namespaced: true,
  state,
  actions
}

