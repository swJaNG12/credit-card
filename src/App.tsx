import { css } from '@emotion/react'
import styled from '@emotion/styled'
import './App.css'

// css Prop(String Styles)
const containerStyle = css`
  background-color: blue;
`

// Styled Components
const Button = styled.button`
  background-color: red;
  color: #fff;
`

// Composition
const base = css`
  ${containerStyle}
  color: yellow;
`

function App() {
  return (
    <div className="App">
      <header className="App-header" css={containerStyle}>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button>Example</Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          css={base}
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
