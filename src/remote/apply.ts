import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from './firebase'

import { COLLECTIONS } from '@constants'
import { ApplyValues } from '@models/apply'

export async function applyCard(applyValues: ApplyValues) {
  return await addDoc(collection(db, COLLECTIONS.CARD_APPLY), applyValues)
}

// 카드를 찾고 그 카드의 정보를 업데이트
export async function updateApplyCard({
  cardId,
  userId,
  applyValues,
}: {
  cardId: string
  userId: string
  applyValues: Partial<ApplyValues>
}) {
  const snapshot = await getDocs(
    query(
      collection(db, COLLECTIONS.CARD_APPLY),
      where('userId', '==', userId),
      where('cardId', '==', cardId),
    ),
  )

  const [applied] = snapshot.docs

  updateDoc(applied.ref, applyValues)
}

// 유저가 신청한 카드를 조희하는 함수
export async function getAppliedCard({
  userId,
  cardId,
}: {
  userId: string
  cardId: string
}) {
  const snapshot = await getDocs(
    query(
      collection(db, COLLECTIONS.CARD_APPLY),
      where('userId', '==', userId),
      where('cardId', '==', cardId),
    ),
  )

  if (snapshot.docs.length === 0) {
    return null
  }

  const [applied] = snapshot.docs

  return applied.data() as ApplyValues
}
