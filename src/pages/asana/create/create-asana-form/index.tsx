import React, {useCallback, useEffect, useMemo} from 'react'

import {Button, Select} from 'antd'
import {Input} from 'components/input'
import {Textarea} from 'components/textarea'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {Row} from 'components/row'
import {useData} from 'context/asanas'

import styles from './styles.module.css'

export interface CreateAsanaFormFields {
  name: string
  description: string
  alias: string
  searchKeys: string
  groups?: {
    value: number
    label: string
  }[]
}

interface CreateAsanaFormProps {
  onSubmit: (data: CreateAsanaFormFields) => Promise<void>
  onFormChange: (data: CreateAsanaFormFields) => void
  defaultValues?: Partial<CreateAsanaFormFields>
  isImageRequired?: boolean
  onDelete?: () => void
}

export const CreateAsanaForm: React.FC<CreateAsanaFormProps> = ({
  onSubmit: onSubmitProp,
  onFormChange,
  defaultValues,
  onDelete
}) => {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: {isDirty, isSubmitting, isValid}
  } = useForm<CreateAsanaFormFields>({
    defaultValues
  })

  const onSubmit: SubmitHandler<CreateAsanaFormFields> = (data) => {
    onSubmitProp(data)

    reset()
  }

  const {asanaGroups} = useData()

  const options = useMemo(
    () => asanaGroups.map(({id, name}) => ({value: id, label: name})),
    [asanaGroups]
  )

  const onDeleteButtonClick = useCallback(() => onDelete?.(), [onDelete])

  useEffect(() => {
    const subscription = watch((value) => {
      onFormChange(value as CreateAsanaFormFields)
    })

    return () => subscription.unsubscribe()
  }, [onFormChange, watch])

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <Controller
        name="name"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Введите название асаны'
          }
        }}
        render={({field, fieldState}) => (
          <Row>
            <Input
              value={field.value}
              onChange={field.onChange}
              placeholder="Введите название асаны"
              size="large"
              status={fieldState.error && 'error'}
              label="Название асаны"
              name={field.name}
            />
          </Row>
        )}
      />

      <Controller
        name="alias"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Введите алиас асаны'
          }
        }}
        render={({field, fieldState}) => (
          <Row>
            <Input
              value={field.value}
              onChange={field.onChange}
              placeholder="Введите алиас асаны"
              size="large"
              status={fieldState.error && 'error'}
              label="Алиас асаны"
              name={field.name}
            />
          </Row>
        )}
      />

      <Controller
        name="groups"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Введите алиас асаны'
          }
        }}
        render={({field}) => (
          <Row>
            <Select
              mode="tags"
              size="large"
              value={field.value}
              options={options}
              onChange={field.onChange}
              placeholder="Выберите группы асаны"
              style={{width: '100%'}}
            />
          </Row>
        )}
      />

      <Controller
        name="searchKeys"
        control={control}
        render={({field, fieldState}) => (
          <Row>
            <Input
              value={field.value}
              onChange={field.onChange}
              placeholder="Введите ключи для поиска асаны"
              size="large"
              status={fieldState.error && 'error'}
              label="Ключи для поиска асан"
              name={field.name}
            />
          </Row>
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({field, fieldState}) => (
          <Row>
            <Textarea
              value={field.value}
              onChange={field.onChange}
              name={field.name}
              placeholder="Введите описание асаны"
              size="large"
              status={fieldState.error && 'error'}
              label="Описание асаны"
            />
          </Row>
        )}
      />

      <div className={styles.buttonsWrapper}>
        {typeof onDelete === 'function' && (
          <Button
            type="primary"
            danger
            size="large"
            disabled={isSubmitting}
            onClick={onDeleteButtonClick}>
            Удалить
          </Button>
        )}
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          disabled={!isDirty || !isValid || isSubmitting}>
          Сохранить
        </Button>
      </div>
    </form>
  )
}
