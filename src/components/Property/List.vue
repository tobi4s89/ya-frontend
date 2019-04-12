<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>{{ title }}</span>
    </div>
    <div v-for="(item, index) in items" :key="item.id" class="text item">
      {{ item.name }}
    </div>
  </el-card>
</template>

<script>
import Service from '@/services/ApiService'

export default {
  name: 'ya-property-list',
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
    }
  },
  methods: {
    delete (item) {

    }
  }
}
</script>

<style lang="scss">
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
</style>
