import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import React, { MouseEvent } from 'react'

function Agreement({ children }: { children: React.ReactNode }) {
  return (
    <Flex as="ul" direction="column" css={agreementContainerStyles}>
      {children}
    </Flex>
  )
}

function AgreementTitle({
  children,
  checked,
  onChange,
}: {
  children: React.ReactNode
  checked: boolean
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
}) {
  return (
    <Flex as="li" onClick={(e) => onChange(e, !checked)}>
      <IconCheck checked={checked} withCircle={true} />
      <Text bold={true}>{children}</Text>
    </Flex>
  )
}

function AgreementDescription({
  children,
  checked,
  link,
  onChange,
}: {
  children: React.ReactNode
  checked: boolean
  link?: string
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
}) {
  return (
    <Flex as="li">
      <Flex
        onClick={(e) => onChange(e, !checked)}
        css={flexGrow}
        align="center"
      >
        <IconCheck checked={checked} />
        <Text typography="t6">{children}</Text>
      </Flex>
      {link ? (
        <a href={link} target="_blank">
          <Text typography="t6">링크</Text>
        </a>
      ) : null}
    </Flex>
  )
}

Agreement.Title = AgreementTitle
Agreement.Description = AgreementDescription

function IconCheck({
  checked,
  withCircle = false,
}: {
  checked: boolean
  withCircle?: boolean
}) {
  return (
    <svg
      viewBox="0 0 512 512"
      height="24px"
      width="24px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M340.1,177.3L215.3,303l-47.2-47.2l-17.8,17.8l56,56c2.5,2.5,5.9,4.5,8.9,4.5s6.3-2,8.8-4.4l133.7-134.4L340.1,177.3z"
          fill={checked ? colors.blue : colors.gray}
        />
        <g>
          {withCircle && (
            <path
              d="M256,48C141.1,48,48,141.1,48,256s93.1,208,208,208c114.9,0,208-93.1,208-208S370.9,48,256,48z M256,446.7    c-105.1,0-190.7-85.5-190.7-190.7c0-105.1,85.5-190.7,190.7-190.7c105.1,0,190.7,85.5,190.7,190.7    C446.7,361.1,361.1,446.7,256,446.7z"
              fill={checked ? colors.blue : colors.gray}
            />
          )}
        </g>
      </g>
    </svg>
  )
}

const agreementContainerStyles = css`
  padding: 24px;

  & li {
    cursor: pointer;
  }
`

const flexGrow = css`
  flex: 1;
`

export default Agreement

/**
 * <Agreement>
 * 	<Agreement.Title>타이틀</Agreement.Title>
 * 	<Agreement.Description>약관 1</Agreement.Description>
 * 	<Agreement.Description>약관 2</Agreement.Description>
 * </Agreement>
 */
