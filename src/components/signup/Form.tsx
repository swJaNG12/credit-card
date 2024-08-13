import Flex from '@shared/Flex'
import TextField from '@shared/TextField'
import FixedBottomButton from '@shared/FixedBottomButton'
import { css } from '@emotion/react'

export default function Form() {
  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField label="이메일" placeholder="이메일" />
      <TextField label="패스워드" type="password" />
      <TextField label="패스워드 재확인" type="password" />
      <TextField label="이름" placeholder="이름" />

      <FixedBottomButton label="회원가입" onClick={() => {}} />
    </Flex>
  )
}

const formContainerStyles = css`
  padding: 24px;
`
