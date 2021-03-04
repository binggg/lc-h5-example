import * as React from 'react'
import { useLocation } from 'react-router-dom'

export function useScrollTop() {
  const { pathname } = useLocation()
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    })
  }, [pathname])
  return null
}