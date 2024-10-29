import type {AsanaGroup} from 'types'

export interface AsanaGroupCategory {
  id: number
  name: string
  groups: Exclude<AsanaGroup, 'categoryId'>[]
}
