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
  alignment: string
  alias: string
  searchKeys: string
  groups?: number[]
  pirs?: number[]
}

interface CreateAsanaFormProps {
  onSubmit: (data: CreateAsanaFormFields) => Promise<void>
  defaultValues?: Partial<CreateAsanaFormFields>
  onDelete?: () => void
}

export const CreateAsanaForm: React.FC<CreateAsanaFormProps> = ({
  onSubmit: onSubmitProp,
  defaultValues,
  onDelete
}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: {isDirty, isSubmitting, isValid}
  } = useForm<CreateAsanaFormFields>({
    defaultValues
  })

  const onSubmit: SubmitHandler<CreateAsanaFormFields> = (data) => {
    onSubmitProp(data)

    reset()
  }

  const {asanaGroups, asanas} = useData()

  const asanaGroupOptions = useMemo(
    () => asanaGroups.map(({id, name}) => ({value: id, label: name})),
    [asanaGroups]
  )

  const asanaPirOptions = useMemo(
    () => asanas.map(({id, name}) => ({value: id, label: name})),
    [asanas]
  )

  const onDeleteButtonClick = useCallback(() => onDelete?.(), [onDelete])

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        render={({field}) => (
          <Row>
            <Select
              mode="tags"
              size="large"
              value={field.value}
              options={asanaGroupOptions}
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

      <Controller
        name="alignment"
        control={control}
        render={({field, fieldState}) => (
          <Row>
            <Textarea
              value={field.value}
              onChange={field.onChange}
              name={field.name}
              placeholder="Введите отстройку асаны"
              size="large"
              status={fieldState.error && 'error'}
              label="Отстройка асаны"
            />
          </Row>
        )}
      />

      <Controller
        name="pirs"
        control={control}
        render={({field, fieldState}) => {
          return (
            <Row>
              <Select
                mode="tags"
                style={{width: '100%'}}
                size="large"
                placeholder="Выберите ПИРы для асаны"
                status={fieldState.error && 'error'}
                value={field.value}
                options={asanaPirOptions}
                onChange={field.onChange}
              />
            </Row>
          )
        }}
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
