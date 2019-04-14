<template>
  <main class="home d-flex h-100">
    <div class="container align-self-center">
      <div class="row justify-content-center mb-3">
        <div class="col-12 col-md-6 mb-3 mb-md-0">
          <ya-list
            :items="properties"
            :title="'eigenschappen'"
          />
        </div>
        <div class="col-12 col-md-6">
          <ya-list
            :items="users"
            :title="'gebruikers'"
            :type="'user'"
          />
        </div>
      </div>
      <div class="row justify-content-center mb-4">
        <el-button
          class="m-1"
          type="primary"
          round
          @click="openDialog('property-add')"
        >
          Voeg een eigenschap toe
        </el-button>
        <el-button
          v-if="properties.length"
          class="m-1"
          type="primary"
          round
          @click="openDialog('user-add')"
        >
          Voeg een gebruiker toe
        </el-button>
        <el-button
          v-if="properties.length && users.length > 1"
          class="m-1"
          type="success"
          round
          @click="openDialog('algorithm-calculate')"
        >
          Start
        </el-button>
        <el-button
          v-if="reports.length"
          class="m-1"
          type="info"
          plain
          round
          @click="openDialog('report-list')"
        >
          Bekijk rapportages
        </el-button>
      </div>
      <div class="row justify-content-center bottom-links">
        <a href="https://www.itsallyours.nl/pdf/alg_vb1.pdf" target="_blank">Algoritme voorbeeld 1</a>&nbsp;|&nbsp;
        <a href="https://www.itsallyours.nl/pdf/alg_vb2.pdf" target="_blank">Algoritme voorbeeld 2</a>&nbsp;|&nbsp;
        <a href="https://www.itsallyours.nl/pdf/alg_vb3.pdf" target="_blank">Algoritme voorbeeld 3</a>
      </div>
    </div>
  </main>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Service from '@/services/ApiService'
import DbService from '@/services/DbService'
import yaList from '@/components/List'

export default {
  name: 'home',
  components: {
    yaList
  },
  computed: {
    ...mapState([
      'properties',
      'reports',
      'users'
    ])
  },
  beforeRouteEnter (to, from, next) {
    Service.get('properties').then((propResponse) => {
      Service.get('users').then((userResponse) => {
        next(vm => {
          vm.setProperties(propResponse)
          vm.setUsers(userResponse)

          if (window.indexedDB) {
            DbService.readAllData('reports').then((response) => {
              vm.setReports(response)
            })
          }
        })
      }, (err) => {
        console.warn(err)
      })
    }, (err) => {
      console.warn(err)
    })
  },
  methods: {
    ...mapMutations([
      'setDialog',
      'setProperties',
      'setReports',
      'setUsers'
    ]),
    openDialog(type) {
      let items
      let title

      switch (type) {
        case 'user-add':
          items = this.properties
          title = 'gebruiker'
          break
        case 'algorithm-calculate':
          items = this.users
          title = 'Selecteer een vragende en een aangeboden gebruiker'
          break
        case 'report-list':
          items = this.reports
          title = 'Opgeslagen rapportages'
          break
        default:
          items = []
          title = 'eigenschap'
      }

      let data = {
        type: type,
        content: {
          name: title,
          data: items
        },
        fullscreen: true,
        visible: true
      }

      this.setDialog(data)
    }
  }
}
</script>
