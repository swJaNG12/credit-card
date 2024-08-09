import { forwardRef } from 'react'
import { useState } from 'react'
import { InputHTMLAttributes } from 'react'
import Input from './Input'
import Text from './Text'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hasError?: boolean
  helpMessage?: string
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField({ label, hasError, helpMessage, ...inputProps }, ref) {
    const [focused, setFocused] = useState(false)

    // Todo: 포커스 처리
    const labelColor = hasError ? 'red' : focused ? 'blue' : undefined

    // Focus 얻었을 때 발생
    const handleFocus = () => {
      setFocused(true)
    }

    // Focus 잃었을 때 발생
    const handleBlur = () => {
      setFocused(false)
    }

    return (
      <div>
        {label && (
          <Text
            typography="t7"
            color={labelColor}
            display="inline-block"
            style={{ margin: '6px' }}
          >
            {label}
          </Text>
        )}

        <Input
          ref={ref}
          aria-invalid={hasError}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...inputProps}
        />

        {helpMessage && (
          <Text
            typography="t7"
            color={labelColor}
            display="inline-block"
            style={{ marginTop: '6px', fontSize: '12px' }}
          >
            {helpMessage}
          </Text>
        )}
      </div>
    )
  },
)

export default TextField
