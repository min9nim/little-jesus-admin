import gql from 'graphql-tag'

export const qCreatePoint = gql`
  # Write your query or mutation here
  mutation createPoint(
    $owner: ObjectId!
    $date: String!
    $attendance: Boolean
    $visitcall: Boolean
    $meditation: Int
    $recitation: Boolean
    $invitation: Int
    $etc: String
  ) {
    res: createPoint(
      owner: $owner
      date: $date
      attendance: $attendance
      visitcall: $visitcall
      meditation: $meditation
      recitation: $recitation
      invitation: $invitation
      etc: $etc
    ) {
      _id
      owner {
        _id
        name
      }
      date
      attendance
      visitcall
      meditation
      recitation
      invitation
      etc
    }
  }
`
export const qUpdatePoint = gql`
  # Write your query or mutation here
  mutation updatePoint(
    $_id: ObjectId!
    $owner: ObjectId
    $date: String
    $attendance: Boolean
    $visitcall: Boolean
    $meditation: Int
    $recitation: Boolean
    $invitation: Int
    $etc: String
  ) {
    res: updatePoint(
      _id: $_id
      owner: $owner
      date: $date
      attendance: $attendance
      visitcall: $visitcall
      meditation: $meditation
      recitation: $recitation
      invitation: $invitation
      etc: $etc
    ) {
      _id
      owner {
        _id
        name
      }
      date
      attendance
      visitcall
      meditation
      recitation
      invitation
      etc
    }
  }
`

export const qTeachers = gql`
  query teachers {
    res: teachers {
      _id
      name
      students {
        _id
        name
      }
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

export const qPoints = gql`
  query points($date: String, $teacherId: ObjectId) {
    res: points(date: $date, teacherId: $teacherId) {
      _id
      owner {
        _id
        name
        teacher {
          name
        }
      }
      date
      attendance
      meditation
      invitation
      visitcall
      recitation
      etc
    }
  }
`

export const qRemovePoint = gql`
  mutation removePoint($_id: ObjectId!) {
    removePoint(_id: $_id) {
      _id
      date
    }
  }
`

export const qRemoveStudentToTeacherByName = gql`
  mutation removeStudentToTeacherByName($teacherName: String!, $studentName: String!) {
    removeStudentToTeacherByName(teacherName: $teacherName, studentName: $studentName) {
      _id
      name
      students {
        _id
        name
      }
    }
  }
`

export const qRemoveStudentToTeacher = gql`
  mutation removeStudentToTeacher($teacherId: ObjectId!, $studentId: ObjectId!) {
    removeStudentToTeacher(teacherId: $teacherId, studentId: $studentId) {
      _id
      name
      students {
        _id
        name
      }
    }
  }
`

export const qAddStudentToTeacherByName = gql`
  mutation addStudentToTeacherByName($teacherName: String!, $studentName: String!) {
    addStudentToTeacherByName(teacherName: $teacherName, studentName: $studentName) {
      _id
      name
      students {
        _id
        name
      }
    }
  }
`

export const qAddStudentToTeacher = gql`
  mutation addStudentToTeacher($teacherId: ObjectId!, $studentId: ObjectId!) {
    addStudentToTeacher(teacherId: $teacherId, studentId: $studentId) {
      _id
      name
      students {
        _id
        name
      }
    }
  }
`

export const qCreateTeacher = gql`
  mutation createTeacher($name: String!) {
    createTeacher(name: $name) {
      _id
      name
      students {
        _id
        name
      }
    }
  }
`

export const qCreateStudent = gql`
  mutation createStudent($name: String!) {
    createStudent(name: $name) {
      _id
      name
    }
  }
`

export const qRemoveTeacher = gql`
  mutation removeTeacher($_id: ObjectId!) {
    removeTeacher(_id: $_id) {
      _id
      name
      students {
        _id
        name
      }
    }
  }
`

export const qRemoveStudent = gql`
  mutation removeStudent($_id: ObjectId!) {
    removeStudent(_id: $_id) {
      _id
      name
    }
  }
`
