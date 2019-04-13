<template>
  <el-dialog
    :fullscreen="$mq === 'sm' || dialog.fullscreen"
    :visible="dialog.visible"
    @update:visible="updateDialog"
  >
    <div class="container">
      <div class="row">
        <component
          :is="'ya-' + dialog.type"
          :key="dialog.type"
          :item="content"
        />
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import yaAlgorithmCalculate from '@/components/Dialog/Algorithm/Calculate'
import yaPropertyAdd from '@/components/Dialog/Property/Add'
import yaUser from '@/components/Dialog/User/User'
import yaUserAdd from '@/components/Dialog/User/Add'

export default {
  name: 'ya-dialog',
  components: {
    yaAlgorithmCalculate,
    yaPropertyAdd,
    yaUser,
    yaUserAdd
  },
  data () {
    return {
      content: {}
    }
  },
  computed: {
    ...mapState([
      'dialog'
    ])
  },
  methods: {
    ...mapMutations([
      'setDialog'
    ]),
    updateDialog (value) {
      let data = {
        type: '',
        content: {},
        fullscreen: false,
        visible: value
      }
      this.setDialog(data)
    }
  },
  mounted () {
    this.content = this.dialog.content
  }
}
</script>

<style lang="scss">
.el-dialog:not(.is-fullscreen) {
  width: 100%;
  max-width: 767px;
}
</style>
