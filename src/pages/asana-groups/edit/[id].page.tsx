import React, {useCallback, useEffect, useMemo, useState} from 'react'

import {useRouter} from 'next/router'

import {
  CreateAsanaGroupForm,
  CreateAsanaGroupFormFields
} from '../create/create-asana-form'

import {FormWrapper} from 'components/form-wrapper'
import {AsanaCard} from 'components/asana-card'
import type {AsanaGroup} from 'types'
import {useData} from 'context/asanas'
import {Modal} from 'antd'
import {useAsanaGroupActions} from '../hooks'
import {Spinner} from 'components/spinner'

const EditAsanaGroupPage: React.FC = () => {
  const [asana, setAsana] = useState<AsanaGroup>()
  const [formData, setFormData] = useState<any>(null)

  const router = useRouter()

  const {getInstanceById, isFetching} = useData()
  const {updateAsanaGroup, deleteAsanaGroup} = useAsanaGroupActions()

  useEffect(() => {
    if (router.query.id && !isFetching) {
      const currentAsana = getInstanceById(
        'groups',
        +router.query.id
      ) as AsanaGroup

      setAsana(currentAsana)
    }
  }, [router.isReady, isFetching, router.query.id, getInstanceById])

  const onSubmit = useCallback(updateAsanaGroup, [updateAsanaGroup])

  const onFormChange = useCallback(
    (data: CreateAsanaGroupFormFields) => setFormData(data),
    []
  )

  const defaultValues = useMemo<CreateAsanaGroupFormFields>(
    () => ({
      name: asana?.name ?? ''
    }),
    [asana]
  )

  const asanaCardData = useMemo(
    () => (formData === null ? asana : formData),
    [asana, formData]
  )

  const showDeleteConfirm = useCallback(() => {
    Modal.confirm({
      title: 'Вы действительно хотите удалить группу асан?',
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        deleteAsanaGroup()
      }
    })
  }, [deleteAsanaGroup])

  if (isFetching) {
    return <Spinner />
  }

  return (
    <FormWrapper preview={<AsanaCard data={asanaCardData} />}>
      <CreateAsanaGroupForm
        onSubmit={onSubmit}
        onFormChange={onFormChange}
        defaultValues={defaultValues}
        onDelete={showDeleteConfirm}
      />
    </FormWrapper>
  )
}

export default EditAsanaGroupPage
