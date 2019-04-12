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
import yaUser from '@/components/User/User'
import yaUserAdd from '@/components/User/Add'

export default {
  name: 'ya-dialog',
  components: {
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
