<template lang="pug">
.home(v-loading='state.loading')
  .teachers
    h3 선생님&학생 현황
    .no-result(v-if="globalState.teachers.length === 0") 선생님을 추가해 주세요
    .teacher(v-for="teacher in globalState.teachers" :key="teacher._id")
      .teacherName
        h4 {{teacher.name}}
      .no-result(v-if="teacher.students.length === 0") 반 학생을 추가해 주세요
      .item(v-for="(student, index) in teacher.students" :key="student._id")
        el-tag(
          closable
          @close="handleClose(teacher, student)"
        ) {{student.name}}
      .new-student(v-if="state.studentsLeft.length > 0")
        el-select.studentsLeft(
          v-model="teacher.newStudentId"
          placeholder="학생 추가"
          size="mini"
          @change="handleNewStudentChange(teacher)"
        )
          el-option.newStudent(
            v-for="item in state.studentsLeft"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          )
    
</template>

<script lang="ts">
import {createComponent, onBeforeMount, onMounted} from '@vue/composition-api'
import {
  useState,
  useBeforeMount,
  useHandleSave,
  IState,
  useGlobalState,
  useHandleEdit,
  useHandleClose,
  useHandleNewStudentChange,
} from './home.fn'
import EditPoint from '../components/EditPoint.vue'
import ReadPoint from '../components/ReadPoint.vue'
import {IGlobalState, IPoint, ITeacher, IStudent} from '../biz/type'
import {remove, equals, propEq, eqProps} from 'ramda'
import {exclude} from '../utils'

export default {
  name: 'v-home',
  components: {EditPoint, ReadPoint},
  setup(props: any, {root}: any) {
    const globalState = useGlobalState()
    const state: IState = useState()
    onBeforeMount(useBeforeMount({state, globalState}))
    return {
      state,
      globalState,
      handleClose: useHandleClose(state),
      handleNewStudentChange: useHandleNewStudentChange(state),
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
        h4 {
          margin: 10px 0 3px 0;
        }
      }

      .item {
        margin: 2px 3px;
        display: inline-block;
      }

      .new-student {
        margin-top: 5px;

        .studentsLeft {
          width: 100px;
        }
      }
    }
  }
}
</style>
