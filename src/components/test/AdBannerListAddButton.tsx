import { collection, doc, writeBatch } from 'firebase/firestore'
import { db } from '@/remote/firebase'

import Button from '@shared/Button'
import { adBanners } from '@/data/cardData'
import { COLLECTIONS } from '@/constants'

export default function AdBannerListAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(db)

    adBanners.forEach((adBanner) => {
      const docRef = doc(collection(db, COLLECTIONS.ADBANNER))
      batch.set(docRef, adBanner)
    })

    await batch.commit()

    alert('광고배너 리스트 추가완료')
  }

  return <Button onClick={handleButtonClick}>광고배너 리스트 추가하기</Button>
}
