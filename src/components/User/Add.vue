<template>
  <div class="add-user w-100">
    <div class="container">
      <div class="row mb-4">
        <div class="col-12">
          <el-card>
            <div slot="header">
              <h2>Toevoegen gebruiker</h2>
            </div>

            <el-input
              v-model="name"
              placeholder="Vul de naam van de gebruiker in"
            >
              <template slot="prepend">Naam</template>
            </el-input>
          </el-card>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-6">
          <el-card class="h-100">
            <div slot="header">
              <h2>Alle eigenschappen</h2>
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
              <h2>Actieve eigenschappen</h2>
            </div>
            <draggable v-model="userProps" class="list">
              <div
                v-for="(prop, index) in userProps"
                :key="prop.id"
                class="d-flex align-items-center cursor-pointer p-2"
              >
                <i class="drag el-icon-sort mr-2" />
                <strong>
                  <span
                    class="pos d-inline-block mr-2"
                    :class="{ required: prop.required }"
                  >
                    {{ index + 1 }}
                  </span>
                  {{ prop.name }}
                </strong>
                <div class="ml-auto">
                  <small></small>
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
    </div>
  </div>

</template>

<script>
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
      name: '',
      propList: [],
      userProps: []
    }
  },
  computed: {
    list () {
      return this.sortByString(this.propList, 'name')
    }
  },
  methods: {
    addToList (item) {
      let index = this.propList.indexOf(item)
      this.propList.splice(index, 1)

      this.userProps.push(item)
    },
    removeFromList (item) {
      let index = this.userProps.indexOf(item)
      this.userProps.splice(index, 1)

      this.propList.push(item)
    }
  },
  mounted () {
    let propClone = JSON.parse(JSON.stringify(this.item.properties))

    propClone.forEach((prop) => {
      prop.required = true
      prop.position = null

      this.propList.push(prop)
    })
  }
}
</script>

<style lang="scss">
.add-user {
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
