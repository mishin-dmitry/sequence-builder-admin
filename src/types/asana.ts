import type {AsanaGroup} from './asana-group'

export interface Asana {
  id: number
  name: string
  description: string
  alignment: string
  alias: string
  searchKeys: string
  groups: AsanaGroup[]
}
