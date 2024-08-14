import { useState } from 'react'
import Terms from '@components/apply/Terms'
import BasicInfo from '@components/apply/BasicInfo'
import CardInfo from '@components/apply/CardInfo'

export default function ApplyPage() {
  const [step, setStep] = useState<Number>(0)

  const handleTermsChange = (terms: string[]) => {
    console.log('terms', terms)
  }

  return (
    <div>
      {step === 0 && <Terms onNext={handleTermsChange} />}
      {step === 1 && <BasicInfo />}
      {step === 2 && <CardInfo />}
    </div>
  )
}
