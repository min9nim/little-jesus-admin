import {reactive} from '@vue/composition-api'
import {req, exclude, nameAscending} from '@/utils'
import {
  // qCreatePoint,
  qTeachers,
  // qUpdatePoint,
  qAddStudentToTeacher,
  qRemoveStudentToTeacher,
  qStudents,
} from '@/biz/query'
import {MessageBox, Notification} from 'element-ui'
import {IGlobalState, ITeacher, IStudent} from '@/biz/type'
import {propEq, eqProps, differenceWith, clone, sort, map, append} from 'ramda'
import {go} from '@mgsong/min-utils'

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

export function useBeforeMount({root, state}: any) {
  return async () => {
    if (root.$store.state.students.length === 0) {
      await initStudents({root, state})
    }

    if (root.$store.state.teachers.length === 0) {
      await initTeachers({root, state})
    }

    state.studentsLeft = clone(root.$store.state.students)
    root.$store.state.teachers.forEach((teacher: any) => {
      state.studentsLeft = differenceWith(eqProps('_id'))(state.studentsLeft, teacher.students)
    })
  }
}

export async function initTeachers({root, state}: any) {
  state.loading = true
  const result = await req(qTeachers)
  state.loading = false
  const teachers = go(
    result.res,
    map((teacher: any) => ({
      ...teacher,
      loading: false,
      editable: false,
      students: go(
        teacher.students,
        map((studentId: string) => ({
          ...root.$store.getters.studentMap[studentId],
          loading: false,
        })),
        sort(nameAscending),
      ),
    })),
    sort(nameAscending),
  )
  root.$store.commit('setTeachers', teachers)
}
export async function initStudents({root, state}: any) {
  state.loading = true
  const result = await req(qStudents)
  state.loading = false

  const students = go(
    result.res,
    map((student: IStudent) => ({
      ...student,
      loading: false,
      editable: false,
    })),
    sort(nameAscending),
  )
  root.$store.commit('setStudents', students)
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
      teacher.loading = false
      console.error(e)
      MessageBox.alert(e.message, {type: 'warning'})
    }
  }
}

export function useHandleClose(state: IState) {
  return async (teacher: ITeacher, student: IStudent) => {
    try {
      await MessageBox.confirm(`${teacher.name} 선생님 반에서 ${student.name}를 제거합니다`, {
        type: 'warning',
      })
      student.loading = true
      await req(qRemoveStudentToTeacher, {teacherId: teacher._id, studentId: student._id})
      student.loading = false
      state.studentsLeft = go(state.studentsLeft, append(student), sort(nameAscending))
      teacher.students = exclude(eqProps('_id', student))(teacher.students)
      // @ts-ignore
      Notification.success({
        message: `${teacher.name} 선생님 반에서 ${student.name} 제거 완료`,
        position: 'bottom-right',
      })
    } catch (e) {
      student.loading = false
      if (e !== 'cancel') {
        throw e
      }
    }
  }
}
