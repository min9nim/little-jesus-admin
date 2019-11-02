import {reactive} from '@vue/composition-api'
import {IGlobalState, IPoint, ITeacher, IStudent} from '../biz/type'
import {req, useIntervalCall} from '@/utils'
import moment from 'moment'
import {
  qCreatePoint,
  qTeachers,
  qUpdatePoint,
  qAddStudentToTeacher,
  qRemoveStudentToTeacher,
  qStudents,
  qRemoveTeacher,
  qCreateTeacher,
} from '@/biz/query'
import {MessageBox, Notification} from 'element-ui'
import {propEq, eqProps} from 'ramda'
import {exclude} from '../utils'
import {differenceWith, clone} from 'ramda'
import {useGlobalState} from './home.fn'

export interface IState {
  loading: boolean
  inputVisible: boolean
  newTeacherName: string
}

export function useState(): IState {
  return reactive<IState>({
    loading: false,
    inputVisible: false,
    newTeacherName: '',
  })
}

export function useHandleClose(state: IState, globalState: IGlobalState) {
  return async (teacher: ITeacher, index: number) => {
    try {
      await await MessageBox.confirm(`${teacher.name} 선생님을 삭제합니다`, {type: 'warning'})
      state.loading = true
      await req(qRemoveTeacher, {_id: teacher._id})
      state.loading = false
      // @ts-ignore
      Notification.success({message: teacher.name + ' 선생님 삭제 완료', position: 'bottom-right'})
      // globalState.teachers = exclude(eqProps('_id', teacher))(globalState.teachers)
      globalState.teachers.splice(index, 1)
    } catch (e) {
      if (e !== 'cancel') {
        console.error(e)
        MessageBox.alert(e.message, {type: 'warning'})
      }
    }
  }
}

export function useHandleInputConfirm(state: IState, globalState: IGlobalState) {
  return async () => {
    console.log('handleInputConfirm called', state.newTeacherName)
    if (state.newTeacherName) {
      state.loading = true
      const newTeacher = await req(qCreateTeacher, {name: state.newTeacherName})
      state.loading = false
      globalState.teachers.push({_id: newTeacher._id, name: state.newTeacherName, students: []})
      // @ts-ignore
      Notification.success({
        message: state.newTeacherName + ' 선생님 추가 완료',
        position: 'bottom-right',
      })
    }
    state.inputVisible = false
    state.newTeacherName = ''
  }
}

export function useShowInput({state, root, refs}: any) {
  return () => {
    state.inputVisible = true
    root.$nextTick(() => {
      refs.saveTagInput.$refs.input.focus()
    })
  }
}
