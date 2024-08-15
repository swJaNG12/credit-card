import { useState } from 'react'
import Agreement from '@shared/Agreement'
import FixedBottomButton from '@shared/FixedBottomButton'

import { TermsList } from '@constants/apply'
import { ApplyValues } from '@models/apply'

type Terms = ApplyValues['terms']

export default function Terms({ onNext }: { onNext: (terms: Terms) => void }) {
  // useState(fn) => fn의 역할은 termsAgreements 초기값을 생성하는 것
  // 초기값은 {termId1: boolean, termId2: boolean, ...} 이런 형태다.
  const [termsAgreement, setTermsAgreement] = useState(() => {
    return TermsList.reduce<Record<string, boolean>>(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {},
    )
  })

  const handleAllAgreement = (checked: boolean) => {
    const result = Object.keys(termsAgreement).reduce(
      (prev, termId) => ({
        ...prev,
        [termId]: checked,
      }),
      {},
    )

    setTermsAgreement(result)
  }

  const isAllTermsAgreed = Object.values(termsAgreement).every(
    (isTermAgreed) => isTermAgreed,
  )

  return (
    <div>
      <Agreement>
        <Agreement.Title
          checked={isAllTermsAgreed}
          onChange={(_, checked) => {
            handleAllAgreement(checked)
          }}
        >
          약관에 모두 동의
        </Agreement.Title>
        {TermsList.map((term, idx) => (
          <Agreement.Description
            key={term.id}
            checked={termsAgreement[term.id]}
            link={term.link}
            onChange={(_, checked) => {
              setTermsAgreement((prevTerms) => ({
                ...prevTerms,
                [term.id]: checked,
              }))
            }}
          >
            {term.title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관 동의"
        disabled={!isAllTermsAgreed}
        onClick={() => {
          onNext(Object.keys(termsAgreement))
        }}
      />
    </div>
  )
}
