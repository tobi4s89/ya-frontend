import Vue from 'vue'

class ApiService {
  constructor () {
    this.url = process.env.VUE_APP_API_URL
  }
  initClient () {
    // Set base headers
    Vue.http.options.root = this.url
  }
  delete (uri, id) {
    this.initClient()

    return Vue.http.delete(uri + id).then((response) => {
      return response.data
    })
  }
  get (uri) {
    this.initClient()

    return Vue.http.get(uri).then((response) => {
      return response.data
    })
  }
  post (uri, data) {
    this.initClient()

    return Vue.http.post(uri, data).then((response) => {
      return response.data
    })
  }
}

export default new ApiService()
