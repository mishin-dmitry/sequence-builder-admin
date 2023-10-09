import {notification} from 'antd'

import {
  CreateAsanaRequest,
  createAsana as createAsanaAction,
  updateAsana as updateAsanaAction,
  deleteAsana as deleteAsanaAction,
  API_PREFIX
} from 'api/asana-actions'

import {useRouter} from 'next/router'
import {useCallback, useMemo} from 'react'

interface UseAsanaActions {
  createAsana: (data: CreateAsanaRequest) => Promise<void>
  updateAsana: (data: CreateAsanaRequest) => Promise<void>
  deleteAsana: () => Promise<void>
}

export const useAsanaActions = (): UseAsanaActions => {
  const router = useRouter()

  const createAsana = useCallback(async (formData: CreateAsanaRequest) => {
    try {
      await createAsanaAction(formData)

      notification['success']({
        message: 'Асана успешно создана'
      })
    } catch (error) {
      console.error(error)

      notification['error']({
        message: 'Ошибка',
        description: 'При создании асаны возникла ошибка'
      })
    }
  }, [])

  const updateAsana = useCallback(
    async (formData: CreateAsanaRequest) => {
      try {
        await updateAsanaAction(`${API_PREFIX}/${router.query.id}`, formData)

        notification['success']({
          message: 'Асана успешно отредактирована'
        })
      } catch {
        notification['error']({
          message: 'Ошибка',
          description: 'При редактировании асаны возникла ошибка'
        })
      }
    },
    [router.query.id]
  )

  const deleteAsana = useCallback(async () => {
    try {
      await deleteAsanaAction(`${API_PREFIX}/${router.query.id}`)

      notification['success']({
        message: 'Асана успешно удалена'
      })
    } catch {
      notification['error']({
        message: 'Ошибка',
        description: 'При удалении асаны возникла ошибка'
      })
    }
  }, [router.query.id])

  return useMemo(
    () => ({
      createAsana,
      updateAsana,
      deleteAsana
    }),
    [createAsana, updateAsana, deleteAsana]
  )
}
