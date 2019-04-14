<template>
  <div class="report-list w-100">
    <div class="container">
      <div class="row mb-3">
        <div class="col-12">
          <el-card>
            <div slot="header">
              <h2>{{ item.name }}</h2>
            </div>
            <el-input
              v-model="searchWord"
              placeholder="Zoek op gebruiker"
              @keyup.enter.native="handleSearch"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="handleSearch"
              />
            </el-input>
          </el-card>
        </div>
      </div>
      <div
        v-for="(report, index) in results"
        class="row mb-3"
      >
        <div class="col-12">
          <ya-report
            :first-name="report.firstName"
            :matching-items="report.matchingItems"
            :progress="true"
            :score="report.score"
            :second-name="report.secondName"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import yaReport from '@/components/Report'

export default {
  name: 'ya-report-list',
  components: {
    yaReport
  },
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
      results: [],
      searchWord: ''
    }
  },
  methods: {
    handleSearch () {

    }
  },
  mounted () {
    this.results = this.item.data
  }
}
</script>

<style scoped>

</style>
