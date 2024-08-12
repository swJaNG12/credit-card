import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// location(pathname) 이 바뀔 때마다 scroll을 최상단으로 끌어올리겠다는 뜻
export default function ScrollToTop() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return null
}
