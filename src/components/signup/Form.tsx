import Flex from '@shared/Flex'
import TextField from '@shared/TextField'
import FixedBottomButton from '@shared/FixedBottomButton'
import Spacing from '@shared/Spacing'
import { FormValues } from '@models/Signup'

import { css } from '@emotion/react'

import React, { useCallback, useState } from 'react'

export default function Form() {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
  })

  const handleFormValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name)
    console.log(e.target.value)

    setFormValues((prevFormValue) => ({
      ...prevFormValue,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        placeholder="이메일"
        name="email"
        value={formValues.email}
        onChange={handleFormValues}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        type="password"
        name="password"
        value={formValues.password}
        onChange={handleFormValues}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드 재확인"
        type="password"
        name="rePassword"
        value={formValues.rePassword}
        onChange={handleFormValues}
      />
      <Spacing size={16} />
      <TextField
        label="이름"
        placeholder="이름"
        name="name"
        value={formValues.name}
        onChange={handleFormValues}
      />

      <FixedBottomButton label="회원가입" onClick={() => {}} disabled={false} />
    </Flex>
  )
}

const formContainerStyles = css`
  padding: 24px;
`
