import styles from './index.module.css'
import { useState, useEffect, useContext } from 'react'
import update from 'immutability-helper'
import toastUtils from '../../../../utils/toast'
import roleApi from '../../../../server-api/role'
import inviteApi from '../../../../server-api/invite'
import { TeamContext } from '../../../../context'

// Components
import TeamInviteForm from './team-invite-form'
import InviteList from './invite-list'
import MemberList from './member-list'

const Team = () => {

  const [roles, setRoles] = useState([])
  const [invites, setInvites] = useState([])

  const { teamMembers, getTeamMembers } = useContext(TeamContext)

  useEffect(() => {
    getRoles()
    getTeamMembers()
    getInvites()
  }, [])

  const getRoles = async () => {
    try {
      const { data } = await roleApi.getroles()
      setRoles(data)
    } catch (err) {
      console.log(err)
    }
  }

  const getInvites = async () => {
    try {
      const { data } = await inviteApi.getInvites()
      setInvites(data)
    } catch (err) {
      console.log(err)
    }
  }

  const sendInvitation = async (email, roleId) => {
    try {
      const { data } = await inviteApi.sendInvite({ email, roleId })
      setInvites(update(invites, {
        $push: [data]
      }))
      toastUtils.success(`Invitation sent to ${email}`)
    } catch (err) {
      console.log(err)
      toastUtils.error(`Coudl not send invitation to ${email}`)
    }
  }

  const mappedRoles = roles.map((role) => ({ label: role.name, value: role.id }))

  return (
    <div className={styles.container}>
      <TeamInviteForm
        onInviteSend={sendInvitation}
        mappedRoles={mappedRoles} />
      <h3>Members</h3>
      <MemberList members={teamMembers} />

      <h3>Pending Invites</h3>
      <InviteList invites={invites} />
    </div>
  )
}

export default Team
