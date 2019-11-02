import axios from 'axios'
import {print} from 'graphql/language/printer'
import {pipe, complement, filter} from 'ramda'

const BASEURL = 'https://little-jesus-api-dev.now.sh'
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
