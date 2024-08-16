import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Terms from '@components/apply/Terms'
import BasicInfo from '@components/apply/BasicInfo'
import CardInfo from '@components/apply/CardInfo'
import { ApplyValues, APPLY_STATUS } from '@models/apply'
import useUser from '@hooks/auth/useUser'

type BasicInfoValues = Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>
type Terms = ApplyValues['terms']
type CardInfoValues = Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>

export default function Apply({
  onSubmit,
}: {
  onSubmit: (applyValues: ApplyValues) => void
}) {
  const user = useUser()
  const { id } = useParams()

  const [step, setStep] = useState<number>(0)

  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>({
    userId: user?.uid,
    cardId: id,
  })

  useEffect(() => {
    if (step === 3) {
      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.READY,
      } as ApplyValues)
    }
  }, [step, onSubmit, applyValues])

  const handleTermsChange = (terms: Terms) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      terms,
    }))

    setStep((prevStep) => prevStep + 1)
  }
  const handleBasicInfoChage = (basicInfoValues: BasicInfoValues) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...basicInfoValues,
    }))

    setStep((prevStep) => prevStep + 1)
  }
  const handleCardInfoChange = (cardInfo: CardInfoValues) => {
    setApplyValues((prevalues) => ({
      ...prevalues,
      ...cardInfo,
    }))

    setStep((prevStep) => prevStep + 1)
  }

  console.log(applyValues)

  return (
    <div>
      {step === 0 && <Terms onNext={handleTermsChange} />}
      {step === 1 && <BasicInfo onNext={handleBasicInfoChage} />}
      {step === 2 && <CardInfo onNext={handleCardInfoChange} />}
    </div>
  )
}
