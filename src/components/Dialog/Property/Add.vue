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
              ref="addProperty"
              :model="addProperty"
              :rules="rules"
              status-icon
              @submit.prevent.native
            >
              <el-form-item
                prop="name"
              >
                <el-input
                  ref="name"
                  v-model="addProperty.name"
                  placeholder="Vul de naam van een eigenschap in (bijv. Loyaal)"
                  @keyup.enter.native="submitProperty"
                >
                  <template slot="prepend">Naam</template>
                </el-input>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </div>
      <div class="row justify-content-center">
        <el-button
          type="success"
          round
          @click="submitProperty"
        >
          Eigenschap opslaan
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Service from '@/services/ApiService'

export default {
  name: 'ya-property-add',
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
      addProperty: {
        name: ''
      },
      rules: {
        name: [{
          required: true,
          message: 'Naam is verplicht'
        }]
      }
    }
  },
  computed: {
    ...mapState([
      'properties'
    ])
  },
  methods: {
    ...mapMutations([
      'setProperties'
    ]),
    submitProperty () {
      this.$refs['addProperty'].validate((valid) => {
        if (valid) {
          let newProp = {
            name: this.addProperty.name
          }
          Service.post('properties', newProp).then((response) => {
            let properties = JSON.parse(JSON.stringify(this.properties))
            newProp.id = response.propertyId
            properties.push(newProp)

            // Set property list with new property
            this.setProperties(properties)

            // Close dialog with default data
            this.$parent.$parent.updateDialog(false)

            this.$message({
              message: this.addProperty.name + ' is opgeslagen',
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
  }
}
</script>
