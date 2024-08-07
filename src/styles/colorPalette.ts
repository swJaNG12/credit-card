import { css } from '@emotion/react'

export const colorPalette = css`
  :root {
    --red: #c5705d;
    --blue: #5b99c2;
    --green: #88d66c;
    --white: #fefefe;
    --black: #1a1a1a;
    --gray: #77acb7;
  }
`

export const colors = {
  red: 'var(--red)',
  blue: 'var(--blue)',
  green: 'var(--green)',
  white: 'var(--white)',
  black: 'var(--black)',
  gray: 'var(--gray)',
}

export type Colors = keyof typeof colors
