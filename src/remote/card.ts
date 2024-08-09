import { collection, getDocs } from 'firebase/firestore'
import { db } from '@remote/firebase'
import { COLLECTIONS } from '@/constants'
import { Card } from '@/models/card'

export async function getCards() {
  const querySnapShot = await getDocs(collection(db, COLLECTIONS.CARD))
  return querySnapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))
}
