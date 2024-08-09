import { collection, doc, writeBatch } from 'firebase/firestore'
import { db } from '@/remote/firebase'

import Button from '@shared/Button'
import { card_list } from '@/data/cardData'
import { COLLECTIONS } from '@/constants'

export default function CardListAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(db)

    card_list.forEach((card) => {
      const docRef = doc(collection(db, COLLECTIONS.CARD))
      batch.set(docRef, card)
    })

    await batch.commit()

    alert('카드 리스트 추가완료')
  }

  return <Button onClick={handleButtonClick}>카드 리스트 추가하기</Button>
}
