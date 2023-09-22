import React, {useCallback, useState} from 'react'

import {CreateAsanaForm, CreateAsanaFormFields} from './creat-asana-form'
import {CreateAsanaRequest, createAsana} from 'api/actions'

import styles from './styles.module.css'
import {AsanaCard} from 'components/asana-card'

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
    <div className={styles.root}>
      <div className={styles.formWrapper}>
        <CreateAsanaForm onSubmit={onSubmit} onFormChange={onFormChange} />
      </div>
      <div className={styles.previewWrapper}>
        <AsanaCard data={formData as any} isPreview />
      </div>
    </div>
  )
}

export default CreateAsanaPage
