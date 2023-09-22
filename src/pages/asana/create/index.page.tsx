import React, {useCallback, useState} from 'react'

import {CreateAsanaForm, CreateAsanaFormFields} from './create-asana-form'
import {CreateAsanaRequest, createAsana} from 'api/actions'

import {AsanaCard} from 'components/asana-card'
import {FormWrapper} from 'components/form-wrapper'

const CreateAsanaPage: React.FC = () => {
  const [formData, setFormData] = useState<Partial<CreateAsanaFormFields>>({})

  const onSubmit = useCallback(
    async ({name, description, image}: CreateAsanaRequest) => {
      const formData = new FormData()

      formData.append('name', name)
      formData.append('description', description)
      formData.append('image', image)

      await createAsana(formData as any)
    },
    []
  )

  const onFormChange = useCallback(
    (data: CreateAsanaFormFields) => setFormData(data),
    []
  )

  return (
    <FormWrapper preview={<AsanaCard data={formData} />}>
      <CreateAsanaForm onSubmit={onSubmit} onFormChange={onFormChange} />
    </FormWrapper>
  )
}

export default CreateAsanaPage
