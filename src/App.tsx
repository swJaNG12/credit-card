import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '@pages/Home'
import TestPage from '@pages/Test'
import CardPage from '@pages/Card'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/card/:id" element={<CardPage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
