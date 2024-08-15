import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import {
  ButtonColorType,
  ButtonSizeType,
  buttonColorMap,
  buttonToggleMap,
  buttonSizeMap,
} from '@styles/button'
import Flex from './Flex'
import Text from './Text'
import Spacing from './Spacing'

interface ButtonProps {
  color?: ButtonColorType
  size?: ButtonSizeType
  toggle?: boolean
  full?: boolean
  disabled?: boolean
}

const BaseButton = styled.button<ButtonProps>(
  {
    cursor: 'pointer',
    fontWeight: 'bold',
    borderRadius: '6px',
  },
  ({ color = 'primary', toggle }) =>
    toggle ? buttonToggleMap[color] : buttonColorMap[color],
  ({ size = 'small' }) => buttonSizeMap[size],
  ({ full }) =>
    full
      ? css`
          display: block;
          width: 100%;
          border-radius: 0;
        `
      : undefined,
  ({ disabled }) =>
    disabled
      ? css`
          opacity: 0.26;
          cursor: initial;
        `
      : undefined,
)

export function ButtonGroup({
  title,
  children,
}: {
  title?: string
  children: React.ReactNode
}) {
  return (
    <Flex direction="column">
      {title && (
        <>
          <Text typography="t6" bold={true}>
            {title}
          </Text>
          <Spacing size={6} />
        </>
      )}
      <Flex css={ButtonGroupStyle}>{children}</Flex>
    </Flex>
  )
}

const ButtonGroupStyle = css`
  // flex-wrap: wrap;
  gap: 10px;

  & button {
    flex: 1;
  }
`

const Button = BaseButton as typeof BaseButton & {
  Group: typeof ButtonGroup
}
Button.Group = ButtonGroup

export default Button
