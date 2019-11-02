import {reactive} from '@vue/composition-api'
import {req, exclude, nameAscending} from '@/utils'
import {
  qCreatePoint,
  qTeachers,
  qUpdatePoint,
  qAddStudentToTeacher,
  qRemoveStudentToTeacher,
  qStudents,
} from '@/biz/query'
import {MessageBox, Notification} from 'element-ui'
import {IGlobalState, ITeacher, IStudent} from '@/biz/type'
import {propEq, eqProps, prop, differenceWith, clone} from 'ramda'

export interface IState {
  date?: string
  oldDate?: string
  loading: boolean
  pointInit?: boolean
  editable?: boolean
  studentsLeft: IStudent[]
}

export interface IAllState {
  state: IState
  globalState: IGlobalState
}

export function useState(): IState {
  const state: IState = reactive({
    teachers: [] as ITeacher[],
    loading: false,
    pointInit: false,
    editable: false,
    studentsLeft: [],
  })
  state.oldDate = state.date
  return state
}

let globalState: IGlobalState
export function useGlobalState(): IGlobalState {
  if (globalState) {
    return globalState
  }
  globalState = reactive<IGlobalState>({
    teachers: [] as ITeacher[],
    points: [],
    students: [],
  })
  return globalState
}

export function useBeforeMount({state, globalState}: any) {
  return async () => {
    if (globalState.teachers.length === 0) {
      await initTeachers({state, globalState})
    }
    if (globalState.students.length === 0) {
      await initStudents({state, globalState})
    }
    state.studentsLeft = clone(globalState.students)
    globalState.teachers.forEach((teacher: any) => {
      state.studentsLeft = differenceWith(eqProps('_id'))(state.studentsLeft, teacher.students)
    })
  }
}

export async function initTeachers({state, globalState}: IAllState) {
  state.loading = true
  const result = await req(qTeachers)
  state.loading = false
  globalState.teachers = result.res.map((teacher: ITeacher) => ({
    ...teacher,
    loading: false,
    students: teacher.students.map(student => ({...student, loading: false})),
  }))

  globalState.teachers.sort(nameAscending)
}
export async function initStudents({state, globalState}: IAllState) {
  state.loading = true
  const result = await req(qStudents)
  state.loading = false
  globalState.students = result.res.map((student: IStudent) => ({
    ...student,
    loading: false,
    editable: false,
  }))
  globalState.students.sort(nameAscending)
}

export function useHandleSave({state, globalState}: IAllState) {
  return async () => {
    if (state.pointInit) {
      await updatePoint({state, globalState})
    } else {
      await createPoint({state, globalState})
    }
  }
}

export async function updatePoint({state, globalState}: IAllState) {
  state.loading = true
  const results = globalState.points.map(point => {
    return req(qUpdatePoint, {
      _id: point._id,
      owner: point.owner._id,
      date: state.date,
      attendance: point.attendance,
      visitcall: point.visitcall,
      meditation: point.meditation,
      recitation: point.recitation,
      invitation: point.invitation,
      etc: point.etc,
    })
  })
  await Promise.all(results)
  state.loading = false
  state.pointInit = true
  state.editable = false
  // @ts-ignore
  Notification.success({message: '저장 완료', position: 'bottom-right'})
  // await Message({message: '저장 완료', type: 'success'})
}

export async function createPoint({state, globalState}: IAllState) {
  state.loading = true
  const results = globalState.points.map(point => {
    return req(qCreatePoint, {
      owner: point.owner._id,
      date: state.date,
      attendance: point.attendance,
      visitcall: point.visitcall,
      meditation: point.meditation,
      recitation: point.recitation,
      invitation: point.invitation,
      etc: point.etc,
    })
  })
  const resolvedList: any = await Promise.all(results)
  globalState.points = resolvedList.map(prop('res')) // 생성된 _id 세팅
  state.loading = false
  state.pointInit = true
  state.editable = false
  // await Message({message: '저장 완료', type: 'success'})
  // @ts-ignore
  Notification.success({message: '저장 완료', position: 'bottom-right'})
}

export function useHandleEdit({state}: {state: IState}) {
  return () => {
    state.editable = true
  }
}

export function useHandleNewStudentChange(state: IState) {
  return async (teacher: ITeacher) => {
    try {
      if (!teacher.newStudentId) {
        throw Error('Noy found newStudentdId')
      }
      const newStudent = state.studentsLeft.find(propEq('_id', teacher.newStudentId))
      if (!newStudent) {
        throw Error('Not found newStduent')
      }
      teacher.loading = true
      await req(qAddStudentToTeacher, {teacherId: teacher._id, studentId: newStudent._id})
      teacher.loading = false

      teacher.students.push(newStudent)
      state.studentsLeft = exclude(propEq('_id', teacher.newStudentId))(state.studentsLeft)
      teacher.newStudentId = ''
      // @ts-ignore
      Notification.success({
        message: `${teacher.name} 선생님 반에 ${newStudent.name} 추가 완료`,
        position: 'bottom-right',
      })
    } catch (e) {
      console.error(e)
      MessageBox.alert(e.message, {type: 'warning'})
    }
  }
}

export function useHandleClose(state: IState) {
  return async (teacher: ITeacher, student: IStudent) => {
    try {
      // await await MessageBox.confirm(
      //   `${teacher.name} 선생님 반에서 ${student.name} 를 제거합니다`,
      //   {type: 'warning'},
      // )
      // state.loading = true
      student.loading = true

      await req(qRemoveStudentToTeacher, {teacherId: teacher._id, studentId: student._id})
      // state.loading = false
      student.loading = false
      state.studentsLeft.push(student)
      teacher.students = exclude(eqProps('_id', student))(teacher.students)
      // @ts-ignore
      Notification.success({
        message: `${teacher.name} 선생님 반에서 ${student.name} 제거 완료`,
        position: 'bottom-right',
      })
    } catch (e) {
      if (e !== 'cancel') {
        throw e
      }
    }
  }
}
