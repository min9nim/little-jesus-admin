import {qPointMenus, qCreatePointMenu, qRemovePointMenu} from '@/biz/query'
import {req, removeById} from '@/utils'
import {assoc} from 'ramda'
import {MessageBox} from 'element-ui'

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
    state.menus = result.res.map(assoc('loading', false))
  }
}

export function useHandleCreate({state}) {
  return async () => {
    const priority = Number(state.newPointMenu.priority)
    if (typeof priority !== 'number') {
      throw Error('Not a number priority')
    }
    state.newPointMenu.loading = true
    const variables = {...state.newPointMenu, priority}
    const result = await req(qCreatePointMenu, variables)
    state.newPointMenu.loading = false
    state.menus.push({...result.res, loading: false})
    state.newPointMenu = null
  }
}

export function useHandleRemove({state}) {
  return async (item: IPointMenu) => {
    try {
      await MessageBox.confirm(`해당 항목을 삭제합니다`, {type: 'warning'})
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
