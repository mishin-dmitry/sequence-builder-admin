import React, {useCallback, useEffect, useMemo, useState} from 'react'

import {Spinner} from 'components/spinner'
import type {AsanaGroup} from 'types'
import {Button, Modal, Table} from 'antd'
import {useData} from 'context/asanas'

import styles from './styles.module.css'

import {
  CreateAsanaGroupForm,
  CreateAsanaGroupFormFields
} from './create-asana-group-form'

import {useAsanaGroupActions} from './hooks'

const AsanaListPage: React.FC = () => {
  const [currentGroupId, setCurrenGroupId] = useState(-1)
  const [currentGroup, setCurrentGroup] = useState<AsanaGroup | null>(null)
  const [shouldShowEmptyForm, setShouldShowEmptyForm] = useState(false)

  const {isFetching, asanaGroups, getInstanceById} = useData()
  const {updateAsanaGroup, deleteAsanaGroup, createAsanaGroup} =
    useAsanaGroupActions()

  useEffect(() => {
    if (currentGroupId) {
      const currentGroup = getInstanceById(
        'groups',
        currentGroupId
      ) as AsanaGroup

      setCurrentGroup(currentGroup)
    }
  }, [currentGroupId, getInstanceById])

  const dataSource = useMemo(
    () => asanaGroups.map(({id, name}, index) => ({id, name, key: index})),
    [asanaGroups]
  )

  const onRowClick = useCallback(
    ({id}: {id: number}) => ({onClick: () => setCurrenGroupId(id)}),
    []
  )

  const onEditFormSubmit = useCallback(
    async (formData: CreateAsanaGroupFormFields) => {
      await updateAsanaGroup(formData, currentGroupId)
    },
    [currentGroupId, updateAsanaGroup]
  )

  const onCreateFormSubmit = useCallback(
    async (formData: CreateAsanaGroupFormFields) => {
      await createAsanaGroup(formData)

      setShouldShowEmptyForm(false)
    },
    [createAsanaGroup]
  )

  const defaultValues = useMemo<CreateAsanaGroupFormFields>(
    () => ({
      name: currentGroup?.name ?? ''
    }),
    [currentGroup?.name]
  )

  const showDeleteConfirm = useCallback(() => {
    Modal.confirm({
      title: 'Вы действительно хотите удалить группу асан?',
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        deleteAsanaGroup(currentGroupId)
      }
    })
  }, [currentGroupId, deleteAsanaGroup])

  const onButtonClick = useCallback(() => setShouldShowEmptyForm(true), [])

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
          Создать группу
        </Button>
      </div>
      {currentGroup && (
        <CreateAsanaGroupForm
          onSubmit={onEditFormSubmit}
          defaultValues={defaultValues}
          onDelete={showDeleteConfirm}
        />
      )}
      {shouldShowEmptyForm && (
        <CreateAsanaGroupForm onSubmit={onCreateFormSubmit} />
      )}
    </div>
  )
}

export default AsanaListPage
