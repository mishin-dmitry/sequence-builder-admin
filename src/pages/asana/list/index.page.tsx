import React from 'react'
import {useAsana} from '../hooks'
import {AsanaCardsList} from 'components/asanas-cards-list'

const AsanaListPage: React.FC = () => {
  const {isFetching, asanas} = useAsana()

  if (isFetching) return <div>Loading...</div>

  return (
    <div>
      <AsanaCardsList asanas={asanas} />
    </div>
  )
}

export default AsanaListPage
