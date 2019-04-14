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
    reports: [],
    users: []
  },
  mutations: {
    setDialog (state, data) {
      state.dialog = data
    },
    setProperties (state, data) {
      state.properties = data
    },
    setReports (state, data) {
      state.reports = data
    },
    setUsers (state, data) {
      state.users = data
    }
  },
  actions: {
    setDialog: state => state.dialog,
    setProperties: state => state.properties,
    setReports: state => state.reports,
    setUsers: state => state.users
  }
})
