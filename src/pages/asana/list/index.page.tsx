import React from 'react'

import {AsanaCardsList} from 'components/asanas-cards-list'
import {useAsana} from 'context/asanas'

const AsanaListPage: React.FC = () => {
  const {isFetching, asanas} = useAsana()

  if (isFetching) {
    return null
  }

  return (
    <div>
      <AsanaCardsList asanas={asanas} />
    </div>
  )
}

export default AsanaListPage
