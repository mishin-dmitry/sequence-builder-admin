import React, {useCallback, useEffect, useMemo, useState} from 'react'

import {useRouter} from 'next/router'

import {
  CreateAsanaForm,
  CreateAsanaFormFields
} from '../create/create-asana-form'

import {FormWrapper} from 'components/form-wrapper'
import {AsanaCard} from 'components/asana-card'
import type {Asana} from 'types'
import {useData} from 'context/asanas'
import {Modal} from 'antd'
import {useAsanaActions} from '../hooks'
import {Spinner} from 'components/spinner'

const EditAsanaPage: React.FC = () => {
  const [asana, setAsana] = useState<Asana>()
  const [formData, setFormData] = useState<any>(null)

  const router = useRouter()

  const {getInstanceById, isFetching} = useData()
  const {updateAsana, deleteAsana} = useAsanaActions()

  useEffect(() => {
    if (router.query.id && !isFetching) {
      const currentAsana = getInstanceById('asanas', +router.query.id) as Asana

      setAsana(currentAsana)
    }
  }, [router.isReady, isFetching, router.query.id, getInstanceById])

  const onSubmit = useCallback(updateAsana, [updateAsana])

  const onFormChange = useCallback(
    (data: CreateAsanaFormFields) => setFormData(data),
    []
  )

  const defaultValues = useMemo<CreateAsanaFormFields>(
    () => ({
      name: asana?.name ?? '',
      description: asana?.description ?? '',
      alias: asana?.alias ?? '',
      searchKeys: asana?.searchKeys ?? '',
      groups: (asana?.groups ?? []).map(({id, name}) => ({
        value: id,
        label: name
      }))
    }),
    [asana]
  )

  const asanaCardData = useMemo(
    () => (formData === null ? asana : formData),
    [asana, formData]
  )

  const showDeleteConfirm = useCallback(() => {
    Modal.confirm({
      title: 'Вы действительно хотите удалить асану?',
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        deleteAsana()
      }
    })
  }, [deleteAsana])

  if (isFetching) {
    return <Spinner />
  }

  return (
    <FormWrapper preview={<AsanaCard data={asanaCardData} />}>
      <CreateAsanaForm
        onSubmit={onSubmit}
        onFormChange={onFormChange}
        defaultValues={defaultValues}
        onDelete={showDeleteConfirm}
      />
    </FormWrapper>
  )
}

export default EditAsanaPage
