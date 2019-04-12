<template>
  <el-card>
    <div slot="header" class="clearfix">
      <h2>Alle {{ title }} ({{ items.length }})</h2>
    </div>

    <div v-if="items.length === 0">
      <i>Voeg {{ title }} toe om te beginnen</i>
    </div>

    <div class="list-container pr-3">
      <div v-for="(item, index) in items" :key="item.id" class="d-flex align-items-center text item">
        <i
          v-if="type === 'user' && item.properties.length"
          class="el-icon-info cursor-pointer mr-1"
          @click="openDialog(item)"
        />

        <span>{{ item.name }}</span>

        <el-button
          type="danger"
          size="mini"
          icon="el-icon-delete"
          class="ml-auto"
          circle
          @click="deleteItem(item)"
        />
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapMutations } from 'vuex'
import Service from '@/services/ApiService'

export default {
  name: 'ya-list',
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'property'
    }
  },
  methods: {
    ...mapMutations([
      'setDialog'
    ]),
    deleteItem (item) {
      this.$confirm('Weet je zeker dat je ' + item.name + ' wilt verwijderen?', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Annuleren',
        type: 'warning'
      }).then(() => {
        let uri = this.type === 'user' ? 'users/' : 'properties/'
        Service.delete(uri, item.id).then(() => {
          let index = this.items.indexOf(item)
          this.items.splice(index, 1)

          this.$message({
            message: item.name + ' is verwijderd',
            showClose: true,
            type: 'success'
          })
        }, () => {
          this.$message({
            message: 'Oeps! Er is iets mis gegaan',
            showClose: true,
            type: 'error'
          })
        })
      }).catch(() => {})
    },
    openDialog (item) {
      let data = {
        type: 'user',
        content: {
          name: item.name,
          properties: item.properties
        },
        fullscreen: false,
        visible: true
      }

      this.setDialog(data)
    }
  }
}
</script>

<style lang="scss">
.list-container {
  height: 300px;
  overflow-y: scroll;

  @include media-breakpoint-down(sm) {
    height: 200px;
  }
}
.el-icon-info {
  color: $gray-500;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 10px;
}
</style>

