import React from 'react'

import {Upload, message, Button} from 'antd'
import {Input} from 'components/input'
import {Textarea} from 'components/textarea'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {InboxOutlined} from '@ant-design/icons'

import type {UploadFile} from 'antd'
import {Row} from 'components/row'

interface CreateAsanaFormFields {
  name: string
  description: string
  image: UploadFile
}

interface CreateAsanaFormProps {
  onSubmit?: (data: CreateAsanaFormFields) => Promise<void>
}

export const CreateAsanaForm: React.FC<CreateAsanaFormProps> = (
  {
    // onSubmit: onSubmitProp
  }
) => {
  const {handleSubmit, control} = useForm<CreateAsanaFormFields>({})

  const onSubmit: SubmitHandler<CreateAsanaFormFields> = (data) => {
    console.log(data)
  }

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
                const {status} = file

                if (status === 'done') {
                  message.success(`${file.name} file uploaded successfully.`)
                  field.onChange(file)
                } else if (status === 'error') {
                  message.error(`${file.name} file upload failed.`)
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
