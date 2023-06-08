import ProfilePage from '../pages/ProfilePage'
import LogIn from '../components/LogIn'

import { useSelector } from 'react-redux'
import { LogInPageTypes } from '../types/LogInPage'



const LogInPage = () =>
{
  const state = useSelector((state: LogInPageTypes) => state.user);

  return (
    <div>
      {state.profile.login ? <ProfilePage /> : <LogIn />}
    </div>
  )
}

export default LogInPage