import { colors } from '@styles/colorPalette'
import { css } from '@emotion/react'
import useUser from '@hooks/auth/useUser'
import { auth } from '@remote/firebase'
import Button from './Button'
import Flex from './Flex'

import { Link, useLocation } from 'react-router-dom'
import { useCallback } from 'react'
import { signOut } from 'firebase/auth'
import MyImage from '@components/my/MyImage'

export default function Navbar() {
  const location = useLocation()
  const user = useUser()

  // console.log(user)

  const showSignButton = !['/signin', '/signup'].includes(location.pathname)

  const handleLogout = async () => {
    await signOut(auth)
  }

  const renderButton = useCallback(() => {
    if (showSignButton) {
      if (user === null) {
        return (
          <Link to={'/signin'}>
            <Button>로그인/회원가입</Button>
          </Link>
        )
      } else {
        return <MyImage />
      }
    }

    return null
  }, [user, showSignButton])

  return (
    <Flex align="center" justify="space-between" css={NavbarContainerStyles}>
      <Link to={'/'}>home</Link>
      {renderButton()}
    </Flex>
  )
}

const NavbarContainerStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0%;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px ${colors.gray} solid;
  min-height: 55px;
`
