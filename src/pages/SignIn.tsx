import Form from '@components/signin/Form'
import { FormValues } from '@models/Signin'
import { useCallback } from 'react'

export default function SignInPage() {
  const handleSubmit = useCallback((formValues: FormValues) => {
    console.log(formValues)
  }, [])

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}
