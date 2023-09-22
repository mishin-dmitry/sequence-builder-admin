import React, {useMemo} from 'react'

import type {Asana} from 'types'
import {AsanaCard} from 'components/asana-card'
import {Urls} from 'lib/urls'

import styles from './styles.module.css'

export interface AsanaCardsListProps {
  asanas: Asana[]
}

export const AsanaCardsList: React.FC<AsanaCardsListProps> = ({
  asanas = []
}) => {
  const list = useMemo(
    () => (
      <ul className={styles.list}>
        {asanas.map((data: Asana) => (
          <AsanaCard
            data={data}
            key={data.pk}
            isLink
            href={`${Urls.EDIT}/${data.pk}`}
          />
        ))}
      </ul>
    ),
    [asanas]
  )
  return list
}