import Flex from '@shared/Flex'
import TextField from '@shared/TextField'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'

import { FormValues } from '@models/signin'
import { colors } from '@styles/colorPalette'

import React, { useCallback, useMemo, useState } from 'react'
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import { isEmail } from 'validator'

interface FormProps {
  onSubmit: (formValues: FormValues) => void
}

export default function Form({ onSubmit }: FormProps) {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
  })

  const handleFormValues = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [e.target.name]: e.target.value,
      }))
    },
    [],
  )

  const errors = useMemo(() => validate(formValues), [formValues])

  const isFormValid = Object.keys(errors).length === 0

  return (
    <Flex direction="column" css={FromContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        onChange={handleFormValues}
        placeholder="이메일"
        value={formValues.email}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        name="password"
        onChange={handleFormValues}
        type="password"
        value={formValues.password}
      />
      <Spacing size={32} />
      <Button
        size="medium"
        disabled={!isFormValid}
        onClick={() => onSubmit(formValues)}
      >
        로그인
      </Button>
      <Spacing size={12} />
      <Link to="/signup" css={LinkStyles}>
        <Text typography="t6">아직 계정이 없으신가요?</Text>
      </Link>
    </Flex>
  )
}

const LinkStyles = css`
  text-align: center;

  & > span:hover {
    transition: color 0.2s;
    color: ${colors.blue};
  }
`

const FromContainerStyles = css`
  padding: 24px;
`

function validate(formValues: FormValues) {
  let errors: Partial<FormValues> = {}

  if (isEmail(formValues.email) === false) {
    errors.email = 'true'
  }

  if (formValues.password.length < 8) {
    errors.password = 'true'
  }

  return errors
}
