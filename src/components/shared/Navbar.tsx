import { Link } from 'react-router-dom'
import Button from './Button'
import Flex from './Flex'

export default function Navbar() {
  return (
    <Flex>
      <Link to={'/'}>home</Link>
      <Link to={'/signup'}>
        <Button>로그인/회원가입</Button>
      </Link>
    </Flex>
  )
}
