import React from 'react'

import {Layout as AntdLayout, Menu} from 'antd'

import styles from './styles.module.css'
import {MENU_LINKS} from './menu-links'

export interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({children}) => (
  <AntdLayout>
    <AntdLayout.Header>
      <Menu items={MENU_LINKS} mode="horizontal" theme="dark" />
    </AntdLayout.Header>
    <main className={styles.main}>
      <div className={styles.mainInner}>{children}</div>
    </main>
    <AntdLayout.Footer />
  </AntdLayout>
)
