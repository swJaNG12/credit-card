import { addDoc, collection } from 'firebase/firestore'
import { db } from './firebase'

import { COLLECTIONS } from '@constants'
import { ApplyValues } from '@models/apply'

export async function applyCard(applyValues: ApplyValues) {
  return await addDoc(collection(db, COLLECTIONS.CARD_APPLY), applyValues)
}
