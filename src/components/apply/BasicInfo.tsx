import { ChangeEvent, useState } from 'react'

import Select from '@shared/Select'
import FixedBottomButton from '@shared/FixedBottomButton'
import {
  anuallIncomeOptions,
  creditScore,
  paymentDateOptions,
} from '@constants/apply'
import { ApplyValues } from '@models/apply'

type BasicInfoValues = Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>

export default function BasicInfo({
  onNext,
}: {
  onNext: (basicInfoValues: BasicInfoValues) => void
}) {
  const [basicInfoValues, setBasicInfoValues] = useState<BasicInfoValues>({
    salary: '',
    creditScore: '',
    payDate: '',
  })

  const handleInfoChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setBasicInfoValues((prevInfo) => ({
      ...prevInfo,
      [e.target.name]: e.target.value,
    }))
  }

  const isAllInfoSelected = Object.values(basicInfoValues).every(
    (info) => info !== '',
  )

  // console.log(basicInfoValues)
  // console.log(isAllInfoSelected)

  return (
    <div>
      <Select
        label="연소득"
        name="salary"
        options={anuallIncomeOptions}
        placeholder={anuallIncomeOptions[0].label}
        value={basicInfoValues.salary}
        onChange={handleInfoChange}
      />
      <Select
        label="신용점수"
        name="creditScore"
        options={creditScore}
        placeholder={creditScore[0].label}
        value={basicInfoValues.creditScore}
        onChange={handleInfoChange}
      />
      <Select
        label="결제일"
        name="payDate"
        options={paymentDateOptions}
        placeholder={paymentDateOptions[0].label}
        value={basicInfoValues.payDate}
        onChange={handleInfoChange}
      />
      <FixedBottomButton
        label="다음"
        disabled={!isAllInfoSelected}
        onClick={() => onNext(basicInfoValues)}
      />
    </div>
  )
}
