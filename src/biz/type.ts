export interface IStudent {
  _id: string
  name: string
  no: string
  disable?: boolean
  loading?: boolean
  editable?: boolean
}
export interface ITeacher {
  _id: string
  name: string
  disable?: boolean
  students: IStudent[]
  newStudentId?: string
  loading?: boolean
  editable?: boolean
}

export interface IPointMenu {
  _id: string
  label: string
  type: string
  defaultValue: string
  priority: number
  hidden: boolean
  disable: boolean
}

export interface IGlobalState {
  teachers: ITeacher[]
  students: IStudent[]
  studentMap: any
}
