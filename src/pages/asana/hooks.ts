import {getAsanasList} from 'api/actions'
import {useEffect, useState} from 'react'
import type {Asana} from 'types'

interface UseAsana {
  asanas: Asana[]
  isFetching: boolean
}

export const useAsana = (): UseAsana => {
  const [asanas, setAsanas] = useState<Asana[]>([])
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const fetchAsanasList = async (): Promise<void> => {
      try {
        setIsFetching(true)

        const response = await getAsanasList()

        setAsanas(response)
      } catch (error) {
      } finally {
        setIsFetching(false)
      }
    }

    fetchAsanasList()
  }, [])

  return {
    asanas,
    isFetching
  }
}
