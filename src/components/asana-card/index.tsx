import React from 'react'

import type {Asana} from 'types'

import {Typography} from 'antd'
import {imageSrc} from 'lib/image-src'

import styles from './styles.module.css'

interface AsanaCardProps {
  data: Asana
  isPreview?: boolean
}

export const AsanaCard: React.FC<AsanaCardProps> = ({data, isPreview}) => {
  const {name, image, description} = data

  const isDataExists = !!description || !!image || !!name

  if (!isDataExists) {
    return null
  }

  return (
    <div className={styles.card}>
      {image && (
        <div className={styles.imageContainer}>
          <img
            src={
              isPreview
                ? URL.createObjectURL(image as unknown as Blob)
                : imageSrc(image)
            }
          />
        </div>
      )}
      <div>
        {name && <Typography.Title level={2}>{name}</Typography.Title>}
        {description && <Typography>{description}</Typography>}
      </div>
    </div>
  )
}
