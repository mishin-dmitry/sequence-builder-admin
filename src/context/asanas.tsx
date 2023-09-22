import {getAsanasList} from 'api/actions'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import {Asana} from 'types'

export interface AsanasProviderData {
  asanas: Asana[]
  isFetching: boolean
  getAsanaById: (id: number) => Asana | undefined
}

const initialContext: AsanasProviderData = {
  asanas: [],
  isFetching: false,
  getAsanaById: () => undefined
}

const AsanasContext = createContext<AsanasProviderData>(initialContext)

export const ProvideAsanas: React.FC<{children: React.ReactNode}> = ({
  children
}) => {
  const [asanas, setAsanas] = useState<Asana[]>([])
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const fetchAsanasList = async (): Promise<void> => {
      try {
        setIsFetching(true)

        const response = await getAsanasList()

        setAsanas(response)
      } catch (error) {
        console.error(error)
      } finally {
        setIsFetching(false)
      }
    }

    fetchAsanasList()
  }, [])

  const getAsanaById = useCallback(
    (id: number) => (asanas ?? []).find((asana) => asana.pk === id),
    [asanas]
  )

  const asanasData = useMemo(
    () => ({
      isFetching,
      asanas,
      getAsanaById
    }),
    [isFetching, asanas, getAsanaById]
  )

  return (
    <AsanasContext.Provider value={asanasData}>
      {children}
    </AsanasContext.Provider>
  )
}

export const useAsana = (): AsanasProviderData => useContext(AsanasContext)
