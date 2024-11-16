import React, {useState} from 'react'

import {Upload, Image, type UploadFile, type UploadProps} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {getBase64, type FileType} from 'lib/get-base-64'

import styles from './styles.module.css'
import {Label} from 'components/label'

interface UploadInputProps {
  value: UploadProps['fileList']
  onChange: (fileList: UploadFile[]) => void
  name: string
  label?: string
}

export const UploadInput: React.FC<UploadInputProps> = ({
  value,
  name,
  label,
  onChange
}) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')

  const handlePreview = async (file: UploadFile): Promise<void> => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  return (
    <>
      {!!label && <Label htmlFor={name}>{label}</Label>}
      <Upload
        listType="picture-card"
        fileList={value}
        onPreview={handlePreview}
        onChange={({fileList}) => onChange?.(fileList)}
        name={name}>
        <button className={styles.button} type="button">
          <PlusOutlined />
          <div className={styles.upload}>Загрузить</div>
        </button>
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{display: 'none'}}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage('')
          }}
          src={previewImage}
          alt="Загруженное изображение"
        />
      )}
    </>
  )
}
