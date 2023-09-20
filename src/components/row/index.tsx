import React from 'react'

import styles from './styles.module.css'

interface RowProps {
  children: React.ReactNode
}

export const Row: React.FC<RowProps> = ({children}) => (
  <div className={styles.row}>{children}</div>
)
