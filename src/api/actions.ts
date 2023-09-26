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
>(null, HttpMethod.POST, `${process.env.API_PREFIX}/create`)

export const getAsanasList = request.bind<null, string, [], Promise<Asana[]>>(
  null,
  HttpMethod.GET,
  `${process.env.API_PREFIX}/getAll`
)

export const updateAsana = request.bind<
  null,
  string,
  [string, CreateAsanaRequest],
  Promise<void>
>(null, HttpMethod.PUT)

export const deleteAsana = request.bind<null, string, [string], Promise<void>>(
  null,
  HttpMethod.DELETE
)
