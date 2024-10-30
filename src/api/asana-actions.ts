import type {Asana} from 'types'
import {HttpMethod, request} from './request'
import {UploadFile} from 'antd'

export interface CreateAsanaRequest {
  name: string
  alias: string
  description?: string
  image: UploadFile[]
  groups?: number[]
}

export const API_PREFIX = 'api/asanas'

export const createAsana = request.bind<
  null,
  string,
  [CreateAsanaRequest],
  Promise<void>
>(null, HttpMethod.POST, `${API_PREFIX}/create`)

export const getAsanasList = request.bind<null, string, [], Promise<Asana[]>>(
  null,
  HttpMethod.GET,
  `${API_PREFIX}/getAll`
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
