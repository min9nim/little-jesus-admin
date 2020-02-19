import {reactive} from '@vue/composition-api'
import {IStudent} from '../biz/type'
import {req, errMsg} from '@/utils'
import {qUpdateStudent} from '@/biz/query'
import {MessageBox, Notification} from 'element-ui'
import Vue from 'vue'
import createLogger from 'if-logger'
import {go, findById, removeById} from 'mingutils'
import {find, propEq} from 'ramda'

const logger = createLogger().addTags('student.fn.ts')

export const originalStudents: IStudent[] = []

export interface IState {
  loading: boolean
  inputVisible: boolean
  newStudentName: string
}

export function useState(): IState {
  return reactive<IState>({
    loading: false,
    inputVisible: false,
    newStudentName: '',
  })
}

export function useHandleInputConfirm(state: IState, root: Vue) {
  return async () => {
    const l = logger.addTags('useHandleInputConfirm')
    try {
      if (state.newStudentName) {
        const sameName = go(originalStudents, find(propEq('name', state.newStudentName)))
        if (sameName) {
          await MessageBox.alert('동일한 이름이 존재합니다. 다른 이름을 입력해 주세요.', '', {
            type: 'warning',
          })
          state.inputVisible = false
          state.newStudentName = ''
          return
        }

        state.loading = true
        const newStudent: any = root.$store.dispatch('addStudent', {name: state.newStudentName})
        state.loading = false
        originalStudents.push(newStudent)
        // @ts-ignore
        Notification.success({
          message: state.newStudentName + ' 어린이 추가 완료',
          position: 'bottom-right',
        })
      }
      state.inputVisible = false
      state.newStudentName = ''
    } catch (e) {
      state.loading = false
      console.error(e)
      MessageBox.alert(e.message, {type: 'warning'})
    }
  }
}

export function useHandleClose(state: IState, root: any) {
  return async (student: IStudent, index: number) => {
    try {
      await MessageBox.confirm(`${student.name} 어린이를 삭제합니다`, {type: 'warning'})
      await MessageBox.confirm(
        `'${student.name}' 가 삭제될 경우 기존 입력되었던 모든 포인트가 함께 삭제되며 복원은 불가합니다. 정말 '${student.name}' 어린이를 삭제하시겠습니까?`,
        {type: 'warning'},
      )
      state.loading = true
      await root.$store.dispatch('removeStudent', {_id: student._id})
      state.loading = false
      // @ts-ignore
      Notification.success({message: student.name + ' 어린이 삭제 완료', position: 'bottom-right'})

      // originalStudents 에서도 삭제
      const idx = originalStudents.findIndex(propEq('_id', student._id))
      originalStudents.splice(idx, 1)
    } catch (e) {
      state.loading = false
      if (e !== 'cancel') {
        console.error(e)
        MessageBox.alert(errMsg(e), {type: 'warning'})
      }
    }
  }
}

export function useHandleStudentClick({root, refs}: any) {
  return (student: IStudent) => {
    student.editable = true
    root.$nextTick(() => {
      // console.log(refs, student._id, refs[student._id])
      refs[student._id][0].$refs.input.focus()
    })
  }
}

export function useHandleStudentNameConfirm(state: IState) {
  return async (student: IStudent) => {
    const l = logger.addTags('useHandleStudentNameConfirm')
    try {
      if (student.name) {
        const sameName = go(originalStudents, find(propEq('name', student.name)))
        if (sameName) {
          // 동일한 이름인 경우 그냥 리턴
          l.info('이름 변경사항 없음')
          student.editable = false
          return
        }

        student.loading = true
        await req(qUpdateStudent, {_id: student._id, name: student.name})
        student.loading = false

        const originalStudent = go(originalStudents, findById(student._id))
        originalStudent.name = student.name

        // @ts-ignore
        Notification.success({
          message: student.name + ' 이름 수정 완료',
          position: 'bottom-right',
        })
      }
      student.editable = false
    } catch (e) {
      state.loading = false
      console.error(e)
      MessageBox.alert(e.message, {type: 'warning'})
    }
  }
}
