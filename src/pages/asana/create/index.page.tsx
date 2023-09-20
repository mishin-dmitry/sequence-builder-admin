import React from 'react'

import {CreateAsanaForm} from './creat-asana-form'

import styles from './styles.module.css'

const createAsana: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.formWrapper}>
        <CreateAsanaForm />
      </div>
      <div className={styles.previewWrapper}>Preview</div>
    </div>
  )
}

export default createAsana
