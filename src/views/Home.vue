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
        >
          Start
        </el-button>
      </div>
    </div>
  </main>
</template>

<script>
import { mapMutations } from 'vuex'
import Service from '@/services/ApiService'
import yaList from '@/components/List'

export default {
  name: 'home',
  components: {
    yaList
  },
  data () {
    return {
      properties: [],
      users: []
    }
  },
  beforeRouteEnter (to, from, next) {
    Service.get('properties').then((propResponse) => {
      Service.get('users').then((userResponse) => {
        next(vm => {
          vm.properties = propResponse
          vm.users = userResponse
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
      'setDialog'
    ]),
    openDialog(type) {
      let data = {
        type: type,
        content: {
          name: type === 'user-add' ? 'gebruiker' : 'eigenschap',
          properties: type === 'user-add' ? this.properties : []
        },
        fullscreen: true,
        visible: true
      }

      this.setDialog(data)
    }
  }
}
</script>
