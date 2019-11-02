import {reactive} from '@vue/composition-api'
import {IGlobalState, IPoint, ITeacher, IStudent} from '../biz/type'
import {req} from '@/utils'
import moment from 'moment'
import {
  qCreatePoint,
  qTeachers,
  qUpdatePoint,
  qAddStudentToTeacher,
  qRemoveStudentToTeacher,
  qStudents,
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

export function useHandleClose(globalState: IGlobalState) {
  return async (teacher: ITeacher, index: number) => {
    try {
      await await MessageBox.confirm(`${teacher.name} 선생님을 삭제합니다`, {type: 'warning'})
      // globalState.teachers = exclude(eqProps('_id', teacher))(globalState.teachers)
      globalState.teachers.splice(index, 1)
    } catch (e) {
      if (e !== 'cancel') {
        throw e
      }
    }
  }
}
