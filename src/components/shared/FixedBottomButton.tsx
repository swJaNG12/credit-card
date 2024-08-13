import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import { createPortal } from 'react-dom'

import Button from '@shared/Button'
import { colors } from '@/styles/colorPalette'

interface FixedBottomButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

export default function FixedBottomButton({
  label,
  onClick,
  disabled,
}: FixedBottomButtonProps) {
  const $portalRoot = document.getElementById('root-portal')

  if ($portalRoot === null) {
    return null
  }

  return createPortal(
    <Container>
      <Button
        size="medium"
        css={ButtonStyle}
        full={true}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </Button>
    </Container>,
    $portalRoot,
  )
}

const slideUP = keyframes`
	0% {
		transform: translateY(100%);
	}

	100% {
		transform: translateY(0%);
	}
`

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  padding: 20px 10px 8px;
  animation: ${slideUP} 0.5s ease-in-out;
`

const ButtonStyle = css`
  border-radius: 8px;
`
