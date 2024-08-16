import { useState } from 'react'
import { ApplyValues } from '@models/apply'
import Apply from '@components/apply'

type BasicInfoValues = Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>
type Terms = ApplyValues['terms']
type CardInfoValues = Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>

export default function ApplyPage() {
  const [step, setStep] = useState<number>(2)

  const handleSubmot = () => {
    // 카드 신청
  }

  return <Apply step={step} onSubmit={handleSubmot} />
}
