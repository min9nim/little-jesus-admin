import axios from 'axios'
import {print} from 'graphql/language/printer'
import {pipe, complement, filter} from 'ramda'

// const BASEURL = 'https://little-jesus-api.now.sh'
const BASEURL = 'https://little-jesus-api-git-develop.min1.now.sh'

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

export const intervalCall1000 = intervalCall(1000)

function intervalCall(interval: number) {
  // interval 시간 안에 다시 호출된 함수 콜은 무시한다
  let elapsed = true
  return (fn: any) => {
    if (!elapsed) {
      return // 마지막 호출 후 제한된 경과시간이 지나지 않은 경우 리턴
    }
    elapsed = false
    fn()
    setTimeout(() => {
      elapsed = true
    }, interval)
  }
}
