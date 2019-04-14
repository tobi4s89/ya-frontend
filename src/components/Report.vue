<template>
  <el-card class="w-100">
    <div slot="header" class="d-flex align-items-center">
      <span
        v-if="score === 0"
        class="font-weight-bold"
      >
        Helaas! {{ firstName }} en {{ secondName }} hebben geen match.
        <span v-if="matchingItems.length">
          Eigenschappen die wél zijn overeengekomen:
        </span>
      </span>
      <span
        v-else
        class="font-weight-bold"
      >
        {{ firstName }} matcht met een score van {{ score }}% met {{ secondName }}! Deze eigenschappen komen overeen:
      </span>
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <ul class="matching-items">
        <li
          v-for="(item, index) in matchingItems"
          :key="item.id"
          class="d-flex align-items-center p-2"
        >
          <strong>
          <span
            class="pos d-inline-block mr-2"
            :class="{
              samePos: item.position === item.positionY,
              required: item.required
            }"
          >
            {{ index + 1 }}
          </span>
            {{ item.name }}
          </strong>
        </li>
      </ul>
      <radial-progress-bar
        v-if="progress"
        :animate-speed="3000"
        :completed-steps="score === 0 ? 100 : score"
        :diameter="100"
        :inner-stroke-color="'#efefef'"
        :start-color="score === 0 ? '#F56C6C' : '#67C23A'"
        :stroke-width="10"
        :stop-color="score === 0 ? '#F56C6C' : '#67C23A'"
        :total-steps="100"
      >
        <span v-if="score > 0">{{ score }}%</span>
        <span v-else class="no-match">X</span>
      </radial-progress-bar>
    </div>
  </el-card>
</template>

<script>
import RadialProgressBar from 'vue-radial-progress'

export default {
  name: 'ya-report',
  components: {
    RadialProgressBar
  },
  props: {
    firstName: {
      type: String,
      default: ''
    },
    matchingItems: {
      type: Array,
      default () {
        return []
      }
    },
    progress: {
      type: Boolean,
      default: false
    },
    score: {
      type: Number,
      default: 0
    },
    secondName: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.radial-progress-inner {
  span {
    font-weight: bold;
    font-size: 20px;
    color: $--color-success;

    &.no-match {
      color: $--color-danger;
      font-size: 40px;
    }
  }
}

.matching-items {
  span.pos {
    width: 29px;
    height: 29px;
    border-radius: 50%;
    background-color: $gray-500;
    text-align: center;
    line-height: 25px;
    color: $white;
    border-width: 2px;
    border-color: $gray-500;
    border-style: solid;

    &.required {
      border-color: gold;
    }

    &.samePos {
      background-color: $--color-success;
    }
  }
}
</style>
