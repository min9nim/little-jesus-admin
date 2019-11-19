import {qPointMenus, qCreatePointMenu, qRemovePointMenu} from '@/biz/query'
import {req} from '@/utils'
import {propEq, findIndex} from 'ramda'
import {MessageBox, Notification} from 'element-ui'

export interface IPointMenu {
  _id?: string
  priority?: number
  label?: string
  hidden?: boolean
  disable?: boolean
  loading?: boolean
}

export interface IState {
  menus: IPointMenu[]
  loading: boolean
  newPointMenu: IPointMenu
}

export function useBeforeMount({state}) {
  return async () => {
    state.loading = true
    const result = await req(qPointMenus)
    state.loading = false
    state.menus = result.res
  }
}

export function useHandleSave({state}) {
  return async () => {
    const priority = Number(state.newPointMenu.priority)
    if (typeof priority !== 'number') {
      throw Error('Not a number priority')
    }
    state.newPointMenu.loading = true
    const variables = {...state.newPointMenu, priority}
    await req(qCreatePointMenu, variables)
    state.newPointMenu.loading = false
    state.menus.push(state.newPointMenu)
    state.newPointMenu = null
  }
}

export function useHandleRemove({state}) {
  return async (item: IPointMenu) => {
    try {
      await MessageBox.confirm(`해당 항목을 삭제합니다`, {type: 'warning'})
      item.loading = true
      console.log(44, item._id)
      await req(qRemovePointMenu, {_id: item._id})
      const idx = findIndex(propEq('_id', item._id))(state.menus)
      state.menus.splice(idx, 1)
    } catch (e) {
      if (e !== 'cancel') {
        throw e
      }
    }
  }
}
