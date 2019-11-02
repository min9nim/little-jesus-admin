import {reactive} from '@vue/composition-api'
import {IGlobalState, IPoint, ITeacher, IStudent} from '../biz/type'
import {req} from '@/utils'
import {qRemoveTeacher, qUpdateTeacher, qCreateTeacher} from '@/biz/query'
import {MessageBox, Notification} from 'element-ui'

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
      teacher.loading = true
      await req(qRemoveTeacher, {_id: teacher._id})
      teacher.loading = false
      // @ts-ignore
      Notification.success({message: teacher.name + ' 선생님 삭제 완료', position: 'bottom-right'})
      // globalState.teachers = exclude(eqProps('_id', teacher))(globalState.teachers)
      globalState.teachers.splice(index, 1)
    } catch (e) {
      state.loading = false
      if (e !== 'cancel') {
        console.error(e)
        MessageBox.alert(e.message, {type: 'warning'})
      }
    }
  }
}

export function useHandleInputConfirm(state: IState, globalState: IGlobalState) {
  return async () => {
    try {
      // console.log('handleInputConfirm called', state.newTeacherName)
      if (state.newTeacherName) {
        state.loading = true
        const result = await req(qCreateTeacher, {name: state.newTeacherName})
        state.loading = false
        globalState.teachers.push({
          _id: result.res._id,
          name: state.newTeacherName,
          students: [],
          loading: false,
        })
        // @ts-ignore
        Notification.success({
          message: state.newTeacherName + ' 선생님 추가 완료',
          position: 'bottom-right',
        })
      }
      state.inputVisible = false
      state.newTeacherName = ''
    } catch (e) {
      state.loading = false
      if (e !== 'cancel') {
        console.error(e)
        MessageBox.alert(e.message, {type: 'warning'})
      }
    }
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

export function useHandleTeacherNameConfirm(state: IState) {
  return async (teacher: ITeacher) => {
    try {
      if (teacher.name) {
        teacher.loading = true
        await req(qUpdateTeacher, {_id: teacher._id, name: teacher.name})
        teacher.loading = false
        // @ts-ignore
        Notification.success({
          message: teacher.name + ' 이름 수정 완료',
          position: 'bottom-right',
        })
      }
      teacher.editable = false
    } catch (e) {
      state.loading = false
      console.error(e)
      MessageBox.alert(e.message, {type: 'warning'})
    }
  }
}

export function useHandleTeacherClick({root, refs}: any) {
  return (teacher: ITeacher) => {
    teacher.editable = true
    root.$nextTick(() => {
      // console.log(refs, teacher._id, refs[teacher._id])
      refs[teacher._id][0].$refs.input.focus()
    })
  }
}
