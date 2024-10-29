import {notification} from 'antd'

import {
  CreateAsanaGroupCategoryRequest,
  createAsanaGroupCategory as createAsanaGroupCategoryAction,
  updateAsanaGroupCategory as updateAsanaGroupCategoryAction,
  deleteAsanaGroupCategory as deleteAsanaGroupCategoryAction,
  API_PREFIX
} from 'api/group-category-actions'
import {useData} from 'context/asanas'

import {useCallback, useMemo} from 'react'

interface UseAsanaGroupCategoryActions {
  createAsanaGroupCategory: (
    data: CreateAsanaGroupCategoryRequest
  ) => Promise<void>
  updateAsanaGroupCategory: (
    data: CreateAsanaGroupCategoryRequest,
    id: number
  ) => Promise<void>
  deleteAsanaGroupCategory: (id: number) => Promise<void>
}

export const useAsanaGroupCategoryActions =
  (): UseAsanaGroupCategoryActions => {
    const {fetchAsanaGroupCategories} = useData()

    const createAsanaGroupCategory = useCallback(
      async (formData: CreateAsanaGroupCategoryRequest) => {
        try {
          await createAsanaGroupCategoryAction(formData)

          notification['success']({
            message: 'Категория успешно создана'
          })

          await fetchAsanaGroupCategories?.()
        } catch (error) {
          console.error(error)

          notification['error']({
            message: 'Ошибка',
            description: 'При создании категории возникла ошибка'
          })
        }
      },
      [fetchAsanaGroupCategories]
    )

    const updateAsanaGroupCategory = useCallback(
      async (formData: CreateAsanaGroupCategoryRequest, id: number) => {
        try {
          await updateAsanaGroupCategoryAction(`${API_PREFIX}/${id}`, formData)

          notification['success']({
            message: 'Категория успешно отредактирована'
          })

          await fetchAsanaGroupCategories?.()
        } catch {
          notification['error']({
            message: 'Ошибка',
            description: 'При редактировании категории возникла ошибка'
          })
        }
      },
      [fetchAsanaGroupCategories]
    )

    const deleteAsanaGroupCategory = useCallback(
      async (id: number) => {
        try {
          await deleteAsanaGroupCategoryAction(`${API_PREFIX}/${id}`)

          notification['success']({
            message: 'Категория успешно удалена'
          })

          await fetchAsanaGroupCategories?.()
        } catch {
          notification['error']({
            message: 'Ошибка',
            description: 'При удалении категории возникла ошибка'
          })
        }
      },
      [fetchAsanaGroupCategories]
    )

    return useMemo(
      () => ({
        createAsanaGroupCategory,
        updateAsanaGroupCategory,
        deleteAsanaGroupCategory
      }),
      [
        createAsanaGroupCategory,
        updateAsanaGroupCategory,
        deleteAsanaGroupCategory
      ]
    )
  }
