import React, {useCallback, useMemo, useState} from 'react'

import {
  CreateAsanaGroupForm,
  CreateAsanaGroupFormFields
} from './create-asana-form'

import {AsanaCard} from 'components/asana-card'
import {FormWrapper} from 'components/form-wrapper'
import {useAsanaGroupActions} from '../hooks'
import {useData} from 'context/asanas'
import {Spinner} from 'components/spinner'

const CreateAsanaGroupPage: React.FC = () => {
  const [formData, setFormData] = useState<CreateAsanaGroupFormFields>({
    name: ''
  })

  const {createAsanaGroup} = useAsanaGroupActions()
  const {isFetching} = useData()

  const onSubmit = useCallback(createAsanaGroup, [createAsanaGroup])

  const onFormChange = useCallback(
    (data: CreateAsanaGroupFormFields) => setFormData(data),
    []
  )

  const preview = useMemo(() => <AsanaCard data={formData} />, [formData])

  if (isFetching) {
    return <Spinner />
  }

  return (
    <FormWrapper preview={preview}>
      <CreateAsanaGroupForm
        onSubmit={onSubmit}
        onFormChange={onFormChange}
        isImageRequired
      />
    </FormWrapper>
  )
}

export default CreateAsanaGroupPage
