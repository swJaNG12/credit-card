import { auth } from '@/remote/firebase'
import Form from '@components/signin/Form'
import { FormValues } from '@models/signin'
import { useAlertContext } from '@contexts/Alertcontext'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { useCallback } from 'react'
import { FirebaseError } from 'firebase/app'
import { useNavigate } from 'react-router-dom'

export default function SignInPage() {
  const { open } = useAlertContext()
  const navigate = useNavigate()

  const handleSubmit = useCallback(
    async (formValues: FormValues) => {
      const { email, password } = formValues

      try {
        const user = await signInWithEmailAndPassword(auth, email, password)

        console.log('signinPage', user)

        navigate('/')
      } catch (error) {
        // firebase 에러
        if (error instanceof FirebaseError) {
          open({
            title: '계정 정보를 다시 확인해주세요',
            onButtonClick: () => {
              //
            },
          })

          return
        }
        // 일반적인 에러
        console.log(error)
        open({
          title: '잠시 후 다시 시도해주세요',
          onButtonClick: () => {
            //
          },
        })
      }
    },
    [open],
  )

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}
