import { colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'
import Dimmed from './Dimmed'
import Flex from './Flex'
import Text from './Text'
import Button from './Button'

interface AlertProps {
  open?: boolean
  title: React.ReactNode
  description?: React.ReactNode
  buttonLabel?: string
  onButtonClick: () => void
}
function Alert({
  open,
  title,
  description,
  buttonLabel = '확인',
  onButtonClick,
}: AlertProps) {
  if (open === false) return null

  return (
    <Dimmed>
      <AlertContainer>
        <Text
          typography="t4"
          bold={true}
          display="block"
          style={{ marginBottom: '6px' }}
        >
          {title}
        </Text>
        {description ? <Text typography="t7">{description}</Text> : null}

        <Flex align="center" justify="flex-end">
          <Button
            onClick={onButtonClick}
            toggle={true}
            style={{ marginTop: '12px', border: 'none' }}
          >
            {buttonLabel}
          </Button>
        </Flex>
      </AlertContainer>
    </Dimmed>
  )
}

const AlertContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${colors.white};
  border-radius: 8px;
  overflow: hidden;
  z-index: var(--alert-zindex);
  width: 320px;
  padding: 24px;
  box-sizing: border-box;
`

export default Alert
