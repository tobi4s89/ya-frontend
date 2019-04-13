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
      <div class="row justify-content-center">
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
      </div>
    </div>
  </main>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Service from '@/services/ApiService'
import yaList from '@/components/List'

export default {
  name: 'home',
  components: {
    yaList
  },
  computed: {
    ...mapState([
      'properties',
      'users'
    ])
  },
  beforeRouteEnter (to, from, next) {
    Service.get('properties').then((propResponse) => {
      Service.get('users').then((userResponse) => {
        next(vm => {
          vm.setProperties(propResponse)
          vm.setUsers(userResponse)
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
      'setUsers'
    ]),
    openDialog(type) {
      let items = []
      let title = 'eigenschap'

      if (type === 'user-add') {
        items = this.properties
        title = 'gebruiker'
      }

      if (type === 'algorithm-calculate') {
        items = this.users
        title = 'Selecteer een vragende en een aangeboden gebruiker'
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
