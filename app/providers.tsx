"use client"

import type React from "react"

import { ThemeProvider } from "next-themes"
import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Preloader from "@/components/preloader"
import ScrollToTop from "@/components/scroll-to-top"

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <Navigation />
          <main>{children}</main>
          <ScrollToTop />
        </>
      )}
    </ThemeProvider>
  )
}
