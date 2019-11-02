<template lang="pug">
.home 결과집계 화면 준비 중..
</template>

<script lang="ts">
import {createComponent, onBeforeMount} from '@vue/composition-api'
import {useGlobalState} from './home.fn'
import {IGlobalState, IPoint, ITeacher} from '../biz/type'

export default {
  name: 'v-points',
}
</script>
<style scoped lang="stylus">
.home {
  // margin: 0 10px;
  padding: 5px;
  text-align: left;

  .options {
    .teacher {
      width: 150px;
    }

    .date {
      margin-left: 5px;
      width: 140px;
    }
  }

  hr {
    margin-top: 30px;
  }

  .result {
    margin-top: 40px;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .teacher {
        margin: 0;
      }

      .btn {
        height: 25px;
        display: inline-block;
        margin-left: 15px;
        width: 45px;
        padding: 7px 3px;
      }
    }
  }
}
</style>
