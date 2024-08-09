import { collection, getDocs } from 'firebase/firestore'
import { db } from '@remote/firebase'
import { COLLECTIONS } from '@/constants'
import { AdBanner } from '@/models/card'

export async function getAdBanners() {
  const querySnapShot = await getDocs(collection(db, COLLECTIONS.ADBANNER))
  return querySnapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as AdBanner),
  }))
}
