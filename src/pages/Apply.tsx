import { useState } from 'react'
import { ApplyValues } from '@models/apply'
import Apply from '@components/apply'

type BasicInfoValues = Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>
type Terms = ApplyValues['terms']
type CardInfoValues = Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>

export default function ApplyPage() {
  const handleSubmot = () => {
    // 카드 신청
  }

  return <Apply onSubmit={handleSubmot} />
}
