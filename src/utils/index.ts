import axios from 'axios'
import {print} from 'graphql/language/printer'
import {getQueryParams} from '@mgsong/min-utils'
import {pipe, complement, filter, propEq, curry, findIndex, remove, update, find} from 'ramda'

const url: any = {
  prod: 'https://little-jesus-api.now.sh',
  prod2020: 'https://little-jesus-api-git-lj2020.min1.now.sh',
  dev: 'https://little-jesus-api-git-develop.min1.now.sh',
  local: 'http://localhost:5050',
}

let BASEURL = url.dev
if (window.location.host.indexOf('localhost') === 0) {
  BASEURL = url.local
}
if (window.location.host === 'little-jesus-admin.now.sh') {
  BASEURL = url.prod
}
if (window.location.host === 'little-jesus-admin-2020.now.sh') {
  BASEURL = url.prod2020
}
const queryParam = getQueryParams(window.location.href)
if (queryParam.api) {
  BASEURL = url[queryParam.api]
}

console.log('BASEURL: ' + BASEURL)

export async function req(query: any, variables = {}) {
  let config = {headers: {'Content-Type': 'application/json'}}
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

// export function useIntervalCall(interval: number = 1000) {
//   // interval 시간 안에 다시 호출된 함수 콜은 무시한다
//   let elapsed = true
//   return (fn: any) => {
//     return function(...args: any[]) {
//       if (!elapsed) {
//         console.warn((fn.name || 'anonymous functiion') + ' is canceled by intervalCall')
//         return // 마지막 호출 후 제한된 경과시간이 지나지 않은 경우 리턴
//       }
//       elapsed = false
//       setTimeout(() => {
//         elapsed = true
//       }, interval)
//       // @ts-ignore
//       return fn.call(this, ...args)
//     }
//   }
// }

export function nameAscending(a: any, b: any) {
  if (a.name > b.name) return 1
  if (b.name > a.name) return -1
  return 0
}

export function _idAscending(a: any, b: any) {
  if (a._id > b._id) return 1
  if (b._id > a._id) return -1
  return 0
}

export const idEqual = propEq('_id')

export const findById = pipe(
  idEqual,
  find,
)

export const updateBy = curry((pred, tobe) => {
  return list => {
    const index = findIndex(pred)(list)
    return update(index, tobe)(list)
  }
})

export const removeBy = pred => {
  return list => {
    const index = findIndex(pred)(list)
    return remove(index, 1)(list)
  }
}

export const updateById = curry((id, tobe, list) => {
  return updateBy(idEqual(id))(tobe)(list)
})

export const removeById = curry((id, list) => {
  return removeBy(idEqual(id))(list)
})
