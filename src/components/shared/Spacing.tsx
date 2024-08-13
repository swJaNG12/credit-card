import styled from '@emotion/styled'

interface SapcingProps {
  size: number
  direction: 'vertical' | 'horizontal'
}

const Spacing = styled.div<SapcingProps>`
  ${({ size, direction = 'vertical' }) =>
    direction === 'vertical' ? `height: ${size}px` : `width: ${size}px`}
`

export default Spacing
