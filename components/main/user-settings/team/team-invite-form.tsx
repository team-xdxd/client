import styles from './team-invite-form.module.css'
import { useState, useEffect } from 'react'

// Components
import Button from '../../../common/buttons/button'
import Input from '../../../common/inputs/input'
import Select from '../../../common/inputs/select'

const TeamInvite = ({ mappedRoles, onInviteSend }) => {

  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState(undefined)

  const onSubmitForm = (e) => {
    e.preventDefault()
    onInviteSend(inviteEmail, inviteRole.value)
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmitForm}>
        <Input
          type='email'
          styleType='regular'
          value={inviteEmail}
          placeholder='Email'
          onChange={(e) => setInviteEmail(e.target.value)}
        />
        <div className={styles['role-select-wrapper']}>
          <Select
            options={mappedRoles}
            onChange={(selected) => setInviteRole(selected)}
            placeholder={'Select a role'}
            styleType='regular'
            value={inviteRole}
          />
        </div>
        <Button
          text='Send invitation'
          type='submit'
          styleType='primary'
          disabled={!inviteEmail || !inviteRole}
        />
      </form>
    </div>
  )
}

export default TeamInvite
