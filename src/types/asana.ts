import type {AsanaGroup} from './asana-group'

export enum GroupForGenerating {
  SAGITTAL = 'sagittal',
  FRONTAL = 'frontal',
  STOMACH_LYING = 'stomachLying',
  BACK_LYING = 'backLying',
  SITTING = 'sitting',
  HAND_BALANCES = 'handBalances',
  SHOULDERS = 'shoulders',
  INVERTED = 'inverted'
}

export interface Asana {
  id: number
  name: string
  description: string
  alignment: string
  image: string
  alias: string
  searchKeys: string
  canBeGenerated: boolean
  canBeStartOfSequence: boolean
  isAsymmetrical: boolean
  groupForGenerating: GroupForGenerating
  groups: AsanaGroup[]
  pirs: number[]
  continuingAsanas: number[]
}
