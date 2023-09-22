import React, {useCallback, useEffect, useMemo, useState} from 'react'

import {useRouter} from 'next/router'
import {
  CreateAsanaForm,
  CreateAsanaFormFields
} from '../create/create-asana-form'
import {CreateAsanaRequest, updateAsana} from 'api/actions'
import {FormWrapper} from 'components/form-wrapper'
import {AsanaCard} from 'components/asana-card'
import {Asana} from 'types'
import {useAsana} from 'context/asanas'

const EditAsanaPage: React.FC = () => {
  const [asana, setAsana] = useState<Asana>()
  const [formData, setFormData] = useState<any>(null)

  const router = useRouter()

  const {getAsanaById, isFetching} = useAsana()

  useEffect(() => {
    if (router.query.id && !isFetching) {
      const currentAsana = getAsanaById(+router.query.id)

      setAsana(currentAsana)
    }
  }, [router.isReady, isFetching])

  const onSubmit = useCallback(
    async ({name, description, image}: CreateAsanaRequest) => {
      const formData = new FormData()

      formData.append('name', name)
      formData.append('description', description)
      formData.append('image', image)

      await updateAsana(formData as any)
    },
    [router]
  )

  const onFormChange = useCallback(
    (data: CreateAsanaFormFields) => setFormData(data),
    []
  )

  const defaultValues = useMemo(
    () => ({name: asana?.name, description: asana?.description}),
    [asana]
  )

  const asanaCardData = useMemo(() => {
    if (formData === null) {
      return asana
    } else {
      const currentFormData = formData

      if (!currentFormData.image) {
        currentFormData.image = asana?.image
      }

      return currentFormData
    }
  }, [asana, formData])

  if (isFetching) {
    return null
  }

  return (
    <FormWrapper preview={<AsanaCard data={asanaCardData} />}>
      <CreateAsanaForm
        onSubmit={onSubmit}
        onFormChange={onFormChange}
        defaultValues={defaultValues}
      />
    </FormWrapper>
  )
}

export default EditAsanaPage
