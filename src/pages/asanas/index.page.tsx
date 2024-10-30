import React, {useCallback, useEffect, useMemo, useState} from 'react'

import {useData} from 'context/asanas'
import {Button, Modal, Table, Input} from 'antd'
import {useAsanaActions} from './hooks'
import {iconsMap} from 'icons'
import {CreateAsanaForm, type CreateAsanaFormFields} from './create-asana-form'

import type {Asana} from 'types'

import styles from './styles.module.css'

const AsanasListPage: React.FC = () => {
  const [currentAsanaId, setCurrentAsanaId] = useState(-1)
  const [currentAsana, setCurrentAsana] = useState<Asana | null>(null)
  const [shouldShowEmptyForm, setShouldShowEmptyForm] = useState(false)

  const {asanas: allAsanas, getInstanceById} = useData()

  const [asanas, setAsanas] = useState(allAsanas)

  useEffect(() => {
    setAsanas(allAsanas)
  }, [allAsanas])

  const {updateAsana, deleteAsana, createAsana} = useAsanaActions()

  useEffect(() => {
    if (currentAsanaId) {
      const currentAsana = getInstanceById('asanas', currentAsanaId) as Asana

      setCurrentAsana(currentAsana)
    }
  }, [currentAsana, currentAsanaId, getInstanceById])

  const dataSource = useMemo(
    () =>
      asanas.map(
        (
          {
            name,
            alias,
            canBeGenerated,
            id,
            isAsymmetrical,
            canBeStartOfSequence
          },
          index
        ) => ({
          name,
          alias,
          id,
          key: index,
          filterSearch: true,
          icon: iconsMap[alias],
          index: index + 1,
          canBeGenerated,
          isAsymmetrical,
          canBeStartOfSequence
        })
      ),
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

  const onSearch = (searchText: string): void => {
    const filteredAsanas = allAsanas.filter(({name}) => {
      return name.toLowerCase().includes(searchText)
    })

    setAsanas(filteredAsanas)
  }

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
      pirs: currentAsana?.pirs ?? [],
      continuingAsanas: currentAsana?.continuingAsanas ?? [],
      canBeStartOfSequence: !!currentAsana?.canBeStartOfSequence,
      canBeGenerated: !!currentAsana?.canBeGenerated,
      isAsymmetrical: !!currentAsana?.isAsymmetrical,
      groupForGenerating: currentAsana?.groupForGenerating || undefined,
      image: currentAsana?.image
        ? [
            {
              uid: '-1',
              status: 'done',
              url: currentAsana.image,
              name: currentAsana.image.split('/').pop() as string
            }
          ]
        : []
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

  // if (isFetching) {
  // return <Spinner />
  // }

  return (
    <div className={styles.root}>
      <div className={styles.tableWrapper}>
        <Table
          pagination={{pageSize: 100}}
          dataSource={dataSource}
          columns={[
            {title: '', dataIndex: 'index', key: 'index'},
            {
              title: 'Иконка',
              dataIndex: 'icon',
              key: 'icon',
              align: 'center',
              render: (icon) => (
                <img
                  width={75}
                  height={75}
                  loading="lazy"
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(icon)}`}
                  alt="Изображение асаны"
                />
              )
            },
            {
              title: 'Название',
              dataIndex: 'name',
              key: 'name',
              sorter: (a, b) =>
                a.name < b.name ? -1 : a.name > b.name ? 1 : 0,
              filterSearch: true,
              onFilter: (value, record) =>
                record.name.includes(value.toString())
            },
            {
              title: 'Алиас',
              dataIndex: 'alias',
              key: 'alias'
            },
            {
              title: 'Генерируемая',
              dataIndex: 'canBeGenerated',
              key: 'canBeGenerated',
              filters: [
                {text: 'Да', value: true},
                {text: 'Нет', value: false}
              ],
              onFilter: (value, {canBeGenerated}) =>
                value ? canBeGenerated : !canBeGenerated,
              render: (value) => (value ? 'Да' : 'Нет')
            },
            {
              title: 'Ассиметричная',
              dataIndex: 'isAsymmetrical',
              key: 'isAsymmetrical',
              filters: [
                {text: 'Да', value: true},
                {text: 'Нет', value: false}
              ],
              onFilter: (value, {isAsymmetrical}) =>
                value ? isAsymmetrical : !isAsymmetrical,
              render: (value) => (value ? 'Да' : 'Нет')
            },
            {
              title: 'Может быть началом',
              dataIndex: 'canBeStartOfSequence',
              key: 'canBeStartOfSequence',
              filters: [
                {text: 'Да', value: true},
                {text: 'Нет', value: false}
              ],
              onFilter: (value, {canBeStartOfSequence}) =>
                value ? canBeStartOfSequence : !canBeStartOfSequence,
              render: (value) => (value ? 'Да' : 'Нет')
            },
            {
              title: () => (
                <Input.Search
                  placeholder="Введите название асаны"
                  onChange={(e) => onSearch(e.target.value)}
                  style={{width: 200}}
                />
              )
            }
          ]}
          onRow={onRowClick}
        />
        <Button type="primary" onClick={onButtonClick}>
          Создать асану
        </Button>
      </div>

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
