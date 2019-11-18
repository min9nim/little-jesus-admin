<template lang="pug">
.home(v-loading='state.loading')
  .points
    h3 포인트 관리
    .no-result(v-if="state.menus.length === 0") 포인트 항목을 추가해 주세요
    .point(v-for="item in state.menus" :key="item._id" v-loading="state.loading")
      el-card(shadow="hover")
        div(slot="header")
          .pointName
            h4 {{item.label}}
        div 형태 {{item.type}}
        div 가중치 {{item.priority}}
        div 숨김여부 {{item.hidden}}
        div type {{item.type}}
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
  padding: 5px;
  text-align: left;

  .points {
    h3 {
      margin-top: 0;
    }

    .point {
      margin: 20px 0;

      .pointName {
        h4 {
          margin: 0;
        }
      }

      .point-undefined {
        color: #888;

        h4 {
          margin: 10px 0 3px 0;
        }
      }

      .item {
        margin: 2px 3px;
        display: inline-block;
      }

      .new-student {
        margin: 5px 3px;

        .studentsLeft {
          width: 100px;
        }
      }
    }
  }
}
</style>
