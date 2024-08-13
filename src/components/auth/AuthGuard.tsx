import { auth } from '@remote/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useState } from 'react'

// 인증 처리, 인증에 대한 검사
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false)

  onAuthStateChanged(auth, (user) => {
    setInitialize(true)
  })

  if (initialize === false) {
    return null
  }

  return <>{children}</>
}
