import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
} from 'firebase/firestore'
import { db } from '@remote/firebase'
import { COLLECTIONS } from '@/constants'
import { Card } from '@/models/card'

// pageParam 지금 보이고 있는 맨 마지막 요소
export async function getCards(pageParam: any) {
  const cardQuery = !pageParam
    ? query(collection(db, COLLECTIONS.CARD), limit(15))
    : query(collection(db, COLLECTIONS.CARD), startAfter(pageParam), limit(10))

  const querySnapShot = await getDocs(cardQuery)

  // 불러온 스냅샷의 맨 마지막 문서를 커서로 판단
  const lastVisible = querySnapShot.docs[querySnapShot.docs.length - 1]

  // 불러온 스냅샷 데이터
  const items = querySnapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))

  return { items, lastVisible }
}
