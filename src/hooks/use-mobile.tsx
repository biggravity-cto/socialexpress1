
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  )

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const handleResize = () => {
      setIsMobile(mql.matches)
    }
    
    // Initial check
    handleResize()
    
    // Add event listeners
    window.addEventListener("resize", handleResize)
    
    // This is the modern way to listen for media query changes
    if (mql.addEventListener) {
      mql.addEventListener("change", handleResize)
    } else {
      // Fallback for older browsers
      window.addEventListener("resize", handleResize)
    }
    
    return () => {
      window.removeEventListener("resize", handleResize)
      
      if (mql.removeEventListener) {
        mql.removeEventListener("change", handleResize)
      }
    }
  }, [])

  return isMobile
}
