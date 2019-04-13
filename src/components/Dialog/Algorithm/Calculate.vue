<template>
  <el-card class="popup-card w-100">
    <div slot="header">
      <h2>{{ item.name }}</h2>
    </div>
    <div class="container">
      <div class="row align-items-center">
        <div class="col-12 col-md-3 d-flex justify-content-center">
          <el-select v-model="firstUser" placeholder="Select">
            <el-option
              v-for="user in item.data"
              :key="user.id"
              :label="user.name"
              :value="user.id">
            </el-option>
          </el-select>
          {{ firstUser }}
        </div>
        <div class="col-12 col-md-6 d-flex justify-content-center">
          <el-button
            type="primary"
            round
            @click="calculate"
          >
            Match!
          </el-button>

        </div>
        <div class="col-12 col-md-3 d-flex justify-content-center">
          <el-select v-model="secondUser" placeholder="Select">
            <el-option
              v-for="user in item.data"
              :key="user.id"
              :label="user.name"
              :value="user.id">
            </el-option>
          </el-select>
          {{ secondUser }}
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import VueCircle from 'vue2-circle-progress'
import Service from '@/services/ApiService'

export default {
  name: 'ya-algorithm-calculate',
  components: {
    VueCircle
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
      fill : { gradient: ['red', 'green', 'blue'] },
      firstUser: null,
      score: null,
      secondUser: null
    }
  },
  methods: {
    calculate () {
      if (this.firstUser && this.secondUser) {
        let uri = 'calculate?first_user_id=' + this.firstUser + '&second_user_id=' + this.secondUser

        Service.get(uri).then((response) => {
          this.score = response.score
        }, () => {

        })
      } else {
        this.$message({
          message: 'Je hebt geen 2 gebruikers geselecteerd.',
          showClose: true,
          type: 'error'
        })
      }
    }
  }
}
</script>
