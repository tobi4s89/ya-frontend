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
    },
    properties: [],
    users: []
  },
  mutations: {
    setDialog (state, data) {
      state.dialog = data
    },
    setProperties (state, data) {
      state.properties = data
    },
    setUsers (state, data) {
      state.users = data
    }
  },
  actions: {
    setDialog: state => state.dialog,
    setProperties: state => state.properties,
    setUsers: state => state.users
  }
})
