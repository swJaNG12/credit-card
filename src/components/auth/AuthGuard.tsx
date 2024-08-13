import { auth } from '@remote/firebase'
import { userAtom } from '@atoms/user'
import { User } from '@models/user'

import { onAuthStateChanged } from 'firebase/auth'
import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil'

// 인증 처리, 인증에 대한 검사
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false)
  const setUserState = useSetRecoilState(userAtom)

  onAuthStateChanged(auth, (user) => {
    console.log('auth gauard', user)
    if (user !== null) {
      setUserState({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      } as User)
    } else {
      setUserState(null)
    }
    setInitialize(true)
  })
  if (initialize === false) {
    return null
  }

  return <>{children}</>
}
