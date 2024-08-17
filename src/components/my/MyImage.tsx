import useUser from '@hooks/auth/useUser'
import React, { ChangeEvent } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { auth, db, storage } from '@remote/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { COLLECTIONS } from '@constants'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '@atoms/user'

export default function MyImage({
  size = 40,
  mode = 'default',
}: {
  size?: number
  mode?: 'default' | 'upload'
}) {
  const user = useUser()
  const setUser = useSetRecoilState(userAtom)

  const currentUser = auth.currentUser

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files === null || user === null || currentUser === null) {
      return
    }

    if (files.length <= 0) {
      return
    }

    const { type, name } = files[0]

    if (type.includes('image') === false) {
      alert(
        '해당 파일은 이미지 파일이 아닙니다. \n이미지 파일(jpg, jpeg, gif, png 등)을 업로드 해주세요.',
      )
      return
    }

    const filePath = `users/${user.uid}/${name}`

    console.log(files)

    const storageRef = ref(storage, filePath)

    const uploaded = await uploadBytes(storageRef, files[0])

    const downloadUrl = await getDownloadURL(uploaded.ref)

    await updateProfile(currentUser, {
      photoURL: downloadUrl,
    })

    await updateDoc(doc(db, COLLECTIONS.USER, currentUser.uid), {
      photoURL: downloadUrl,
    })

    setUser({
      ...user,
      photoURL: downloadUrl,
    })

    console.log('end')
  }

  return (
    <Container>
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
      {mode === 'upload' && (
        <input
          type="file"
          accept="imgae/*"
          onChange={handleUploadImage}
          title="프로필 이미지 업로드"
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  cursor: pointer;

  & img {
    border-radius: 100%;
  }

  & input[type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`
