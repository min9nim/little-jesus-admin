<template lang="pug">
.home(v-loading='state.loading')
  .students
    h3 학생 목록
    .student(v-for="(student, index) in globalState.students" :key="student._id" v-loading="student.loading")
      el-tag.studentName(
        closable
        @close="handleClose(student, index)"
      ) {{student.name}}
    .new-student
      el-input.input-new-tag(
        v-if="state.inputVisible"
        v-model="state.newStudentName"
        ref="saveTagInput"
        size="mini"
        @keyup.enter.native="$refs.saveTagInput.blur"
        @blur="handleInputConfirm"
      )
      el-button.button-new-tag(
        v-else
        size="small"
        @click="showInput"
      ) + 학생 추가
</template>

<script lang="ts">
import {createComponent, onBeforeMount, onMounted} from '@vue/composition-api'
import {useBeforeMount, useHandleSave, useGlobalState, useHandleEdit} from './home.fn'
import {useShowInput} from './teacher.fn'
import {useState, IState, useHandleClose, useHandleInputConfirm} from './student.fn'
import {IGlobalState, IPoint, ITeacher, IStudent} from '../biz/type'
import {remove, equals, propEq, eqProps} from 'ramda'
import {exclude} from '../utils'

export default {
  name: 'v-student',
  setup(props: any, {root, refs}: any) {
    const globalState = useGlobalState()
    const state: IState = useState()
    // @ts-ignore
    const handleClose = useHandleClose(state, globalState)
    onBeforeMount(useBeforeMount({state, globalState}))
    // @ts-ignore
    const handleInputConfirm = useHandleInputConfirm(state, globalState)
    const showInput = useShowInput({state, root, refs})
    return {
      state,
      globalState,
      handleClose,
      showInput,
      handleInputConfirm,
    }
  },
}
</script>
<style scoped lang="stylus">
.home {
  // margin: 0 10px;
  padding: 5px;
  text-align: left;

  .students {
    .student {
      margin: 10px 10px;

      .studentName {
        h4 {
          margin: 10px 0 3px 0;
        }
      }
    }
  }

  .new-student {
    margin: 0 10px;

    .input-new-tag {
      width: 90px;
      margin-left: 0;
      vertical-align: bottom;
    }
  }
}
</style>
