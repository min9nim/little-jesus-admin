<template lang="pug">
.home(v-loading='state.loading')
  h3 코드매핑({{$store.state.students.length}})
  .students
    .student(v-for="(student, index) in $store.state.students" :key="student._id" v-loading="student.loading")
      el-input.input-student-name(
        v-if="student.editable"
        v-model="student.no"
        :ref="student._id"
        size="mini"
        @keyup.enter.native="handleStudentNameConfirm(student)"
        @blur="handleStudentNameConfirm(student)"
      )
      el-tag.studentName(
        v-else
        :disable-transitions="true"
        :type="!student.no ? 'danger' : ''"
        @click="handleStudentClick(student)"
      ) {{student.name}}: {{student.no}}
</template>

<script lang="ts">
import {createComponent, onBeforeMount, onMounted, watch} from '@vue/composition-api'
import {useState, IState, useHandleStudentClick, useHandleStudentNameConfirm} from './code.fn'
import {remove, equals, propEq, eqProps, clone} from 'ramda'
import {exclude} from 'mingutils'
import useIntervalCall from 'interval-call'
import {initStudents} from './home.fn'
import createLogger from 'if-logger'
const logger = createLogger().addTags('Code.vue')

const intervalCall = useIntervalCall(1000)

export default {
  name: 'v-code',
  setup(props: any, {root, refs}: any) {
    const state: IState = useState({root})
    // @ts-ignore
    const handleStudentClick = useHandleStudentClick({root, refs})
    // @ts-ignore
    const handleStudentNameConfirm = useHandleStudentNameConfirm(state)
    watch(
      () => root.$store.state.students.length,
      () => {
        const l = logger.addTags('watch')
        l.debug('root.$store.state.students.length', root.$store.state.students.length)
        if (root.$store.state.students.length > 0) {
          state.originalStudents = clone(root.$store.state.students)
          l.info('root.$store.state.students cloned to state.originalStudents')
        }
      },
    )
    onMounted(async () => {
      const l = logger.addTags('onMounted')
      l.debug('root.$store.state.students.length', root.$store.state.students.length)
      if (root.$store.state.students.length === 0) {
        await initStudents({root, state})
      }
    })
    return {
      state,
      handleStudentNameConfirm: intervalCall(handleStudentNameConfirm),
      handleStudentClick,
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

  .students {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .student {
      display: inline-block;
      margin: 3px 4px;
      width: 100px;

      .input-student-name {
        display: inline-block;
        width: 70px;
        height: 32px;
        margin-left: 0;
        vertical-align: bottom;
      }

      .studentName {
        cursor: pointer;

        h4 {
          margin: 10px 0 3px 0;
        }
      }
    }
  }

  .new-student {
    margin: 10px 10px 0 3px;

    .input-new-tag {
      width: 90px;
      margin-left: 0;
      vertical-align: bottom;
    }
  }
}
</style>
