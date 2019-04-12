<template>
  <el-card class="popup-card w-100">
    <div slot="header">
      <h2>Eigenschappen {{ item.name }}</h2>
    </div>

    <div v-if="item.properties.length === 0">
      <i>Deze gebruiker heeft geen eigenschappen</i>
    </div>

    <div v-for="(prop, index) in item.properties" :key="index" class="d-flex align-items-center text item">
      <span><i class="el-icon-circle-check" /> {{ prop.name }}</span>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'ya-user',
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      title: 'Dit is het ya-user-list component.'
    }
  }
}
</script>
