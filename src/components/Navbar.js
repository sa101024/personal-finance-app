import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';

// components
import Avatar from './Avatar';

// styles
import './Navbar.css'

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className='navbar'>
      <ul>
        <div className='title'>
          <li>Personal-Finance-App</li>
        </div>
        <div className='links'>
          {!user && 
            <>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/signup'>Signup</Link></li>
            </>
          }
          {user && (
            <>
              <div className='user'>
                <Avatar src={user.photoURL} />
              </div>
              <li>{user.displayName}</li>
              <li>
                {!isPending && <button className="btn" onClick={logout}>Logout</button>}
                {isPending && <button className="btn" disabled>Logging out...</button>}
              </li>
            </>
          )}
        </div>
      </ul>
    </div>
  )
}
