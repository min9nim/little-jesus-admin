import {reactive} from '@vue/composition-api'
import {IGlobalState, IStudent} from '../biz/type'
import {req, useIntervalCall} from '@/utils'
import moment from 'moment'
import {qCreateStudent, qRemoveStudent} from '@/biz/query'
import {MessageBox, Notification} from 'element-ui'
import {propEq, eqProps} from 'ramda'
import {exclude} from '../utils'
import {differenceWith, clone} from 'ramda'
import {useGlobalState} from './home.fn'

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

export function useHandleInputConfirm(state: IState, globalState: IGlobalState) {
  return async () => {
    try {
      if (state.newStudentName) {
        state.loading = true
        const result = await req(qCreateStudent, {name: state.newStudentName})
        state.loading = false
        globalState.students.push({_id: result.res._id, name: state.newStudentName})
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

export function useHandleClose(state: IState, globalState: IGlobalState) {
  return async (student: IStudent, index: number) => {
    try {
      await await MessageBox.confirm(`${student.name} 어린이를 삭제합니다`, {type: 'warning'})
      state.loading = true
      await req(qRemoveStudent, {_id: student._id})
      state.loading = false
      // @ts-ignore
      Notification.success({message: student.name + ' 어린이 삭제 완료', position: 'bottom-right'})
      globalState.students.splice(index, 1)
    } catch (e) {
      state.loading = false
      if (e !== 'cancel') {
        console.error(e)
        MessageBox.alert(e.message, {type: 'warning'})
      }
    }
  }
}
