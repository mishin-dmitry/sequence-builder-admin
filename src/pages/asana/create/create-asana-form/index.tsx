import React, {useEffect} from 'react'

import {Upload, message, Button} from 'antd'
import {Input} from 'components/input'
import {Textarea} from 'components/textarea'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {InboxOutlined} from '@ant-design/icons'

import {Row} from 'components/row'

export interface CreateAsanaFormFields {
  name: string
  description: string
  image: File
}

interface CreateAsanaFormProps {
  onSubmit: (data: CreateAsanaFormFields) => Promise<void>
  onFormChange: (data: CreateAsanaFormFields) => void
  defaultValues?: Partial<CreateAsanaFormFields>
}

export const CreateAsanaForm: React.FC<CreateAsanaFormProps> = ({
  onSubmit: onSubmitProp,
  onFormChange,
  defaultValues = {}
}) => {
  const {handleSubmit, control, reset, watch} = useForm<CreateAsanaFormFields>({
    defaultValues
  })

  const onSubmit: SubmitHandler<CreateAsanaFormFields> = (data) => {
    onSubmitProp(data)

    reset()
  }

  useEffect(() => {
    const subscription = watch((value) =>
      onFormChange(value as CreateAsanaFormFields)
    )

    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        defaultValue="foo"
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
        name="description"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Введите описание асаны'
          }
        }}
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
        name="image"
        control={control}
        rules={{required: true}}
        render={({field}) => (
          <Row>
            <Upload.Dragger
              name="file"
              multiple={false}
              maxCount={1}
              onRemove={() => field.onChange(undefined)}
              onChange={({file}) => {
                const {status, originFileObj, name} = file

                if (status === 'done') {
                  message.success(`${name} file uploaded successfully.`)
                  field.onChange(originFileObj)
                } else if (status === 'error') {
                  message.error(`${name} file upload failed.`)
                }
              }}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Кликните или перенесите изображение в область для загрузки
              </p>
              <p className="ant-upload-hint">
                Загрузите изображение асаны, которое будет отображаться в
                карточке
              </p>
            </Upload.Dragger>
          </Row>
        )}
      />

      <Button type="primary" htmlType="submit" size="large">
        Сохранить
      </Button>
    </form>
  )
}