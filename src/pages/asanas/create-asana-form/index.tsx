import React, {useCallback, useEffect, useMemo} from 'react'

import {Button, Select, Checkbox, TreeSelect} from 'antd'
import {Input} from 'components/input'
import {Textarea} from 'components/textarea'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {Row} from 'components/row'
import {useData} from 'context/asanas'
import {GroupForGenerating} from 'types/asana'
import {groupsForGenerator} from './group-for-generator'
import {iconsMap} from 'icons'

import styles from './styles.module.css'

export interface CreateAsanaFormFields {
  name: string
  description: string
  alignment: string
  alias: string
  searchKeys: string
  canBeGenerated: boolean
  canBeStartOfSequence: boolean
  isAsymmetrical: boolean
  groupForGenerating?: GroupForGenerating
  groups: number[]
  pirs: number[]
  continuingAsanas: number[]
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

  const {asanaGroupCategories, asanas} = useData()

  const asanaOptions = useMemo(
    () =>
      asanas.map(({id, name, alias}) => ({
        value: id,
        label: (
          <div className={styles.row}>
            <img
              width={40}
              height={40}
              loading="lazy"
              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                iconsMap[alias]
              )}`}
              alt="Изображение асаны"
            />{' '}
            {name}
          </div>
        )
      })),
    [asanas]
  )

  const onDeleteButtonClick = useCallback(() => onDelete?.(), [onDelete])

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const treeData = useMemo(
    () =>
      asanaGroupCategories.map(({name, groups}) => ({
        value: name,
        title: name,
        treeCheckable: false,
        children: groups.map(({id, name}) => ({
          value: id,
          label: name
        }))
      })),
    [asanaGroupCategories]
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
            <TreeSelect
              multiple
              treeDefaultExpandAll
              onChange={field.onChange}
              placeholder="Выберите группы асаны"
              style={{width: '100%'}}
              value={field.value}
              size="large"
              allowClear
              treeData={treeData}
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
        render={({field}) => (
          <Row>
            <Textarea
              value={field.value}
              onChange={field.onChange}
              name={field.name}
              placeholder="Введите описание асаны"
              size="large"
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
        name="canBeGenerated"
        control={control}
        render={({field}) => (
          <Row>
            <Checkbox
              checked={field.value}
              onChange={field.onChange}
              name={field.name}>
              Включить асану в генератор последовательностей
            </Checkbox>
          </Row>
        )}
      />

      <Controller
        name="canBeStartOfSequence"
        control={control}
        render={({field}) => (
          <Row>
            <Checkbox
              checked={field.value}
              onChange={field.onChange}
              name={field.name}>
              Может быть началом последовательности
            </Checkbox>
          </Row>
        )}
      />

      <Controller
        name="isAsymmetrical"
        control={control}
        render={({field}) => (
          <Row>
            <Checkbox
              checked={field.value}
              onChange={field.onChange}
              name={field.name}>
              Ассимитричная
            </Checkbox>
          </Row>
        )}
      />

      <Controller
        name="groupForGenerating"
        control={control}
        render={({field}) => (
          <Row>
            <Select
              style={{width: '100%'}}
              size="large"
              placeholder="Группировка асан для генератора"
              value={field.value}
              options={groupsForGenerator}
              onChange={field.onChange}
            />
          </Row>
        )}
      />

      <Controller
        name="pirs"
        control={control}
        render={({field, fieldState}) => (
          <Row>
            <Select
              mode="multiple"
              optionFilterProp="label"
              style={{width: '100%'}}
              size="large"
              placeholder="Выберите ПИРы для асаны"
              status={fieldState.error && 'error'}
              value={field.value}
              options={asanaOptions}
              onChange={field.onChange}
            />
          </Row>
        )}
      />

      <Controller
        name="continuingAsanas"
        control={control}
        render={({field, fieldState}) => (
          <Row>
            <Select
              mode="multiple"
              optionFilterProp="label"
              style={{width: '100%'}}
              size="large"
              placeholder="Выберите асаны для продолжения последовательности"
              status={fieldState.error && 'error'}
              value={field.value}
              options={asanaOptions}
              onChange={field.onChange}
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
