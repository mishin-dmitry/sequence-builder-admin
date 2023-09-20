import React from 'react'

import {Layout as AntdLayout} from 'antd'

import styles from './styles.module.css'

export interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({children}) => (
  <AntdLayout>
    <AntdLayout.Header />
    <main className={styles.main}>
      <div className={styles.mainInner}>{children}</div>
    </main>
    <AntdLayout.Footer />
  </AntdLayout>
)
