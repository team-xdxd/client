import styles from './index.module.css'
import { useState, useEffect, useContext } from 'react'
import update from 'immutability-helper'
import toastUtils from '../../../../utils/toast'
import roleApi from '../../../../server-api/role'
import inviteApi from '../../../../server-api/invite'
import teamApi from '../../../../server-api/team'
import { TeamContext } from '../../../../context'
import { capitalCase } from 'change-case'

// Components
import TeamInviteForm from './team-invite-form'
import MemberList from './member-list'
import MemberDetail from './member-detail'
import ConfirmModal from '../../../common/modals/confirm-modal'

const Team = () => {

  const [roles, setRoles] = useState([])
  const [invites, setInvites] = useState([])

  const { teamMembers, getTeamMembers, setTeamMembers } = useContext(TeamContext)

  const [selectedMember, setSelectedMember] = useState(undefined)
  const [selectedDeleteMember, setSelectedDeleteMember] = useState(undefined)

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
      if (err.response?.data?.message) toastUtils.error(err.response.data.message)
      else toastUtils.error(`Coudl not send invitation to ${email}`)
    }
  }

  const onDetailSaveChanges = async (id, { roleId, permissions, updatePermissions }) => {
    // roleId, permissions: inputPermissions, updatePermissions
    try {
      if (selectedMember.type === 'user')
        await teamApi.patchTeamMember(id, { roleId, permissions, updatePermissions })
      else
        await inviteApi.patchInvite(id, { roleId, permissions, updatePermissions })
    } catch (err) {
      console.log(err)
    }
  }

  const deleteMember = async () => {
    try {
      const { id } = selectedDeleteMember.member
      if (selectedDeleteMember.type === 'user') {
        await teamApi.disableTeamMember(id)
        setTeamMembers(update(teamMembers, {
          $splice: [[teamMembers.findIndex(member => member.id === id), 1]]
        }))
      } else {
        await inviteApi.deleteInvite(selectedDeleteMember.member.id)
        setInvites(update(invites, {
          $splice: [[invites.findIndex(invite => invite.id === id), 1]]
        }))
      }
      toastUtils.success('Member deleted successfully')
    } catch (err) {
      console.log(err)
    } finally {
      setSelectedDeleteMember(undefined)
    }
  }

  const mappedRoles = roles.map((role) => ({ ...role, label: capitalCase(role.name), value: role.id }))

  return (
    <div className={styles.container}>
      {selectedMember ?
        <MemberDetail mappedRoles={mappedRoles} member={selectedMember.member} type={selectedMember.type}
          onSaveChanges={onDetailSaveChanges} />
        :
        <>
          <TeamInviteForm
            onInviteSend={sendInvitation}
            mappedRoles={mappedRoles} />
          <div className={styles['main-headers']}>
            <h3>Members</h3>
            <h3>Role</h3>
          </div>

          <MemberList members={teamMembers} type='user' setSelectedMember={setSelectedMember} setSelectedDeleteMember={setSelectedDeleteMember} />

          <h3>Pending Invites</h3>
          <MemberList members={invites} type='invite' setSelectedMember={setSelectedMember} setSelectedDeleteMember={setSelectedDeleteMember} />
        </>
      }
      <ConfirmModal
        modalIsOpen={selectedDeleteMember !== undefined}
        closeModal={() => setSelectedDeleteMember(undefined)}
        confirmAction={deleteMember}
        confirmText={'Delete'}
        message={`Are you sure you want to delete ${selectedDeleteMember?.member.email}?`}
      />
    </div>
  )
}

export default Team
