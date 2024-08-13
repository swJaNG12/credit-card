import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '@remote/firebase'
import { FormValues } from '@models/signup'
import Form from '@components/signup/Form'
import { collection, doc, setDoc } from 'firebase/firestore'
import { COLLECTIONS } from '@/constants'

export default function SignUpPage() {
  const handleSubmit = async (formValues: FormValues) => {
    const { email, password, name } = formValues
    const { user } = await createUserWithEmailAndPassword(auth, email, password)

    await updateProfile(user, {
      displayName: name,
    })

    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: name,
    }

    await setDoc(doc(collection(db, COLLECTIONS.USER), user.uid), newUser)
  }

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}
