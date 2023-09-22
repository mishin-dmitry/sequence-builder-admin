import type {Asana} from 'types'
import {HttpMethod, request} from './request'

export interface CreateAsanaRequest {
  name: string
  description: string
  image: File
}

export const createAsana = request.bind<
  null,
  string,
  [CreateAsanaRequest],
  Promise<void>
>(null, HttpMethod.POST, 'api/asana/')

export const getAsanasList = request.bind<null, string, [], Promise<Asana[]>>(
  null,
  HttpMethod.GET,
  'api/asana/'
)
