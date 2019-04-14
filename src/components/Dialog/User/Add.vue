<template>
  <div class="add-user w-100">
    <div class="container">
      <div class="row mb-4">
        <div class="col-12">
          <el-card>
            <div slot="header">
              <h2>Toevoegen {{ item.name }}</h2>
            </div>
            <el-form
              ref="addUser"
              :model="addUser"
              :rules="rules"
              status-icon
              @submit.prevent.native
            >
              <el-form-item
                prop="name"
              >
                <el-input
                  ref="name"
                  v-model="addUser.name"
                  placeholder="Vul de naam van de gebruiker in"
                  @keyup.enter.native="submitUser"
                >
                  <template slot="prepend">Naam</template>
                </el-input>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-12 col-md-6 mb-4 mb-md-0">
          <el-card class="h-100">
            <div slot="header">
              <h2 class="mb-1">Alle eigenschappen</h2>
              <small><i>Klik op het plusje om een eigenschap toe te voegen</i></small>
            </div>
            <ul class="list">
              <li
                v-for="(prop, index) in list"
                class="d-flex align-items-center p-2"
              >
                <strong>{{ prop.name }}</strong>
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-plus"
                  class="ml-auto"
                  circle
                  @click="addToList(prop)"
                />
              </li>
            </ul>
          </el-card>
        </div>

        <div class="col-12 col-md-6">
          <el-card class="h-100">
            <div slot="header">
              <h2 class="mb-1">Actieve eigenschappen</h2>
              <small><i>Sleep om te positioneren. Activeer switch als eigenschap overeen moet komen</i></small>
            </div>
            <draggable v-model="userProps" class="list">
              <div
                v-for="(prop, index) in userList"
                :key="prop.id"
                class="d-flex align-items-center cursor-pointer p-2"
              >
                <i class="drag el-icon-sort mr-2" />
                <strong>
                  <span
                    class="pos d-inline-block mr-2"
                    :class="{ required: prop.required }"
                  >
                    {{ prop.position = index + 1 }}
                  </span>
                  {{ prop.name }}
                </strong>
                <div class="ml-auto">
                  <el-switch
                    v-model="prop.required"
                    class="mr-3"
                  />
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-minus"
                    circle
                    @click="removeFromList(prop)"
                  />
                </div>
              </div>
            </draggable>
          </el-card>
        </div>
      </div>
      <div class="row justify-content-center">
        <el-button
          type="success"
          round
          @click="submitUser"
        >
          Gebruiker opslaan
        </el-button>
      </div>
    </div>
  </div>

</template>

<script>
import { mapMutations, mapState } from 'vuex'
import draggable from 'vuedraggable'
import Sort from '@/mixins/Sort'
import Service from '@/services/ApiService'

export default {
  name: 'ya-user-add',
  components: {
    draggable
  },
  mixins: [Sort],
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
      addUser: {
        name: ''
      },
      propList: [],
      rules: {
        name: [{
          required: true,
          message: 'Naam is verplicht'
        }]
      },
      userProps: []
    }
  },
  computed: {
    ...mapState([
      'users'
    ]),
    list () {
      return this.sortBy(this.propList, 'name')
    },
    userList () {
      return this.sortByBoolean(this.userProps, 'required')
    }
  },
  methods: {
    ...mapMutations([
      'setUsers'
    ]),
    addToList (item) {
      let index = this.propList.indexOf(item)
      this.propList.splice(index, 1)

      this.userProps.push(item)
    },
    removeFromList (item) {
      let index = this.userProps.indexOf(item)
      this.userProps.splice(index, 1)

      this.propList.push(item)
    },
    saveUser (newUser) {
      Service.post('users', newUser).then((response) => {
        let users = JSON.parse(JSON.stringify(this.users))
        newUser.id = response.userId
        users.push(newUser)

        // Set user list with new user
        this.setUsers(users)

        // Close dialog with default data
        this.$parent.$parent.updateDialog(false)

        this.$message({
          message: this.addUser.name + ' is opgeslagen',
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
    },
    submitUser () {
      this.$refs['addUser'].validate((valid) => {
        if (valid) {
          let newUser = {
            name: this.addUser.name,
            properties: this.userList
          }
          if (this.userList.length === 0) {
            this.$confirm('Weet je zeker dat je gebruiker ' + this.addUser.name + ' wilt toevoegen zonder eigenschappen?', {
              confirmButtonText: 'OK',
              cancelButtonText: 'Annuleren',
              type: 'warning'
            }).then(() => {
              this.saveUser(newUser)
            }).catch(() => {
              return
            })
          } else {
            this.saveUser(newUser)
          }
        } else {
          this.$message({
            message: 'Naam is een verplicht veld',
            showClose: true,
            type: 'error'
          })
          return false
        }
      })
    }
  },
  mounted () {
    this.$refs['name'].focus()
    let propClone = JSON.parse(JSON.stringify(this.item.data))

    propClone.forEach((prop) => {
      prop.required = false
      prop.position = null

      this.propList.push(prop)
    })
  }
}
</script>

<style lang="scss">
.add-user {
  .el-card__header {
    small {
      color: $gray-500;
      font-size: 90%;
    }
  }
  .el-form-item__error {
    display: none;
  }
  .el-icon-sort.drag {
    color: $gray-500;
    font-size: 18px;
  }
  .list {
    span.pos {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: $gray-500;
      text-align: center;
      line-height: 25px;
      color: $white;

      &.required {
        background-color: gold;
      }
    }
  }
}
</style>
