import {qPointMenus} from '@/biz/query'
import {req, exclude} from '@/utils'

export function useBeforeMount({state}) {
  return async () => {
    const result = await req(qPointMenus)
    state.menus = result.res
  }
}
