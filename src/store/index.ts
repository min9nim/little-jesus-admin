import Vue from 'vue'
import Vuex from 'vuex'
import {IPointMenu, ITeacher, IStudent} from '@/biz/type'
import {qCreateStudent, qRemoveStudent, qCreateTeacher, qRemoveTeacher} from '@/biz/query'
import {req} from '@/utils'
import {removeById} from 'mingutils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    date: '',
    teachers: [] as ITeacher[],
    students: [] as IStudent[],
    pointMenus: [] as IPointMenu[],
  },
  mutations: {
    setDate(state, date) {
      state.date = date
    },
    setTeachers(state, teachers) {
      state.teachers = teachers
    },
    setStudents(state, students) {
      state.students = students
    },
    setPointMenus(state, pointMenus) {
      state.pointMenus = pointMenus
    },
    addTeacher(state, teacher) {
      state.teachers.push(teacher)
    },
    removeTeacher(state, _id) {
      state.teachers = removeById(_id)(state.teachers)
    },
    addStudent(state, student) {
      state.students.push(student)
    },
    removeStudent(state, studentId) {
      state.students = removeById(studentId)(state.students)
    },
  },
  getters: {
    pointMenuMap(state) {
      return state.pointMenus.reduce((acc: any, value: any) => {
        acc[value._id] = value
        return acc
      }, {})
    },
    studentMap(state) {
      return state.students.reduce((acc: any, value: any) => {
        acc[value._id] = value
        return acc
      }, {})
    },
  },
  actions: {
    async addStudent({commit}, {name}) {
      const result = await req(qCreateStudent, {name})
      commit('addStudent', {_id: result.res._id, name})
      return {_id: result.res._id, name}
    },
    async removeStudent({commit}, {_id: studentId}) {
      await req(qRemoveStudent, {_id: studentId})
      commit('removeStudent', studentId)
    },
    async addTeacher({commit}, {name}) {
      const result = await req(qCreateTeacher, {name})
      commit('addTeacher', {_id: result.res._id, name: result.res.name, students: []})
    },
    async removeTeacher({commit}, {_id}) {
      await req(qRemoveTeacher, {_id})
      commit('removeTeacher', _id)
    },
  },
  modules: {},
})
