import React, {useCallback, useEffect, useMemo, useState} from 'react'

import {useData} from 'context/asanas'
import {Spinner} from 'components/spinner'
import {Button, Modal, Table, Typography} from 'antd'

import {useAsanaActions} from './hooks'

import {CreateAsanaForm, type CreateAsanaFormFields} from './create-asana-form'

import type {Asana} from 'types'

import styles from './styles.module.css'

const AsanasListPage: React.FC = () => {
  const [currentAsanaId, setCurrentAsanaId] = useState(-1)
  const [currentAsana, setCurrentAsana] = useState<Asana | null>(null)
  const [shouldShowEmptyForm, setShouldShowEmptyForm] = useState(false)

  const {isFetching, asanas, getInstanceById} = useData()

  const {updateAsana, deleteAsana, createAsana} = useAsanaActions()

  useEffect(() => {
    if (currentAsanaId) {
      const currentAsana = getInstanceById('asanas', currentAsanaId) as Asana

      setCurrentAsana(currentAsana)
    }
  }, [currentAsana, currentAsanaId, getInstanceById])

  const dataSource = useMemo(
    () =>
      asanas.map(({id, name, alias}, index) => ({
        id,
        name,
        alias,
        key: index,
        filterSearch: true,
        defaultSortOrder: 'ascend'
      })),
    [asanas]
  )

  const onRowClick = useCallback(
    ({id}: {id: number}) => ({
      onClick: () => {
        setCurrentAsanaId(id)

        if (shouldShowEmptyForm) {
          setShouldShowEmptyForm(false)
        }
      }
    }),
    [shouldShowEmptyForm]
  )

  const onEditFormSubmit = useCallback(
    async (formData: CreateAsanaFormFields) =>
      await updateAsana(formData, currentAsanaId),
    [currentAsanaId, updateAsana]
  )

  const onCreateFormSubmit = useCallback(
    async (formData: CreateAsanaFormFields) => {
      await createAsana(formData)
      setShouldShowEmptyForm(false)
    },
    [createAsana]
  )

  const defaultValues = useMemo<CreateAsanaFormFields>(
    () => ({
      name: currentAsana?.name ?? '',
      description: currentAsana?.description ?? '',
      alias: currentAsana?.alias ?? '',
      searchKeys: currentAsana?.searchKeys ?? '',
      groups: (currentAsana?.groups ?? []).map(({id}) => id),
      alignment: currentAsana?.alignment ?? '',
      pirs: currentAsana?.pirs ?? []
    }),
    [currentAsana]
  )

  const showDeleteConfirm = useCallback(() => {
    Modal.confirm({
      title: 'Вы действительно хотите удалить асану?',
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        deleteAsana(currentAsanaId)
      }
    })
  }, [currentAsanaId, deleteAsana])

  const onButtonClick = useCallback(() => {
    setCurrentAsana(null)
    setCurrentAsanaId(-1)
    setShouldShowEmptyForm(true)
  }, [])

  if (isFetching) {
    return <Spinner />
  }

  return (
    <div className={styles.root}>
      {!asanas.length ? (
        <Typography.Title level={1}>Список пуст</Typography.Title>
      ) : (
        <div className={styles.tableWrapper}>
          <Table
            pagination={{pageSize: 100}}
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
                sorter: (a, b) =>
                  a.name < b.name ? -1 : a.name > b.name ? 1 : 0
              },
              {
                title: 'Алиас',
                dataIndex: 'alias',
                key: 'alias'
              }
            ]}
            onRow={onRowClick}
          />
          <Button type="primary" onClick={onButtonClick}>
            Создать асану
          </Button>
        </div>
      )}
      {currentAsana && (
        <CreateAsanaForm
          onSubmit={onEditFormSubmit}
          defaultValues={defaultValues}
          onDelete={showDeleteConfirm}
        />
      )}
      {shouldShowEmptyForm && <CreateAsanaForm onSubmit={onCreateFormSubmit} />}
    </div>
  )
}

export default AsanasListPage
