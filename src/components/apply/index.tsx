import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Terms from '@components/apply/Terms'
import BasicInfo from '@components/apply/BasicInfo'
import CardInfo from '@components/apply/CardInfo'
import { ApplyValues, APPLY_STATUS } from '@models/apply'
import useUser from '@hooks/auth/useUser'
import ProgressBar from '@shared/progressBar'

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

  // 로컬스토리지의 stpe을 저장할 때 사용하는 key
  const storageKey = `applied-${user?.uid}-${id}`

  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>(() => {
    const applied = localStorage.getItem(storageKey)

    const defaultValue = {
      userId: user?.uid,
      cardId: id,
      step: 0,
    }

    if (applied === null) {
      return defaultValue
    }

    return JSON.parse(applied)
  })

  useEffect(() => {
    if (applyValues.step === 3) {
      localStorage.removeItem(storageKey)

      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.READY,
      } as ApplyValues)
    } else {
      console.log('저장', applyValues)
      localStorage.setItem(storageKey, JSON.stringify(applyValues))
    }
  }, [onSubmit, applyValues, storageKey])

  const handleTermsChange = (terms: Terms) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      terms,
      step: (prevValues.step as number) + 1,
    }))
  }
  const handleBasicInfoChage = (basicInfoValues: BasicInfoValues) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...basicInfoValues,
      step: (prevValues.step as number) + 1,
    }))
  }
  const handleCardInfoChange = (cardInfo: CardInfoValues) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...cardInfo,
      step: (prevValues.step as number) + 1,
    }))
  }

  console.log('applyValues', applyValues)

  return (
    <div>
      <ProgressBar progress={(applyValues.step as number) / 3} />
      {applyValues.step === 0 && <Terms onNext={handleTermsChange} />}
      {applyValues.step === 1 && <BasicInfo onNext={handleBasicInfoChage} />}
      {applyValues.step === 2 && <CardInfo onNext={handleCardInfoChange} />}
    </div>
  )
}
