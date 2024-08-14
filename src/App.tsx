import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from '@shared/ScrollToTop'
import Navbar from '@shared/Navbar'
import HomePage from '@pages/Home'
import TestPage from '@pages/Test'
import CardPage from '@pages/Card'
import SignUpPage from '@pages/SignUp'
import SignInPage from '@pages/SignIn'

import PrivateRoute from '@components/auth/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/card/:id" element={<CardPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
