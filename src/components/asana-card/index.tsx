import React from 'react'

import type {Asana} from 'types'

import {Typography} from 'antd'

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
  const {name, description} = data

  const isDataExists = !!description || !!name

  if (!isDataExists) {
    return null
  }

  if (isLink && href) {
    return (
      <Link href={href} className={clsx(styles.card, styles.link)}>
        <div>
          <Typography.Title level={2}>{name}</Typography.Title>
          {description && <Typography>{description}</Typography>}
        </div>
      </Link>
    )
  }

  return (
    <div className={styles.card}>
      <div>
        {name && <Typography.Title level={2}>{name}</Typography.Title>}
        {description && <Typography>{description}</Typography>}
      </div>
    </div>
  )
}
