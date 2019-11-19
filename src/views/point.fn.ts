import {qPointMenus, qCreatePointMenu} from '@/biz/query'
import {req} from '@/utils'

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
