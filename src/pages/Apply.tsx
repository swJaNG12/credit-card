import { useState } from 'react'
import { ApplyValues } from '@models/apply'
import Apply from '@components/apply'

type BasicInfoValues = Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>
type Terms = ApplyValues['terms']
type CardInfoValues = Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>

export default function ApplyPage() {
  const handleSubmit = (applyValues: ApplyValues) => {
    // 카드 신청
    console.log('Apply Page')
    console.log(applyValues)
  }

  return <Apply onSubmit={handleSubmit} />
}
