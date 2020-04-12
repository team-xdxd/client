import { useState } from 'react'
import styles from './index.module.css'
import Link from 'next/link'
import { GeneralImg } from '../../../assets'

// Components
import CreateCampaign from './create-campaign'
import CreateProject from './create-project'
import CreateTask from './create-task'
import CreateItem from './create-item'

const CreateOverlay = ({ type = '', setType, closeOverlay }) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.back} onClick={() => setType('')}>
          {
            type &&
            <>
              <img src={GeneralImg.logo} />
              <span>Back</span>
            </>
          }
        </div>
        <div className={styles.close} onClick={closeOverlay}>
          <img src={GeneralImg.logo} />
          <span>esc</span>
        </div>
      </div>
      {
        !type &&
        <div >
          <h2>
            Choose Type
        </h2>
          <ul className={styles.types}>
            <CreateItem
              type='campaign'
              description='Lorep ipsum dolor sit amet, consectetur edil, sed do eiusmod tempor.'
              icon={GeneralImg.logo}
              onClick={() => setType('campaign')}
            />
            <CreateItem
              type='project'
              description='Lorep ipsum dolor sit amet, consectetur edil, sed do eiusmod tempor.'
              icon={GeneralImg.logo}
              onClick={() => setType('project')}
            />
            <CreateItem
              type='task'
              description='Lorep ipsum dolor sit amet, consectetur edil, sed do eiusmod tempor.'
              icon={GeneralImg.logo}
              onClick={() => setType('task')}
            />
          </ul>
        </div>
      }
      {
        type === 'campaign' &&
        <CreateCampaign />
      }
      {
        type === 'project' &&
        <CreateProject />
      }
      {
        type === 'task' &&
        <CreateTask />
      }
    </div >
  )
}

export default CreateOverlay
