import React, {useCallback, useEffect, useMemo, useState} from 'react'

import {Spinner} from 'components/spinner'
import type {AsanaGroup} from 'types'
import {Button, Modal, Table} from 'antd'
import {useData} from 'context/asanas'

import styles from './styles.module.css'

import {
  CreateAsanaGroupCategoryForm,
  type CreateAsanaGroupCategoryFormFields
} from './create-asana-group-category-form'

import {useAsanaGroupCategoryActions} from './hooks'

const AsanaGroupCategoriesPage: React.FC = () => {
  const [currentGroupCategoryId, setCurrenGroupCategoryId] = useState(-1)
  const [shouldShowEmptyForm, setShouldShowEmptyForm] = useState(false)

  const [currentGroupCategory, setCurrentGroupCategory] =
    useState<AsanaGroup | null>(null)

  const {isFetching, asanaGroupCategories, getInstanceById} = useData()

  const {
    updateAsanaGroupCategory,
    deleteAsanaGroupCategory,
    createAsanaGroupCategory
  } = useAsanaGroupCategoryActions()

  useEffect(() => {
    if (currentGroupCategoryId) {
      const currentGroupCategory = getInstanceById(
        'categories',
        currentGroupCategoryId
      ) as AsanaGroup

      setCurrentGroupCategory(currentGroupCategory)
    }
  }, [currentGroupCategoryId, getInstanceById])

  const dataSource = useMemo(
    () =>
      asanaGroupCategories.map(({id, name}, index) => ({
        id,
        name,
        key: index
      })),
    [asanaGroupCategories]
  )

  const onRowClick = useCallback(
    ({id}: {id: number}) => ({
      onClick: () => {
        setCurrenGroupCategoryId(id)

        if (shouldShowEmptyForm) {
          setShouldShowEmptyForm(false)
        }
      }
    }),
    [shouldShowEmptyForm]
  )

  const onEditFormSubmit = useCallback(
    async (formData: CreateAsanaGroupCategoryFormFields) => {
      await updateAsanaGroupCategory(formData, currentGroupCategoryId)
    },
    [currentGroupCategoryId, updateAsanaGroupCategory]
  )

  const onCreateFormSubmit = useCallback(
    async (formData: CreateAsanaGroupCategoryFormFields) => {
      await createAsanaGroupCategory(formData)

      setShouldShowEmptyForm(false)
    },
    [createAsanaGroupCategory]
  )

  const defaultValues = useMemo<CreateAsanaGroupCategoryFormFields>(
    () => ({
      name: currentGroupCategory?.name ?? ''
    }),
    [currentGroupCategory?.name]
  )

  const showDeleteConfirm = useCallback(() => {
    Modal.confirm({
      title: 'Вы действительно хотите удалить категорию групп асан?',
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        deleteAsanaGroupCategory(currentGroupCategoryId)
      }
    })
  }, [currentGroupCategoryId, deleteAsanaGroupCategory])

  const onButtonClick = useCallback(() => {
    setCurrenGroupCategoryId(-1)
    setCurrentGroupCategory(null)
    setShouldShowEmptyForm(true)
  }, [])

  if (isFetching) {
    return <Spinner />
  }

  return (
    <div className={styles.root}>
      <div className={styles.tableWrapper}>
        <Table
          dataSource={dataSource}
          columns={[
            {
              title: 'Id',
              dataIndex: 'id',
              key: 'id',
              defaultSortOrder: 'descend',
              sorter: (a, b) => b.id - a.id
            },
            {
              title: 'Название',
              dataIndex: 'name',
              key: 'name',
              defaultSortOrder: 'descend',
              sorter: (a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
            }
          ]}
          onRow={onRowClick}
        />
        <Button type="primary" onClick={onButtonClick}>
          Создать категорию групп
        </Button>
      </div>
      {currentGroupCategory && (
        <CreateAsanaGroupCategoryForm
          onSubmit={onEditFormSubmit}
          defaultValues={defaultValues}
          onDelete={showDeleteConfirm}
        />
      )}
      {shouldShowEmptyForm && (
        <CreateAsanaGroupCategoryForm onSubmit={onCreateFormSubmit} />
      )}
    </div>
  )
}

export default AsanaGroupCategoriesPage
