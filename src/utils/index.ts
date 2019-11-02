import axios from 'axios'
import {print} from 'graphql/language/printer'
import {pipe, complement, filter} from 'ramda'

const prod_url = 'https://little-jesus-api.now.sh'
const dev_url = 'https://little-jesus-api-git-develop.min1.now.sh'
console.log('[env] = ', process.env)
const BASEURL = process.env.NOW_GITHUB_COMMIT_REF === 'master' ? prod_url : dev_url

const headers = {'Content-Type': 'application/json'}

export async function req(query: any, variables = {}) {
  let config = {headers}
  const result = await axios.post(BASEURL, {query: print(query), variables}, config)
  if (result.data.errors) {
    throw result.data.errors
  }
  return result.data.data
}

export const exclude = pipe<any, any, any>(
  complement,
  filter,
)

export function useIntervalCall(interval: number = 1000) {
  // interval 시간 안에 다시 호출된 함수 콜은 무시한다
  let elapsed = true
  return (fn: any) => {
    return function(...args: any[]) {
      if (!elapsed) {
        console.warn((fn.name || 'anonymous functiion') + ' is canceled by intervalCall')
        return // 마지막 호출 후 제한된 경과시간이 지나지 않은 경우 리턴
      }
      elapsed = false
      setTimeout(() => {
        elapsed = true
      }, interval)
      // @ts-ignore
      return fn.call(this, ...args)
    }
  }
}

export function nameAscending(a: any, b: any) {
  if (a.name > b.name) return 1
  if (b.name > a.name) return -1
  return 0
}
