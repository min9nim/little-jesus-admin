export interface IStudent {
  _id: string
  name: string
  disable?: boolean
  loading?: boolean
}
export interface ITeacher {
  _id: string
  name: string
  disable?: boolean
  students: IStudent[]
  newStudentId?: string
  loading?: boolean
}
export interface IPoint {
  _id?: string
  owner: {
    _id: string
    name: string
  }
  date?: string
  attendance: boolean
  visitcall: boolean
  meditation: number
  invitation: number
  recitation: boolean
  etc: string
}

export interface IGlobalState {
  teachers: ITeacher[]
  points: IPoint[]
  students: IStudent[]
}
