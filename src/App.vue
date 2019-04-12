<template>
  <div id="app" class="h-100">
    <router-view/>

    <ya-dialog
      v-if="dialog.visible"
      :visibility.sync="dialog.visible"
      class="ya-dialog"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import yaDialog from '@/components/Dialog'

export default {
  components: {
    yaDialog
  },
  computed: {
    ...mapState([
      'dialog'
    ])
  }
}
</script>

<style lang="scss">
@import './assets/scss/styles.scss';
</style>
