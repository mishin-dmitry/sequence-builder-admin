import {notification} from 'antd'

import {
  CreateAsanaRequest,
  createAsana as createAsanaAction,
  updateAsana as updateAsanaAction,
  deleteAsana as deleteAsanaAction,
  API_PREFIX
} from 'api/asana-actions'
import {useData} from 'context/asanas'

import {useCallback, useMemo} from 'react'

interface UseAsanaActions {
  createAsana: (data: CreateAsanaRequest) => Promise<void>
  updateAsana: (data: CreateAsanaRequest, id: number) => Promise<void>
  deleteAsana: (id: number) => Promise<void>
}

export const useAsanaActions = (): UseAsanaActions => {
  const {fetchAsanas} = useData()

  const createAsana = useCallback(
    async (formData: CreateAsanaRequest) => {
      try {
        await createAsanaAction(formData)

        notification['success']({
          message: 'Асана успешно создана'
        })

        await fetchAsanas?.()
      } catch (error) {
        notification['error']({
          message: 'Ошибка',
          description: 'При создании асаны возникла ошибка'
        })
      }
    },
    [fetchAsanas]
  )

  const updateAsana = useCallback(
    async (formData: CreateAsanaRequest, id: number) => {
      try {
        await updateAsanaAction(`${API_PREFIX}/${id}`, formData)

        notification['success']({
          message: 'Асана успешно отредактирована'
        })

        await fetchAsanas?.()
      } catch {
        notification['error']({
          message: 'Ошибка',
          description: 'При редактировании асаны возникла ошибка'
        })
      }
    },
    [fetchAsanas]
  )

  const deleteAsana = useCallback(
    async (id: number) => {
      try {
        await deleteAsanaAction(`${API_PREFIX}/${id}`)

        notification['success']({
          message: 'Асана успешно удалена'
        })

        await fetchAsanas?.()
      } catch (error) {
        console.log(error)
        notification['error']({
          message: 'Ошибка',
          description: 'При удалении асаны возникла ошибка'
        })
      }
    },
    [fetchAsanas]
  )

  return useMemo(
    () => ({
      createAsana,
      updateAsana,
      deleteAsana
    }),
    [createAsana, updateAsana, deleteAsana]
  )
}
