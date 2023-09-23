import React, {useCallback, useMemo, useState} from 'react'

import {CreateAsanaForm, CreateAsanaFormFields} from './create-asana-form'

import {AsanaCard} from 'components/asana-card'
import {FormWrapper} from 'components/form-wrapper'
import {useAsanaActions} from '../hooks'
import {useAsana} from 'context/asanas'
import {Spinner} from 'components/spinner'

const CreateAsanaPage: React.FC = () => {
  const [formData, setFormData] = useState<Partial<CreateAsanaFormFields>>({})

  const {createAsana} = useAsanaActions()
  const {isFetching} = useAsana()

  const onSubmit = useCallback(createAsana, [createAsana])

  const onFormChange = useCallback(
    (data: CreateAsanaFormFields) => setFormData(data),
    []
  )

  const preview = useMemo(() => <AsanaCard data={formData} />, [formData])

  if (isFetching) {
    return <Spinner />
  }

  return (
    <FormWrapper preview={preview}>
      <CreateAsanaForm
        onSubmit={onSubmit}
        onFormChange={onFormChange}
        isImageRequired
      />
    </FormWrapper>
  )
}

export default CreateAsanaPage
