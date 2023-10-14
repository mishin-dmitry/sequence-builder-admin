import {notification} from 'antd'

import {
  CreateAsanaGroupRequest,
  createAsanaGroup as createAsanaGroupAction,
  updateAsanaGroup as updateAsanaGroupAction,
  deleteAsanaGroup as deleteAsanaGroupAction,
  API_PREFIX
} from 'api/group-actions'
import {useData} from 'context/asanas'

import {useCallback, useMemo} from 'react'

interface UseAsanaGroupActions {
  createAsanaGroup: (data: CreateAsanaGroupRequest) => Promise<void>
  updateAsanaGroup: (data: CreateAsanaGroupRequest, id: number) => Promise<void>
  deleteAsanaGroup: (id: number) => Promise<void>
}

export const useAsanaGroupActions = (): UseAsanaGroupActions => {
  const {fetchAsanaGroups} = useData()

  const createAsanaGroup = useCallback(
    async (formData: CreateAsanaGroupRequest) => {
      try {
        await createAsanaGroupAction(formData)

        notification['success']({
          message: 'Группа успешно создана'
        })

        await fetchAsanaGroups?.()
      } catch (error) {
        console.error(error)

        notification['error']({
          message: 'Ошибка',
          description: 'При создании группы возникла ошибка'
        })
      }
    },
    [fetchAsanaGroups]
  )

  const updateAsanaGroup = useCallback(
    async (formData: CreateAsanaGroupRequest, id: number) => {
      try {
        await updateAsanaGroupAction(`${API_PREFIX}/${id}`, formData)

        notification['success']({
          message: 'Группа успешно отредактирована'
        })

        await fetchAsanaGroups?.()
      } catch {
        notification['error']({
          message: 'Ошибка',
          description: 'При редактировании группы возникла ошибка'
        })
      }
    },
    [fetchAsanaGroups]
  )

  const deleteAsanaGroup = useCallback(
    async (id: number) => {
      try {
        await deleteAsanaGroupAction(`${API_PREFIX}/${id}`)

        notification['success']({
          message: 'Группа успешно удалена'
        })

        await fetchAsanaGroups?.()
      } catch {
        notification['error']({
          message: 'Ошибка',
          description: 'При удалении группы возникла ошибка'
        })
      }
    },
    [fetchAsanaGroups]
  )

  return useMemo(
    () => ({
      createAsanaGroup,
      updateAsanaGroup,
      deleteAsanaGroup
    }),
    [createAsanaGroup, updateAsanaGroup, deleteAsanaGroup]
  )
}
