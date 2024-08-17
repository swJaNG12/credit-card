import Flex from './Flex'
import Text from './Text'
import Spacing from './Spacing'
import { css } from '@emotion/react'

export default function FullPageLoader({ messgae }: { messgae?: string }) {
  return (
    <Flex css={LoaderContainerStyles} justify="center" align="center">
      <Flex direction="column" align="center">
        <img
          src="https://cdn.pixabay.com/animation/2022/08/22/11/10/11-10-32-625_512.gif"
          alt=""
        />
        {messgae && (
          <>
            <Spacing size={120} />
            <Text typography="t5" bold={true}>
              {messgae}
            </Text>
          </>
        )}
      </Flex>
    </Flex>
  )
}
const LoaderContainerStyles = css`
  display: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`
