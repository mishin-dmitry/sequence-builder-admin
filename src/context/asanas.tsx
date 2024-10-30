import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import type {Asana, AsanaGroup, AsanaGroupCategory} from 'types'

import {getAsanasList} from 'api/asana-actions'
import {getAsanaGroupsList} from 'api/group-actions'
import {getAsanaGroupCategoriesList} from 'api/group-category-actions'

export interface Data {
  asanas: Asana[]
  asanaGroups: AsanaGroup[]
  asanaGroupCategories: AsanaGroupCategory[]
  isFetching: boolean
  asanasMap: Record<number, Asana>
  getInstanceById: (
    key: 'asanas' | 'groups' | 'categories',
    id: number
  ) => Asana | AsanaGroup | AsanaGroupCategory | undefined
  fetchAsanas?: () => Promise<void>
  fetchAsanaGroups?: () => Promise<void>
  fetchAsanaGroupCategories?: () => Promise<void>
}

const initialContext: Data = {
  asanas: [],
  asanaGroups: [],
  asanaGroupCategories: [],
  asanasMap: {},
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

  const [asanaGroupCategories, setAsanaGroupCategories] = useState<
    AsanaGroupCategory[]
  >([])

  const asanasMap = useMemo(() => {
    const result = {} as Record<string, Asana>

    asanas.forEach((asana) => {
      result[asana.id] = asana
    })

    return result
  }, [asanas])

  const fetchData = useCallback(async () => {
    try {
      setIsFetching(true)

      const asanas = await getAsanasList()
      const asanaGroups = await getAsanaGroupsList()
      const asanaGroupCategories = await getAsanaGroupCategoriesList()

      setAsanas(asanas)
      setAsanaGroups(asanaGroups)
      setAsanaGroupCategories(asanaGroupCategories)
    } catch (error) {
      console.error(error)
    } finally {
      setIsFetching(false)
    }
  }, [])

  const fetchAsanas = useCallback(async () => {
    try {
      setIsFetching(true)

      const asanas = await getAsanasList()

      setAsanas(asanas)
    } catch (error) {
      console.error(error)
    } finally {
      setIsFetching(false)
    }
  }, [])

  const fetchAsanaGroups = useCallback(async () => {
    try {
      setIsFetching(true)

      const asanaGroups = await getAsanaGroupsList()

      setAsanaGroups(asanaGroups)
    } catch (error) {
      console.error(error)
    } finally {
      setIsFetching(false)
    }
  }, [])

  const fetchAsanaGroupCategories = useCallback(async () => {
    try {
      setIsFetching(true)

      const asanaGroupsCategories = await getAsanaGroupCategoriesList()

      setAsanaGroupCategories(asanaGroupsCategories)
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
    (key: 'asanas' | 'groups' | 'categories', id: number) =>
      (key === 'asanas'
        ? asanas
        : key === 'groups'
        ? asanaGroups
        : asanaGroupCategories
      ).find((instance) => instance.id === id),
    [asanaGroupCategories, asanaGroups, asanas]
  )

  const asanasData = useMemo(
    () => ({
      isFetching,
      asanas,
      getInstanceById,
      asanaGroups,
      asanaGroupCategories,
      fetchAsanas,
      fetchAsanaGroups,
      fetchAsanaGroupCategories,
      asanasMap
    }),
    [
      isFetching,
      asanas,
      getInstanceById,
      asanaGroupCategories,
      asanaGroups,
      fetchAsanas,
      fetchAsanaGroups,
      fetchAsanaGroupCategories,
      asanasMap
    ]
  )

  return (
    <DataContext.Provider value={asanasData}>{children}</DataContext.Provider>
  )
}

export const useData = (): Data => useContext(DataContext)
