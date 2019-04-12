import _ from 'lodash'
import Vue from 'vue'

class ApiService {
  constructor () {
    this.url = process.env.VUE_APP_API_URL
  }
  initClient (headers = null) {
    // Set base headers
    Vue.http.options.root = this.url

    if (headers) {
      Vue.http.interceptors.push((request, next) => {
        Object.keys(headers).forEach((key) => {
          if (request.url === 'calculate') {
            request.headers.set(key, headers[key])
          } else {
            request.headers.delete(key)
          }
        })
        next()
      })
    }
  }
  delete (uri, id) {
    this.initClient()

    return Vue.http.delete(uri + id).then((response) => {
      return response.data
    })
  }
  get (uri, headers = null) {
    this.initClient(headers)

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
