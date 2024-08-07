import { colors, Colors } from '@styles/colorPalette'
import { Typography, typographyMap } from '@styles/typography'
import styled from '@emotion/styled'
import { CSSProperties } from 'react'

interface TextProps {
  typography?: Typography
  color?: Colors
  display?: CSSProperties['display']
  fontWeight?: CSSProperties['fontWeight']
  textAlign?: CSSProperties['textAlign']
  bold?: boolean
}

const Text = styled.span<TextProps>(
  ({ color = 'black', display, fontWeight, textAlign, bold }) => ({
    color: colors[color],
    display,
    fontWeight: bold ? 'bold' : fontWeight,
    textAlign,
  }),
  ({ typography = 't5' }) => typographyMap[typography],
)

export default Text
