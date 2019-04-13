<template>
  <el-card class="item-list">
    <div slot="header" class="clearfix">
      <h2>Alle {{ title }} ({{ items.length }})</h2>
    </div>

    <div class="list-container position-relative pr-3">
      <div v-if="items.length === 0">
        <i>Voeg {{ title }} toe om te beginnen</i>
      </div>
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
.item-list {
  .list-container {
    height: 300px;
    overflow-y: scroll;
    padding-bottom: 30px;

    @include media-breakpoint-down(sm) {
      height: 200px;
    }
  }
  .el-card__body {
    position: relative;
    padding-bottom: 20px;

    &::after {
      content: '';
      display: block;
      height: 40px;
      position: absolute;
      bottom: 20px;
      left: 0;
      right: 0;
      /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#ffffff+0,ffffff+100&0+0,1+100 */
      background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%); /* FF3.6-15 */
      background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%); /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=0 ); /* IE6-9 */
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
}
</style>

