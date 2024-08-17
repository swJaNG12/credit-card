import useUser from '@hooks/auth/useUser'
import React from 'react'
import { css } from '@emotion/react'

export default function MyImage({ size = 40 }: { size?: number }) {
  const user = useUser()

  return (
    <div>
      <img
        src={
          user?.photoURL ||
          'https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-64.png'
        }
        alt="유저의 이미지"
        css={css`
          width: ${size}px;
          height: ${size}px;
        `}
      />
    </div>
  )
}
