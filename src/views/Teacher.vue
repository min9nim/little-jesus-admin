<template lang="pug">
.home(v-loading='state.loading')
  .teachers
    h3 선생님 목록
    .no-result(v-if="globalState.teachers.length === 0") 선생님을 추가해 주세요
    .teacher(v-for="(teacher, index) in globalState.teachers" :key="teacher._id" v-loading="teacher.loading")
      el-tag.teacherName(
        closable
        @close="handleClose(teacher, index)"
      ) {{teacher.name + ' (' + teacher.students.length + ')'}}
    .new-teacher
      el-input.input-new-tag(
        v-if="state.inputVisible"
        v-model="state.newTeacherName"
        ref="saveTagInput"
        size="mini"
        @keyup.enter.native="$refs.saveTagInput.blur"
        @blur="handleInputConfirm"
      )
      el-button.button-new-tag(
        v-else
        size="small"
        @click="showInput"
      ) + 선생님 추가
</template>

<script lang="ts">
import {createComponent, onBeforeMount, onMounted} from '@vue/composition-api'
import {useBeforeMount, useHandleSave, useGlobalState, useHandleEdit} from './home.fn'
import {useState, IState, useHandleClose, useHandleInputConfirm, useShowInput} from './teacher.fn'
import {IGlobalState, IPoint, ITeacher, IStudent} from '../biz/type'
import {remove, equals, propEq, eqProps} from 'ramda'
import {exclude} from '../utils'

export default {
  name: 'v-teacher',
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

  .teachers {
    .teacher {
      margin: 10px 10px;

      .teacherName {
        h4 {
          margin: 10px 0 3px 0;
        }
      }
    }
  }

  .new-teacher {
    margin: 0 10px;

    .input-new-tag {
      width: 90px;
      margin-left: 0;
      vertical-align: bottom;
    }
  }
}
</style>
