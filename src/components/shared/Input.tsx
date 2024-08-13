import { colors } from '@styles/colorPalette'
import styled from '@emotion/styled'

const Input = styled.input`
  padding: 0 16px;
  font-size: 15px;
  height: 40px;
  font-weight: 500;
  border: 1px solid ${colors.gray};
  width: 100%;
  box-sizing: border-box;
  border-radius: 8px;

  &:focus {
    outline: none;
    border: 1px solid ${colors.blue};
  }

  &[aria-invalid='true'] {
    border-color: ${colors.red};
  }
`

export default Input
