import React from 'react'

import {AsanaCardsList} from 'components/asanas-cards-list'
import {useAsana} from 'context/asanas'
import {Spinner} from 'components/spinner'

const AsanaListPage: React.FC = () => {
  const {isFetching, asanas} = useAsana()

  if (isFetching) {
    return <Spinner />
  }

  return (
    <div>
      <AsanaCardsList asanas={asanas} />
    </div>
  )
}

export default AsanaListPage
