import { forwardRef, SelectHTMLAttributes } from 'react'
import styled from '@emotion/styled'

import { colors } from '@styles/colorPalette'
import { Option } from '@models/apply'
import Text from './Text'
import Flex from './Flex'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: Option[]
  placeholder: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, placeholder, value, ...selectProps },
  ref,
) {
  return (
    <Flex direction="column">
      {label && (
        <Text
          typography="t7"
          color="black"
          display="inline-block"
          style={{ margin: '6px' }}
        >
          {label}
        </Text>
      )}
      <BaseSelect ref={ref} required={true} value={value} {...selectProps}>
        <option disabled={true} hidden={true} value="">
          {placeholder}
        </option>
        {options.map(({ label, value }) => (
          <option key={label} value={value}>
            {label}
          </option>
        ))}
      </BaseSelect>
    </Flex>
  )
})

const BaseSelect = styled.select`
  height: 52px;
  background-color: ${colors.gray};
  border: none;
  border-radius: 16px;
  padding: 016px;
  cursor: pointer;

  &:required:invalid {
    color: ${colors.gray200};
  }
`

export default Select
