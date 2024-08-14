import useUser from '@hooks/auth/useUser'
import React from 'react'
import { Navigate } from 'react-router-dom'

// 유저의 정보를 받아서 어떤 페이지로 보낼지 결정
export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const user = useUser()

  // 로그인이 되어있지 않다면 로그인 페이지로
  if (user === null) {
    return <Navigate to="/signin" replace={true} />
  }

  return <>{children}</>
}
