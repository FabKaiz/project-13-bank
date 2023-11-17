import './header.scss'
import Logo from '/img/argentBankLogo.png?url'
import { NavLink, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useGetUserDetailsQuery } from '../../services/auth/authService.js'
import { useEffect } from 'react'
import { logout, setCredentials } from '../../reducer/authReducer.js'

const Header = () => {
  const { userInfo, userToken } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  // Authenticate user if token is found
  const { data } = useGetUserDetailsQuery('userDetails', {
    // Check token every 15min in case it has expired
    pollingInterval: 15 * 60 * 1000
  })

  useEffect(() => {
    console.log('data', data)
    console.log('userInfo', userInfo)
    console.log('userToken', userToken)
    if (data) dispatch(setCredentials(data))
  }, [data, userToken])

  return (
    <nav className='main-nav'>
      <NavLink className='main-nav-logo' to={'/'}>
        <img
          className='main-nav-logo-image'
          src={Logo}
          alt='Argent Bank Logo'
        />
        <h1 className='sr-only'>Argent Bank</h1>
      </NavLink>
      <div>
        {userInfo ? (
          <>
            <NavLink to={'/profile'} className='main-nav-item'>
              <FontAwesomeIcon icon={faCircleUser} />
              {/* get user first name and last name when login*/}

              {userInfo.body.firstName} {userInfo.body.lastName}
            </NavLink>

            <button onClick={() => dispatch(logout())} className='main-nav-item'>
              <FontAwesomeIcon icon={faRightFromBracket} />
              Sign Out
            </button>
          </>
        ) : (
          <NavLink to={'/login'} className={({ isActive }) => isActive ? `main-nav-item active` : 'main-nav-item'}>
            <FontAwesomeIcon icon={faCircleUser} />
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  )
}

export default Header

