import type {AsanaGroup} from './asana-group'
import type {Pir} from './pir'

export interface Asana {
  id: number
  name: string
  description: string
  alignment: string
  alias: string
  searchKeys: string
  groups: AsanaGroup[]
  pirs: Pir[]
}
