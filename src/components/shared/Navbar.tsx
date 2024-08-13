import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import { Link, useLocation } from 'react-router-dom'
import Button from './Button'
import Flex from './Flex'

export default function Navbar() {
  const location = useLocation()

  const showSignButton = !['/signin', '/signup'].includes(location.pathname)

  return (
    <Flex align="center" justify="space-between" css={NavbarContainerStyles}>
      <Link to={'/'}>home</Link>
      {showSignButton && (
        <Link to={'/signin'}>
          <Button>로그인/회원가입</Button>
        </Link>
      )}
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
