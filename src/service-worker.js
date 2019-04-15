/* eslint-disable no-console */
workbox.setConfig({
  debug: false
})

let version = 'v1'

workbox.core.setCacheNameDetails({
  prefix: 'enjoj-business',
  suffix: version,
  precache: 'install-time',
  runtime: 'run-time'
})

workbox.skipWaiting()
workbox.clientsClaim()

self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})
