<template>
  <div class="calculate w-100">
    <div class="container">
      <div class="row mb-3">
        <div class="col-12">
          <el-card class="popup-card w-100 mb-4">
            <div slot="header">
              <h2>{{ item.name }}</h2>
            </div>
            <div class="container">
              <div class="row align-items-center compare-container my-4">
                <div class="col-12 col-md-4 d-flex justify-content-center">
                  <el-select
                    v-model="firstUser"
                    placeholder="Selecteer een vragende gebruiker"
                    class="w-100"
                    @change="score = -1"
                  >
                    <el-option
                      v-for="user in item.data"
                      :key="user.id"
                      :label="user.name"
                      :value="user.id">
                    </el-option>
                  </el-select>
                </div>
                <div class="col-12 col-md-4 d-flex justify-content-center">
                  <radial-progress-bar
                    v-if="score !== -1"
                    :animate-speed="3000"
                    :completed-steps="score === 0 ? 100 : score"
                    :diameter="150"
                    :inner-stroke-color="'#efefef'"
                    :start-color="score === 0 ? '#F56C6C' : '#67C23A'"
                    :stroke-width="15"
                    :stop-color="score === 0 ? '#F56C6C' : '#67C23A'"
                    :total-steps="100"
                  >
                    <span v-if="score > 0">{{ score }}%</span>
                    <span v-else class="no-match">X</span>
                  </radial-progress-bar>
                  <el-button
                    v-else
                    type="primary"
                    round
                    plain
                    @click="calculate"
                  >
                    Match!
                  </el-button>
                </div>
                <div class="col-12 col-md-4 d-flex justify-content-center">
                  <el-select
                    v-model="secondUser"
                    placeholder="Selecteer een aangeboden gebruiker"
                    class="w-100"
                    @change="score = -1"
                  >
                    <el-option
                      v-for="user in item.data"
                      :key="user.id"
                      :label="user.name"
                      :value="user.id">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <div
        v-if="score !== -1"
        class="row mb-3"
      >
        <div class="col-12">
          <ya-report
            :first-name="firstName"
            :matching-items="matchingItems"
            :score="score"
            :second-name="secondName"
          />
        </div>
      </div>
      <div
        v-if="score > 0"
        class="row justify-content-center"
      >
        <el-button
          v-if="indexedDb"
          type="primary"
          round
          @click="saveData"
        >
          Sla rapport op
        </el-button>
      </div>
    </div>
  </div>

</template>

<script>
import { mapMutations, mapState } from 'vuex'
import RadialProgressBar from 'vue-radial-progress'
import yaReport from '@/components/Report'
import Service from '@/services/ApiService'
import DbService from '@/services/DbService'

export default {
  name: 'ya-algorithm-calculate',
  components: {
    RadialProgressBar,
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
      firstName: '',
      firstUser: null,
      matchingItems: [],
      score: -1,
      secondName: '',
      secondUser: null
    }
  },
  computed: {
    ...mapState([
      'reports'
    ]),
    indexedDb () {
      return window.indexedDB
    }
  },
  methods: {
    ...mapMutations([
      'setReports'
    ]),
    calculate () {
      if (this.firstUser && this.secondUser) {
        let uri = 'calculate?first_user_id=' + this.firstUser + '&second_user_id=' + this.secondUser

        Service.get(uri).then((response) => {
          let matchingItems = []
          Object.keys(response.matchingItems).forEach((key) => {
            matchingItems.push(response.matchingItems[key])
          })

          this.score = response.score
          this.firstName = response.firstUser
          this.secondName = response.secondUser
          this.matchingItems = matchingItems
        }, () => {
          this.$message({
            message: 'Oeps! Er is iets mis gegaan.',
            showClose: true,
            type: 'error'
          })
        })
      } else {
        this.$message({
          message: 'Je hebt geen 2 gebruikers geselecteerd.',
          showClose: true,
          type: 'error'
        })
      }
    },
    saveData () {
      let data = {
        firstName: this.firstName,
        matchingItems: this.matchingItems,
        score: this.score,
        secondName: this.secondName
      }

      DbService.addItem('reports', data).then(() => {
        let reports = JSON.parse(JSON.stringify(this.reports))
        reports.push(data)

        // Set report list with new report
        this.setReports(reports)

        this.$message({
          message: 'Rapport is opgelagen in je browsergegevens.',
          showClose: true,
          type: 'success'
        })

        // Close dialog
        this.$parent.$parent.updateDialog(false)
      })
    }
  }
}
</script>

<style lang="scss">
.compare {
  &-container {
    height: 150px;

    .radial-progress-inner {
      span {
        font-weight: bold;
        font-size: 28px;
        color: $--color-success;

        &.no-match {
          color: $--color-danger;
          font-size: 50px;
        }
      }
    }
  }
}
</style>
