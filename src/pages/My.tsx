import useUser from '@hooks/auth/useUser'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Button from '@shared/Button'
import MyImage from '@components/my/MyImage'
import Spacing from '@shared/Spacing'
import { signOut } from 'firebase/auth'
import { auth } from '@/remote/firebase'

export default function MyPage() {
  const user = useUser()

  const handleLogout = async () => {
    await signOut(auth)
  }

  return (
    <Flex direction="column" align="center" justify="center">
      <Spacing size={40} />
      <MyImage size={80} mode="upload" />
      <Spacing size={20} />
      <Text bold={true}>{user?.displayName}</Text>
      <Spacing size={20} />
      <Button onClick={handleLogout}>로그아웃</Button>
    </Flex>
  )
}
