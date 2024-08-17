import useUser from '@hooks/auth/useUser'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Button from '@shared/Button'
import { signOut } from 'firebase/auth'
import { auth } from '@/remote/firebase'

export default function MyPage() {
  const user = useUser()

  const handleLogout = async () => {
    await signOut(auth)
  }

  return (
    <Flex>
      <Text>{user?.displayName}</Text>
      <Button onClick={handleLogout}>로그아웃</Button>
    </Flex>
  )
}
