import React from 'react'

import {AsanaCardsList} from 'components/asanas-cards-list'
import {useData} from 'context/asanas'
import {Spinner} from 'components/spinner'
import {Typography} from 'antd'

const AsanaListPage: React.FC = () => {
  const {isFetching, asanas} = useData()

  if (isFetching) {
    return <Spinner />
  }

  return (
    <div>
      {!asanas.length ? (
        <Typography.Title level={1}>Список пуст</Typography.Title>
      ) : (
        <AsanaCardsList asanas={asanas} />
      )}
    </div>
  )
}

export default AsanaListPage
