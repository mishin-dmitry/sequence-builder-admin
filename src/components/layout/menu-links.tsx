import {Urls} from 'lib/urls'
import Link from 'next/link'

export const MENU_LINKS = [
  {label: <Link href={Urls.ASANA_LIST}>Список асан</Link>, key: 'list'},
  {
    label: <Link href={Urls.ASANA_GROUP_LIST}>Список групп</Link>,
    key: 'groupList'
  },
  {
    label: (
      <Link href={Urls.ASANA_GROUP_CATEGORY_LIST}>
        Список категорий для групп
      </Link>
    ),
    key: 'groupCategoryList'
  }
]
