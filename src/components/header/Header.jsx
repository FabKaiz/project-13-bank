import './header.scss'
import Logo from '/img/argentBankLogo.png?url'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useGetUserDetailsQuery } from '../../services/auth/authService.js'

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  // Authenticate user if token is found
  const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
    // Check token every 15min in case it has expired
    pollingInterval: 15 * 60 * 1000
  })

  console.log(data)

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
        <NavLink to={'/profile'} className='main-nav-item'>
          <FontAwesomeIcon icon={faCircleUser} />
          Tony
        </NavLink>

        <NavLink to={'/signout'} className='main-nav-item'>
          <FontAwesomeIcon icon={faRightFromBracket} />
          Sign Out
        </NavLink>

        <NavLink to={'/login'} className={({ isActive }) => isActive ? `main-nav-item active` : 'main-nav-item'}>
          <FontAwesomeIcon icon={faCircleUser} />
          Sign In
        </NavLink>
      </div>
    </nav>
  )
}

export default Header

