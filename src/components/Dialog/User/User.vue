<template>
  <el-card class="popup-card w-100">
    <div slot="header">
      <h2>Eigenschappen {{ item.name }}</h2>
    </div>

    <div v-if="item.properties.length === 0">
      <i>Deze gebruiker heeft geen eigenschappen</i>
    </div>

    <div v-for="(prop, index) in properties" :key="index" class="d-flex align-items-center text item">
      <span class="mb-2"><i :class="{ required: prop.required }" class="el-icon-circle-check" /> {{ prop.name }}</span>
    </div>
  </el-card>
</template>

<script>
import Sort from '@/mixins/Sort'

export default {
  name: 'ya-user',
  mixins: [Sort],
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    properties () {
      return this.sortBy(this.item.properties, 'position')
    }
  }
}
</script>

<style lang="scss">
.el-icon-circle-check {
  &.required {
    color: gold;
  }
}
</style>
