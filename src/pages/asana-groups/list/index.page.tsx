import React, {useCallback, useEffect, useMemo, useState} from 'react'

import {Spinner} from 'components/spinner'
import {getAsanaGroupsList} from 'api/group-actions'
import {AsanaGroup} from 'types'
import {Table} from 'antd'
import {useRouter} from 'next/router'
import {Urls} from 'lib/urls'
import {useData} from 'context/asanas'

const AsanaListPage: React.FC = () => {
  const [groups, setGroups] = useState<AsanaGroup[]>([])

  const router = useRouter()

  const {isFetching} = useData()

  useEffect(() => {
    const loadGroups = async (): Promise<void> => {
      let response: AsanaGroup[] = []

      try {
        response = await getAsanaGroupsList()

        setGroups(response)
      } catch (error) {}
    }

    loadGroups()
  }, [])

  const dataSource = useMemo(
    () => groups.map(({id, name}, index) => ({id, name, key: index})),
    [groups]
  )

  const onRow = useCallback(
    ({id}: {id: number}) => {
      return {
        onClick: () => {
          router.push(`${Urls.ASANA_GROUP_EDIT}/${id}`)
        }
      }
    },
    [router]
  )

  if (isFetching) {
    return <Spinner />
  }

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={[
          {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            defaultSortOrder: 'descend',
            sorter: (a, b) => b.id - a.id
          },
          {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
            defaultSortOrder: 'descend',
            sorter: (a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
          }
        ]}
        onRow={onRow}
      />
    </div>
  )
}

export default AsanaListPage
