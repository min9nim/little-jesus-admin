import {qPointMenus} from '@/biz/query'
import {req} from '@/utils'

export function useBeforeMount({state}) {
  return async () => {
    state.loading = true
    const result = await req(qPointMenus)
    state.loading = false
    state.menus = result.res
  }
}
