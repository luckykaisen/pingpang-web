import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import menu from './modules/menu'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    menu,
  },
  getters
})

export default store
