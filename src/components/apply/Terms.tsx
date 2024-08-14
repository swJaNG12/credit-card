import { useState } from 'react'
import Agreement from '@shared/Agreement'

import { TermsList } from '@constants/apply'

export default function Terms() {
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

  console.log(termsAgreement)

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
    </div>
  )
}
