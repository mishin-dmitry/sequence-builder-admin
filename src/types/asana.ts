export interface Asana {
  id?: number
  name: string
  description: string
  alias: string
  searchKeys: string
  groups: {
    id: number
    name: string
  }[]
}
