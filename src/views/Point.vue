<template lang="pug">
.home(v-loading='state.loading')
  .points
    h3 포인트 관리
    .no-result(v-if="state.menus.length === 0") 포인트 항목을 추가해 주세요
    .point(v-for="item in state.menus" :key="item._id" v-loading="state.loading")
      el-card(shadow="hover")
        .pointLabel(slot="header")
          h4 {{item.label}}
        .item
          .label 형태
          .value {{item.type}}
        .item 
          .label 가중치
          .value {{item.priority}}
        .item
          .label 숨김여부
          .value {{item.hidden}}
</template>

<script lang="ts">
import {createComponent, onBeforeMount, onMounted, reactive} from '@vue/composition-api'
import {remove, equals, propEq, eqProps} from 'ramda'
import {useBeforeMount} from './point.fn'

export default {
  name: 'v-point',
  setup(props: any, {root}: any) {
    const state = reactive({
      menus: [],
      loading: false,
    })
    onBeforeMount(useBeforeMount({state}))
    return {
      state,
    }
  },
}
</script>
<style scoped lang="stylus">
.home {
  // margin: 0 10px;
  padding: 0 5px;
  text-align: left;

  .points {
    h3 {
      margin-top: 0;
    }

    .point {
      margin: 15px 0;

      .pointLabel {
        h4 {
          margin: 0;
        }
      }

      .item + .item {
        margin: 5px 0;
      }

      .item {
        font-size: 14px;
        display: flex;

        .label {
          width: 80px;
        }

        .value {
          flex: 1;
        }
      }
    }
  }
}
</style>
