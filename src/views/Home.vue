<template lang="pug">
.home(v-loading='state.loading')
  .teachers
    h3 * 선생님 목록 *
    div.teacher(v-for="teacher in globalState.teachers" :key="teacher._id")
      h4.teacherName {{teacher.name}}
      el-tag.item(v-for="student in teacher.students" :key="student._id") {{student.name}}
    
</template>

<script lang="ts">
import {createComponent, onBeforeMount, onMounted} from '@vue/composition-api'
import {
  useState,
  useBeforeMount,
  useHandleSave,
  IState,
  useGlobalState,
  useHandleDateChange,
  useHandleTeacherChange,
  useHandleEdit,
  useHandleRemove,
} from './home.fn'
import EditPoint from '../components/EditPoint.vue'
import ReadPoint from '../components/ReadPoint.vue'
import {IGlobalState, IPoint, ITeacher} from '../biz/type'

export default {
  name: 'v-home',
  components: {EditPoint, ReadPoint},
  setup(props: any, {root}: any) {
    const globalState: IGlobalState = useGlobalState()
    const state: IState = useState()
    onBeforeMount(useBeforeMount({state, globalState}))
    return {
      state,
      globalState,
    }
  },
}
</script>
<style scoped lang="stylus">
.home {
  // margin: 0 10px;
  padding: 5px;
  text-align: left;

  .teachers {
    .teacher {
      margin: 20px 0;
      .teacherName {
        margin: 10px 0 3px 0;
      }

      .item {
        margin: 2px 3px ;
      }
    }
  }
}
</style>
