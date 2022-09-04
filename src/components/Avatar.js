// styles & images
import './Avatar.css' 
import defaultUserAvatar from '../assets/default-user-avatar.svg'

export default function Avatar({ src }) {
  return (
    <div className='avatar'>
      {src != null ? <img src={src} alt='user avatar' /> : <img src={defaultUserAvatar} alt='default user avatar' />}
    </div>
  )
}
