import {qPointMenus, qCreatePointMenu, qRemovePointMenu, qUpdatePointMenu} from '@/biz/query'
import {req, removeById, updateById} from '@/utils'
import {MessageBox} from 'element-ui'

export interface IPointMenu {
  _id?: string
  priority?: number
  label?: string
  hidden?: boolean
  disable?: boolean
  loading?: boolean
  editable?: boolean
}

export interface IState {
  menus: IPointMenu[]
  loading: boolean
  newPointMenu: IPointMenu
}

export const DEFAULT = () => ({
  label: '',
  hidden: false,
  loading: false,
  editable: false,
})

export function useBeforeMount({state}) {
  return async () => {
    state.loading = true
    const result = await req(qPointMenus)
    state.loading = false
    state.menus = result.res.map(menu => ({...menu, loading: false, editable: false}))
  }
}

export function useHandleCreate({state}) {
  return async () => {
    const priority = Number(state.newPointMenu.priority)
    if (Number.isNaN(priority)) {
      console.warn('Not a number priority')
      await MessageBox.alert(`priority 는 숫자만 입력 가능합니다`, {type: 'warning'})
      return
    }
    state.newPointMenu.loading = true
    const variables = {...state.newPointMenu, priority}
    const result = await req(qCreatePointMenu, variables)
    state.newPointMenu.loading = false
    state.menus.push({...result.res, loading: false, editable: false})
    state.newPointMenu = DEFAULT()
  }
}

export function useHandleRemove({state}) {
  return async (item: IPointMenu) => {
    try {
      await MessageBox.confirm(
        `${item.label} 항목을 삭제합니다. 해당 항목으로 기존에 입력했던 포인트 내역이 있다면 모두 함께 삭제되며 한번 삭제한 포인트 항목은 복원이 불가합니다.`,
        {type: 'warning', confirmButtonText: `"${item.label}" 삭제`},
      )
      item.loading = true
      await req(qRemovePointMenu, {_id: item._id})
      state.menus = removeById(item._id)(state.menus)
    } catch (e) {
      if (e !== 'cancel') {
        throw e
      }
    }
  }
}

export function useHandleSave() {
  return async (item: IPointMenu) => {
    try {
      const priority = Number(item.priority)
      if (Number.isNaN(priority)) {
        console.warn('Not a number priority')
        await MessageBox.alert(`priority 는 숫자만 입력 가능합니다`, {type: 'warning'})
        return
      }
      item.loading = true
      await req(qUpdatePointMenu, {...item, priority})
      item.loading = false
      item.editable = false
    } catch (e) {
      if (e !== 'cancel') {
        throw e
      }
    }
  }
}
