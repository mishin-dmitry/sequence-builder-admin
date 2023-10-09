import type {AsanaGroup} from 'types'
import {HttpMethod, request} from './request'

export interface CreateAsanaGroupRequest {
  name: string
}

export const API_PREFIX = 'api/asana-groups'

export const createAsanaGroup = request.bind<
  null,
  string,
  [CreateAsanaGroupRequest],
  Promise<void>
>(null, HttpMethod.POST, `${API_PREFIX}/create`)

export const getAsanaGroupsList = request.bind<
  null,
  string,
  [],
  Promise<AsanaGroup[]>
>(null, HttpMethod.GET, `${API_PREFIX}/getAll`)

export const updateAsanaGroup = request.bind<
  null,
  string,
  [string, CreateAsanaGroupRequest],
  Promise<void>
>(null, HttpMethod.PUT)

export const deleteAsanaGroup = request.bind<
  null,
  string,
  [string],
  Promise<void>
>(null, HttpMethod.DELETE)
