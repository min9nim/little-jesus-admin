import gql from 'graphql-tag'

export const qTeachers = gql`
  query teachers {
    res: teachers {
      _id
      name
      students
    }
  }
`
export const qStudents = gql`
  query students {
    res: students {
      _id
      name
    }
  }
`

export const qPointMenus = gql`
  query pointMenus {
    res: pointMenus {
      _id
      label
      type
      defaultValue
      priority
      hidden
      disable
    }
  }
`

export const qUpdatePointMenu = gql`
  mutation updatePointMenu(
    $_id: ObjectId!
    $label: String!
    $type: String!
    $defaultValue: String!
    $priority: Int!
    $hidden: Boolean
  ) {
    res: updatePointMenu(
      _id: $_id
      label: $label
      type: $type
      defaultValue: $defaultValue
      priority: $priority
      hidden: $hidden
    ) {
      _id
      label
      hidden
      disable
      priority
      type
      defaultValue
    }
  }
`

export const qRemovePointMenu = gql`
  mutation updatePointMenu($_id: ObjectId!) {
    res: updatePointMenu(_id: $_id, disable: true) {
      _id
      label
      hidden
      disable
      priority
      type
      defaultValue
    }
  }
`

export const qCreatePointMenu = gql`
  mutation createPointMenu(
    $label: String!
    $priority: Int!
    $type: String!
    $defaultValue: String!
    $hidden: Boolean
  ) {
    res: createPointMenu(
      label: $label
      priority: $priority
      type: $type
      defaultValue: $defaultValue
      hidden: $hidden
    ) {
      _id
      label
      priority
      type
      defaultValue
      hidden
    }
  }
`

// export const qRemovePoint = gql`
//   mutation removePoint($_id: ObjectId!) {
//     res: removePoint(_id: $_id) {
//       _id
//       date
//     }
//   }
// `

export const qRemoveStudentToTeacherByName = gql`
  mutation removeStudentToTeacherByName($teacherName: String!, $studentName: String!) {
    res: removeStudentToTeacherByName(teacherName: $teacherName, studentName: $studentName) {
      _id
      name
      students
    }
  }
`

export const qRemoveStudentToTeacher = gql`
  mutation removeStudentToTeacher($teacherId: ObjectId!, $studentId: ObjectId!) {
    res: removeStudentToTeacher(teacherId: $teacherId, studentId: $studentId) {
      _id
      name
      students
    }
  }
`

export const qAddStudentToTeacherByName = gql`
  mutation addStudentToTeacherByName($teacherName: String!, $studentName: String!) {
    res: addStudentToTeacherByName(teacherName: $teacherName, studentName: $studentName) {
      _id
      name
      students
    }
  }
`

export const qAddStudentToTeacher = gql`
  mutation addStudentToTeacher($teacherId: ObjectId!, $studentId: ObjectId!) {
    res: addStudentToTeacher(teacherId: $teacherId, studentId: $studentId) {
      _id
      name
      students
    }
  }
`

export const qCreateTeacher = gql`
  mutation createTeacher($name: String!) {
    res: createTeacher(name: $name) {
      _id
      name
      students
    }
  }
`

export const qCreateStudent = gql`
  mutation createStudent($name: String!) {
    res: createStudent(name: $name) {
      _id
      name
    }
  }
`

export const qRemoveTeacher = gql`
  mutation removeTeacher($_id: ObjectId!) {
    res: removeTeacher(_id: $_id) {
      _id
      name
      students
    }
  }
`

export const qRemoveStudent = gql`
  mutation removeStudent($_id: ObjectId!) {
    res: removeStudent(_id: $_id) {
      _id
      name
    }
  }
`

export const qUpdateStudent = gql`
  mutation updateStudent($_id: ObjectId!, $name: String) {
    res: updateStudent(_id: $_id, name: $name) {
      name
      _id
    }
  }
`

export const qUpdateTeacher = gql`
  mutation updateTeacher($_id: ObjectId!, $name: String) {
    res: updateTeacher(_id: $_id, name: $name) {
      name
      _id
    }
  }
`
