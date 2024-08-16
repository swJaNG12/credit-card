import { useState } from 'react'
import Terms from '@components/apply/Terms'
import BasicInfo from '@components/apply/BasicInfo'
import CardInfo from '@components/apply/CardInfo'
import { ApplyValues } from '@models/apply'

type BasicInfoValues = Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>
type Terms = ApplyValues['terms']
type CardInfoValues = Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>

export default function Apply({
  step,
  onSubmit,
}: {
  step: number
  onSubmit: () => void
}) {
  const handleTermsChange = (terms: Terms) => {
    console.log('terms', terms)
  }
  const handleBasicInfoChage = (basicInfoValues: BasicInfoValues) => {
    console.log('info', basicInfoValues)
  }
  const handleCardInfoChange = (cardInfo: CardInfoValues) => {
    console.log('cardInfo', cardInfo)
  }

  return (
    <div>
      {step === 0 && <Terms onNext={handleTermsChange} />}
      {step === 1 && <BasicInfo onNext={handleBasicInfoChage} />}
      {step === 2 && <CardInfo onNext={handleCardInfoChange} />}
    </div>
  )
}
