import { useState } from 'react'
import Terms from '@components/apply/Terms'
import BasicInfo from '@components/apply/BasicInfo'
import CardInfo from '@components/apply/CardInfo'
import { ApplyValues } from '@models/apply'

type BasicInfoValues = Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>

export default function ApplyPage() {
  const [step, setStep] = useState<Number>(1)

  const handleTermsChange = (terms: string[]) => {
    console.log('terms', terms)
  }
  const handleBasicInfoChage = (basicInfoValues: BasicInfoValues) => {
    console.log('info', basicInfoValues)
  }

  return (
    <div>
      {step === 0 && <Terms onNext={handleTermsChange} />}
      {step === 1 && <BasicInfo onNext={handleBasicInfoChage} />}
      {step === 2 && <CardInfo />}
    </div>
  )
}
