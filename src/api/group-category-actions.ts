import type {AsanaGroupCategory} from 'types'
import {HttpMethod, request} from './request'

export interface CreateAsanaGroupCategoryRequest {
  name: string
}

export const API_PREFIX = 'api/asana-group-categories'

export const createAsanaGroupCategory = request.bind<
  null,
  string,
  [CreateAsanaGroupCategoryRequest],
  Promise<void>
>(null, HttpMethod.POST, `${API_PREFIX}/create`)

export const getAsanaGroupCategoriesList = request.bind<
  null,
  string,
  [],
  Promise<AsanaGroupCategory[]>
>(null, HttpMethod.GET, `${API_PREFIX}/getAll`)

export const updateAsanaGroupCategory = request.bind<
  null,
  string,
  [string, CreateAsanaGroupCategoryRequest],
  Promise<void>
>(null, HttpMethod.PUT)

export const deleteAsanaGroupCategory = request.bind<
  null,
  string,
  [string],
  Promise<void>
>(null, HttpMethod.DELETE)
