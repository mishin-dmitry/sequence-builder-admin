import React, {useCallback, useEffect, useMemo} from 'react'

import {Button, Select} from 'antd'
import {Input} from 'components/input'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {Row} from 'components/row'

import styles from './styles.module.css'
import {useData} from 'context/asanas'

export interface CreateAsanaGroupFormFields {
  name: string
  categoryId: number
}

interface CreateAsanaGroupFormProps {
  onSubmit: (data: CreateAsanaGroupFormFields) => Promise<void>
  defaultValues?: Partial<CreateAsanaGroupFormFields>
  onDelete?: () => void
}

export const CreateAsanaGroupForm: React.FC<CreateAsanaGroupFormProps> = ({
  onSubmit: onSubmitProp,
  defaultValues,
  onDelete
}) => {
  const {asanaGroupCategories} = useData()

  const {
    handleSubmit,
    control,
    reset,
    formState: {isDirty, isSubmitting, isValid}
  } = useForm<CreateAsanaGroupFormFields>({
    defaultValues
  })

  const onSubmit: SubmitHandler<CreateAsanaGroupFormFields> = (data) => {
    onSubmitProp(data)

    reset()
  }

  const onDeleteButtonClick = useCallback(() => onDelete?.(), [onDelete])

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const asanaGroupCategoriesOptions = useMemo(
    () => asanaGroupCategories.map(({id, name}) => ({value: id, label: name})),
    [asanaGroupCategories]
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <Controller
        name="name"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Введите название группы'
          }
        }}
        render={({field, fieldState}) => (
          <Row>
            <Input
              value={field.value}
              onChange={field.onChange}
              placeholder="Введите название группы"
              size="large"
              status={fieldState.error && 'error'}
              label="Название группы"
              name={field.name}
            />
          </Row>
        )}
      />

      <Controller
        name="categoryId"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Выберите категорию'
          }
        }}
        render={({field, fieldState}) => (
          <Row>
            <Select
              value={field.value}
              onChange={field.onChange}
              placeholder="Выберите категорию"
              size="large"
              options={asanaGroupCategoriesOptions}
              status={fieldState.error && 'error'}
              style={{width: '100%'}}
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
