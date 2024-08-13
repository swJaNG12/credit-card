import { css } from '@emotion/react'

export const colorPalette = css`
  :root {
    --red: #c5705d;
    --blue: #478ccf;
    --green: #88d66c;
    --white: #fefefe;
    --black: #1a1a1a;
    --gray: #77e4c8;
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
