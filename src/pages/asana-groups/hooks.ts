import {notification} from 'antd'

import {
  CreateAsanaGroupRequest,
  createAsanaGroup as createAsanaGroupAction,
  updateAsanaGroup as updateAsanaGroupAction,
  deleteAsanaGroup as deleteAsanaGroupAction,
  API_PREFIX
} from 'api/group-actions'

import {useRouter} from 'next/router'
import {useCallback, useMemo} from 'react'

interface UseAsanaGroupActions {
  createAsanaGroup: (data: CreateAsanaGroupRequest) => Promise<void>
  updateAsanaGroup: (data: CreateAsanaGroupRequest) => Promise<void>
  deleteAsanaGroup: () => Promise<void>
}

export const useAsanaGroupActions = (): UseAsanaGroupActions => {
  const router = useRouter()

  const createAsanaGroup = useCallback(
    async (formData: CreateAsanaGroupRequest) => {
      try {
        await createAsanaGroupAction(formData)

        notification['success']({
          message: 'Группа успешно создана'
        })
      } catch (error) {
        console.error(error)

        notification['error']({
          message: 'Ошибка',
          description: 'При создании группы возникла ошибка'
        })
      }
    },
    []
  )

  const updateAsanaGroup = useCallback(
    async (formData: CreateAsanaGroupRequest) => {
      try {
        await updateAsanaGroupAction(
          `${API_PREFIX}/${router.query.id}`,
          formData
        )

        notification['success']({
          message: 'Группа успешно отредактирована'
        })
      } catch {
        notification['error']({
          message: 'Ошибка',
          description: 'При редактировании группы возникла ошибка'
        })
      }
    },
    [router.query.id]
  )

  const deleteAsanaGroup = useCallback(async () => {
    try {
      await deleteAsanaGroupAction(`${API_PREFIX}/${router.query.id}`)

      notification['success']({
        message: 'Группа успешно удалена'
      })
    } catch {
      notification['error']({
        message: 'Ошибка',
        description: 'При удалении группы возникла ошибка'
      })
    }
  }, [router.query.id])

  return useMemo(
    () => ({
      createAsanaGroup,
      updateAsanaGroup,
      deleteAsanaGroup
    }),
    [createAsanaGroup, updateAsanaGroup, deleteAsanaGroup]
  )
}
