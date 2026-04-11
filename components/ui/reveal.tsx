"use client"

import { useEffect, useRef, ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number       // ms
  direction?: "up" | "left" | "right" | "none"
  once?: boolean
}

export function Reveal({ children, className = "", delay = 0, direction = "up", once = true }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("reveal-visible")
          }, delay)
          if (once) observer.disconnect()
        } else if (!once) {
          el.classList.remove("reveal-visible")
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, once])

  const dirClass = {
    up: "reveal-up",
    left: "reveal-left",
    right: "reveal-right",
    none: "reveal-none",
  }[direction]

  return (
    <div ref={ref} className={`reveal ${dirClass} ${className}`}>
      {children}
    </div>
  )
}
