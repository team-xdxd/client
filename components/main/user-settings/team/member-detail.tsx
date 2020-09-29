import styles from './member-detail.module.css'
import { useState, useEffect } from 'react'

import permissionApi from '../../../../server-api/permission'
import teamApi from '../../../../server-api/team'

// Components
import Button from '../../../common/buttons/button'
import Select from '../../../common/inputs/select'
import MemberPermissions from './member-permissions'

const MemberDetail = ({ member, type = 'member', mappedRoles, onSaveChanges }) => {

  const [memberRole, setMemberRole] = useState(undefined)
  const [memberPermissions, setMemberPermissions] = useState([])
  const [permissions, setPermissions] = useState([])

  useEffect(() => {
    getPermissions()
  }, [])

  useEffect(() => {
    if (member) {
      setMemberRole(getMemberRole(member.role))
      setMemberPermissions(member.permissions)
    }
  }, [member])

  const getMemberRole = (role) => {
    return mappedRoles.find(mappedRole => mappedRole.id === role.id)
  }

  const getPermissions = async () => {
    try {
      const { data } = await permissionApi.getPermissions()
      setPermissions(data)
    } catch (err) {
      console.log(err)
    }
  }

  const onSaveMemberChanges = () => {
    const saveData = {
      permissions: memberPermissions,
      updatePermissions: true
    }
    if (member.role.id !== memberRole.id) {
      saveData.roleId = memberRole.id
    }
    onSaveChanges(member.id, {
      permissions: memberPermissions,
      updatePermissions: true
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.headers}>
        {type === 'member' && <h3>Name</h3>}
        <h3>Email Address</h3>
        <h3>Role</h3>
      </div>
      <div className={styles.fields}>
        {type === 'member' && <div>{member.name}</div>}
        <div>{member.email}</div>
        <div>
          <Select
            options={mappedRoles}
            onChange={(selected) => setMemberRole(selected)}
            placeholder={'Select a role'}
            styleType='regular'
            value={memberRole}
          />
        </div>
      </div>
      <MemberPermissions memberPermissions={memberPermissions}
        permissions={permissions} setMemberPermissions={setMemberPermissions} />
      <div className={styles['button-wrapper']}>
        <Button
          text='Save Changes'
          type='button'
          onClick={onSaveMemberChanges}
          styleType={'primary'}
        />
      </div>
    </div>
  )
}

export default MemberDetail