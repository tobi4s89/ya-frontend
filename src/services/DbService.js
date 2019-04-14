/* eslint-disable */
import idb from 'idb'

class DbService {
  constructor () {
    this.module = 'ya-frontend'
  }
  clearAllData (st) {
    return this.dbPromise().then((db) => {
      let tx = db.transaction([st], 'readwrite')
      let store = tx.objectStore(st)
      store.clear()
      return tx.complete
    })
  }
  dbPromise () {
    return idb.open(this.module, 1, (db) => {
      switch (db.oldVersion) {
        case 0:
        // a placeholder case so that the switch block will
        // execute when the database is first created
        // (oldVersion is 0)
        case 1:
          // Creating the reports object store
          db.createObjectStore('reports', { autoIncrement: true })
      }
    })
  }
  addItem (st, item, clear = null) {
    if (clear) {
      this.clearAllData(st).then(() => {
        return this.writeData(st, item)
      })
    } else {
      return this.writeData(st, item)
    }
  }
  readAllData (st) {
    return this.dbPromise().then((db) => {
      let tx = db.transaction(st, 'readonly')
      let store = tx.objectStore(st)
      return store.getAll()
    })
  }
  writeData (st, data) {
    return this.dbPromise().then((db) => {
      let tx = db.transaction(st, 'readwrite')
      let store = tx.objectStore(st)
      store.put(data)
      return tx.complete
    })
  }
}

export default new DbService()
