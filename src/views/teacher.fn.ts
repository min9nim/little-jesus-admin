import {reactive} from '@vue/composition-api'
import {ITeacher} from '../biz/type'
import {req} from '@/utils'
import {qUpdateTeacher} from '@/biz/query'
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

export function useHandleClose(state: IState, root: any) {
  return async (teacher: ITeacher, index: number) => {
    try {
      await await MessageBox.confirm(`${teacher.name} 선생님을 삭제합니다`, {type: 'warning'})
      teacher.loading = true
      await root.$store.dispatch('removeTeacher', {_id: teacher._id})
      teacher.loading = false
      // @ts-ignore
      Notification.success({message: teacher.name + ' 선생님 삭제 완료', position: 'bottom-right'})
    } catch (e) {
      state.loading = false
      if (e !== 'cancel') {
        console.error(e)
        MessageBox.alert(e.message, {type: 'warning'})
      }
    }
  }
}

export function useHandleInputConfirm(state: IState, root: any) {
  return async () => {
    try {
      // console.log('handleInputConfirm called', state.newTeacherName)
      if (state.newTeacherName) {
        state.loading = true
        await root.$store.dispatch('addTeacher', {name: state.newTeacherName})
        state.loading = false
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
