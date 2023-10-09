import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import {getAsanasList} from 'api/asana-actions'
import type {Asana, AsanaGroup} from 'types'
import {getAsanaGroupsList} from 'api/group-actions'

export interface Data {
  asanas: Asana[]
  asanaGroups: AsanaGroup[]
  isFetching: boolean
  getInstanceById: (
    key: 'asanas' | 'groups',
    id: number
  ) => Asana | AsanaGroup | undefined
  fetchData?: () => Promise<void>
}

const initialContext: Data = {
  asanas: [],
  asanaGroups: [],
  isFetching: false,
  getInstanceById: () => undefined
}

const DataContext = createContext<Data>(initialContext)

export const ProvideData: React.FC<{children: React.ReactNode}> = ({
  children
}) => {
  const [asanas, setAsanas] = useState<Asana[]>([])
  const [asanaGroups, setAsanaGroups] = useState<AsanaGroup[]>([])
  const [isFetching, setIsFetching] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      setIsFetching(true)

      const asanas = await getAsanasList()
      const asanaGroups = await getAsanaGroupsList()

      setAsanas(asanas)
      setAsanaGroups(asanaGroups)
    } catch (error) {
      console.error(error)
    } finally {
      setIsFetching(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getInstanceById = useCallback(
    (key: 'asanas' | 'groups', id: number) =>
      (key === 'asanas' ? asanas : asanaGroups).find(
        (instance) => instance.id === id
      ),
    [asanaGroups, asanas]
  )

  const asanasData = useMemo(
    () => ({
      isFetching,
      asanas,
      getInstanceById,
      fetchData,
      asanaGroups
    }),
    [isFetching, asanas, getInstanceById, fetchData, asanaGroups]
  )

  return (
    <DataContext.Provider value={asanasData}>{children}</DataContext.Provider>
  )
}

export const useData = (): Data => useContext(DataContext)
