import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dialog: {
      type: '',
      content: {},
      fullscreen: false,
      visible: false
    }
  },
  mutations: {
    setDialog (state, data) {
      state.dialog = data
    }
  },
  actions: {
    setDialog: state => state.dialog
  }
})
