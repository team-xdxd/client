import styles from './subscription.module.css'
import { useState, useContext, useEffect } from 'react'
import { TeamContext } from '../../../../context'

// Components
import NameForm from './name-form'
import AddressForm from './address-form'

const Company = () => {

  const { getTeam } = useContext(TeamContext)

  useEffect(() => {
    getTeam()
  }, [])

  return (
    <div>
      <NameForm />
      <AddressForm />
    </div>
  )
}

export default Company