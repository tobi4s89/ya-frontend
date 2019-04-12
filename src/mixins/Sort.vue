<script>
export default {
  methods: {
    sortByString (collection, key = null) {
      collection.sort((a, b) => {
        if (key) {
          a = a[key]
          b = b[key]
        }

        if (a > b) {
          return 1
        } else if (a < b) {
          return -1
        } else {
          return 0
        }
      })

      return collection
    }
  }
}
</script>
