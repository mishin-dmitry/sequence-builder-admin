import {Urls} from 'lib/urls'
import Link from 'next/link'

export const MENU_LINKS = [
  {label: <Link href={Urls.ASANA_LIST}>Список асан</Link>, key: 'list'},
  {label: <Link href={Urls.CREATE}>Создать асану</Link>, key: 'create'},
  {
    label: <Link href={Urls.ASANA_GROUP_CREATE}>Создать группу ассан</Link>,
    key: 'group'
  },
  {
    label: <Link href={Urls.ASANA_GROUP_LIST}>Список групп</Link>,
    key: 'groupList'
  }
]
