import styles from './index.module.css'
import { UserContext } from '../../../../context'
import { useState, useContext, useEffect } from 'react'
import Router from 'next/router'
import cookiesUtils from '../../../../utils/cookies'
import superAdminApi from '../../../../server-api/super-admin'

// Components
import UserItem from './user-item'
import Search from '../../../common/inputs/search'
import Button from '../../../common/buttons/button'

const SuperAdmin = () => {

  const [term, setTerm] = useState('')

  const [userData, setUserData] = useState({
    users: [],
    currentPage: 1,
    total: 0
  })

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async ({ page = 1, searchTerm = term } = {}) => {
    try {
      const { data } = await superAdminApi.getUsers({ term: searchTerm, page })
      setUserData({
        users: [...userData.users, ...data.users],
        currentPage: page,
        total: data.total
      })
    } catch (err) {
      console.log(err)
    }
  }

  const searchAndGetUsers = (searchTerm) => {
    getUsers({
      searchTerm,
      page: 1
    })
    setTerm(searchTerm)
  }

  const getUserJWT = async (user) => {
    try {
      const { data } = await superAdminApi.getUserJWT(user.id)
      // Place tokens in cookies to be able to return      
      const adminJwt = cookiesUtils.get('jwt')
      cookiesUtils.set('adminToken', adminJwt)
      cookiesUtils.setUserJWT(data.token)
      await Router.replace('/main/overview')
      Router.reload()
    } catch (err) {
      console.log(err)
    }
  }

  const getMore = () => {
    getUsers({ page: userData.currentPage + 1 })
  }

  return (
    <div className={styles.container}>
      <Search onSubmit={searchAndGetUsers} placeholder={'Search users by name or email'} />
      <ul className={styles.list}>
        {userData.users.map(user => (
          <li key={user.id}>
            <UserItem getUserToken={() => getUserJWT(user)} user={user} />
          </li>
        ))}
      </ul>
      {userData.total > userData.users.length &&
        <div className={styles.action}>
          <Button text={'Load more'} onClick={getMore} type={'button'} styleType={'primary'} />
        </div>
      }
    </div>
  )
}

export default SuperAdmin