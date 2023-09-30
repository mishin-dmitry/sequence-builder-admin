import {notification} from 'antd'

import {
  CreateAsanaRequest,
  createAsana as createAsanaAction,
  updateAsana as updateAsanaAction,
  deleteAsana as deleteAsanaAction
} from 'api/actions'

import {useAsana} from 'context/asanas'
import {Urls} from 'lib/urls'
import {useRouter} from 'next/router'
import {useCallback, useMemo} from 'react'

interface UseAsanaActions {
  createAsana: (data: CreateAsanaRequest) => Promise<void>
  updateAsana: (data: CreateAsanaRequest) => Promise<void>
  deleteAsana: () => Promise<void>
}

const REDIRECT_TIMEOUT = 2000

export const useAsanaActions = (): UseAsanaActions => {
  const router = useRouter()

  const {fetchAsanaList} = useAsana()

  const returnToAsanasList = useCallback(async () => {
    await new Promise((resolve) => window.setTimeout(resolve, REDIRECT_TIMEOUT))

    await fetchAsanaList?.()

    router.push(Urls.ASANA_LIST)
  }, [fetchAsanaList, router])

  const createAsana = useCallback(
    async (formData: CreateAsanaRequest) => {
      try {
        await createAsanaAction(formData)

        notification['success']({
          message: 'Асана успешно создана'
        })

        await returnToAsanasList()
      } catch (error) {
        console.error(error)

        notification['error']({
          message: 'Ошибка',
          description: 'При создании асаны возникла ошибка'
        })
      }
    },
    [returnToAsanasList]
  )

  const updateAsana = useCallback(
    async (formData: CreateAsanaRequest) => {
      try {
        await updateAsanaAction(
          `${process.env.API_PREFIX}/${router.query.id}`,
          formData
        )

        notification['success']({
          message: 'Асана успешно отредактирована'
        })

        await returnToAsanasList()
      } catch {
        notification['error']({
          message: 'Ошибка',
          description: 'При редактировании асаны возникла ошибка'
        })
      }
    },
    [returnToAsanasList, router.query.id]
  )

  const deleteAsana = useCallback(async () => {
    try {
      await deleteAsanaAction(`${process.env.API_PREFIX}/${router.query.id}`)

      notification['success']({
        message: 'Асана успешно удалена'
      })

      returnToAsanasList()
    } catch {
      notification['error']({
        message: 'Ошибка',
        description: 'При удалении асаны возникла ошибка'
      })
    }
  }, [returnToAsanasList, router.query.id])

  return useMemo(
    () => ({
      createAsana,
      updateAsana,
      deleteAsana
    }),
    [createAsana, updateAsana, deleteAsana]
  )
}
