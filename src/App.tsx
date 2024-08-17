import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from '@shared/ScrollToTop'
import Navbar from '@shared/Navbar'
import HomePage from '@pages/Home'
import TestPage from '@pages/Test'
import CardPage from '@pages/Card'
import SignUpPage from '@pages/SignUp'
import SignInPage from '@pages/SignIn'
import ApplyPage from '@pages/Apply'
import ApplyDone from '@pages/ApplyDone'
import MyPage from '@pages/My'

import PrivateRoute from '@components/auth/PrivateRoute'
import { Suspense } from 'react'

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
        <Route
          path="/apply/:id"
          element={
            <PrivateRoute>
              <Suspense fallback={<div>fallback</div>}>
                <ApplyPage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/apply/done"
          element={
            <PrivateRoute>
              <ApplyDone />
            </PrivateRoute>
          }
        />
        <Route
          path="/my"
          element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          }
        />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
