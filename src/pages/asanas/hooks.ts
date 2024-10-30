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

const createFormData = ({
  image = [],
  name = '',
  description = '',
  alias = '',
  groups = []
}: CreateAsanaRequest): FormData => {
  const formData = new FormData()

  formData.append('name', name)
  formData.append('alias', alias)
  formData.append('description', description)
  formData.append('groups', JSON.stringify(groups))

  if (image[0]?.originFileObj) {
    formData.append('image', image[0].originFileObj)
  }

  return formData
}

export const useAsanaActions = (): UseAsanaActions => {
  const {fetchAsanas} = useData()

  const createAsana = useCallback(
    async (values: CreateAsanaRequest) => {
      const formData = createFormData(values)

      try {
        await createAsanaAction(formData as unknown as CreateAsanaRequest)

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
    async (values: CreateAsanaRequest, id: number) => {
      const formData = createFormData(values)

      try {
        await updateAsanaAction(
          `${API_PREFIX}/${id}`,
          formData as unknown as CreateAsanaRequest
        )

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
