<template lang="pug">
.home(v-loading='state.loading')
  .teachers
    h3 선생님&학생 현황
    .no-result(v-if="$store.state.teachers.length === 0") 선생님을 추가해 주세요
    template(v-if="$store.state.teachers.length > 0")
      .teacher(v-for="teacher in $store.state.teachers" :key="teacher._id" v-loading="teacher.loading")
        el-card(shadow="hover")
          div(slot="header")
            .teacherName
              h4 {{teacher.name}}({{teacher.students.length}})
          .no-result(v-if="teacher.students.length === 0") 반 학생을 추가해 주세요
          .item(
            v-for="(student, index) in teacher.students"
            :key="student._id"
            v-loading="student.loading"
          )
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
    .teacher(v-if="state.studentsLeft.length > 0")
      .teacher-undefined
        h4 반미정
      .no-result(v-if="state.studentsLeft.length === 0") 모든 친구 반 배정 완료
      .item(v-for="(student, index) in state.studentsLeft" :key="student._id")
        el-tag(type="info") {{student.name}}    
</template>

<script lang="ts">
import {createComponent, onBeforeMount, onMounted} from '@vue/composition-api'
import {
  useState,
  useBeforeMount,
  IState,
  useHandleEdit,
  useHandleClose,
  useHandleNewStudentChange,
} from './home.fn'
import {IGlobalState, ITeacher, IStudent} from '../biz/type'
import {remove, equals, propEq, eqProps} from 'ramda'
import {exclude} from '../utils'

export default {
  name: 'v-home',
  setup(props: any, {root}: any) {
    const state: IState = useState()
    onBeforeMount(useBeforeMount({root, state}))
    return {
      state,
      studentMap: root.$store.getters.studentMap,
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
    h3 {
      margin-top: 0;
    }

    .teacher {
      margin: 20px 0;

      .teacherName {
        h4 {
          margin: 0;
        }
      }

      .teacher-undefined {
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
