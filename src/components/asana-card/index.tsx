import React from 'react'

import type {Asana} from 'types'

import {Typography} from 'antd'
import {imageSrc} from 'lib/image-src'

import styles from './styles.module.css'
import Link from 'next/link'
import clsx from 'clsx'
import {CreateAsanaFormFields} from 'pages/asana/create/create-asana-form'

interface AsanaCardProps {
  data: Partial<Asana> | Partial<CreateAsanaFormFields>
  isLink?: boolean
  href?: string
}

export const AsanaCard: React.FC<AsanaCardProps> = ({
  data = {},
  isLink,
  href
}) => {
  const {name, image, description} = data

  const isDataExists = !!description || !!image || !!name

  if (!isDataExists) {
    return null
  }

  if (isLink && href) {
    return (
      <Link href={href} className={clsx(styles.card, styles.link)}>
        <div className={styles.imageContainer}>
          <img src={imageSrc(image as string)} />
        </div>
        <div>
          <Typography.Title level={2}>{name}</Typography.Title>
          {description && <Typography>{description}</Typography>}
        </div>
      </Link>
    )
  }

  return (
    <div className={styles.card}>
      {image && (
        <div className={styles.imageContainer}>
          <img
            src={
              typeof image === 'string'
                ? imageSrc(image)
                : URL.createObjectURL(image as unknown as Blob)
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
