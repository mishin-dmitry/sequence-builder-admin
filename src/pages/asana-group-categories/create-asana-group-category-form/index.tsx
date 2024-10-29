import React, {useCallback, useEffect} from 'react'

import {Button} from 'antd'
import {Input} from 'components/input'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {Row} from 'components/row'

import styles from './styles.module.css'

export interface CreateAsanaGroupCategoryFormFields {
  name: string
}

interface CreateAsanaGroupCategoryFormProps {
  onSubmit: (data: CreateAsanaGroupCategoryFormFields) => Promise<void>
  defaultValues?: Partial<CreateAsanaGroupCategoryFormFields>
  onDelete?: () => void
}

export const CreateAsanaGroupCategoryForm: React.FC<
  CreateAsanaGroupCategoryFormProps
> = ({onSubmit: onSubmitProp, defaultValues, onDelete}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: {isDirty, isSubmitting, isValid}
  } = useForm<CreateAsanaGroupCategoryFormFields>({
    defaultValues
  })

  const onSubmit: SubmitHandler<CreateAsanaGroupCategoryFormFields> = (
    data
  ) => {
    onSubmitProp(data)

    reset()
  }

  const onDeleteButtonClick = useCallback(() => onDelete?.(), [onDelete])

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
            message: 'Введите название категории групп'
          }
        }}
        render={({field, fieldState}) => (
          <Row>
            <Input
              value={field.value}
              onChange={field.onChange}
              placeholder="Введите название категории"
              size="large"
              status={fieldState.error && 'error'}
              label="Название категории"
              name={field.name}
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
