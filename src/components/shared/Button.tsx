import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  ButtonColorType,
  ButtonSizeType,
  buttonColorMap,
  buttonToggleMap,
  buttonSizeMap,
} from '@styles/button'

interface ButtonProps {
  color?: ButtonColorType
  size?: ButtonSizeType
  toggle?: boolean
  full?: boolean
  disabled?: boolean
}

const Button = styled.button<ButtonProps>(
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

export default Button
