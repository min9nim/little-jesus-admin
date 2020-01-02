<template lang="pug">
.home(v-loading='state.loading')
  h3 선생님 목록({{$store.state.teachers.length}})
  .teachers
    .no-result(v-if="$store.state.teachers.length === 0") 선생님을 추가해 주세요
    .teacher(v-for="(teacher, index) in $store.state.teachers" :key="teacher._id" v-loading="teacher.loading")
      el-input.input-teacher-name(
        v-show="teacher.editable"
        v-model="teacher.name"
        :ref="teacher._id"
        size="mini"
        @keyup.enter.native="handleTeacherNameConfirm(teacher)"
        @blur="handleTeacherNameConfirm(teacher)"
      )
      el-tag.teacherName(
        v-show="!teacher.editable"
        closable
        @click="handleTeacherClick(teacher)"
        @close="handleClose(teacher, index)"
      ) {{teacher.name + ' (' + teacher.students.length+ ')'}}
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
import {useBeforeMount, useHandleEdit} from './home.fn'
import {
  useState,
  IState,
  useHandleClose,
  useHandleTeacherClick,
  useHandleInputConfirm,
  useShowInput,
  useHandleTeacherNameConfirm,
} from './teacher.fn'
import {IGlobalState, ITeacher, IStudent} from '../biz/type'
import {remove, equals, propEq, eqProps, path} from 'ramda'
import {exclude} from '../utils'
import useIntervalCall from 'interval-call'

const intervalCall = useIntervalCall(1000)

export default {
  name: 'v-teacher',
  methods: {path},
  setup(props: any, {root, refs}: any) {
    const state: IState = useState()
    // @ts-ignore
    const handleClose = useHandleClose(state, root)
    onBeforeMount(useBeforeMount({state, root}))
    // @ts-ignore
    const handleInputConfirm = useHandleInputConfirm(state, root)
    const handleTeacherNameConfirm = useHandleTeacherNameConfirm(state)
    const showInput = useShowInput({state, root, refs})
    const handleTeacherClick = useHandleTeacherClick({root, refs})
    return {
      state,
      handleClose,
      showInput,
      handleInputConfirm,
      handleTeacherNameConfirm: intervalCall(handleTeacherNameConfirm),
      handleTeacherClick,
    }
  },
}
</script>
<style scoped lang="stylus">
.home {
  h3 {
    margin-top: 0;
  }

  // margin: 0 10px;
  padding: 5px;
  text-align: left;

  .teachers {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .teacher {
      display: inline-block;
      margin: 3px 5px;

      .input-teacher-name {
        display: inline-block;
        width: 80px;
        height: 32px;
        margin-left: 0;
        vertical-align: bottom;
      }

      .teacherName {
        cursor: pointer;

        h4 {
          margin: 10px 0 3px 0;
        }
      }
    }
  }

  .new-teacher {
    margin: 10px 0 0 3px;

    .input-new-tag {
      width: 90px;
      margin-left: 0;
      vertical-align: bottom;
    }
  }
}
</style>
<style lang="stylus">
.el-input--mini .el-input__inner {
  height: 32px;
  padding: 0 10px;
}
</style>