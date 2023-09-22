import React from 'react'

import styles from './styles.module.css'

interface FormWrapperProps {
  children: React.ReactNode
  preview: React.ReactNode
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
  children,
  preview
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.formWrapper}>{children}</div>
      <div className={styles.previewWrapper}>{preview}</div>
    </div>
  )
}
