import React, { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Toggle visibility after 300px scroll
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      // Calculate scroll percentage for the glowing progress ring
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100
        setScrollProgress(progress)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
      isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-75 pointer-events-none"
    }`}>
      <button
        onClick={scrollToTop}
        aria-label="Back to Top"
        className="group relative p-3.5 rounded-2xl glass border border-white/15 shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {/* Glow effect on hover */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur-md opacity-0 group-hover:opacity-75 transition-opacity duration-500" />

        {/* Scroll Progress Ring SVG */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            className="stroke-white/10 fill-none"
            strokeWidth="2"
          />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            className="stroke-purple-400 fill-none transition-all duration-150"
            strokeWidth="2"
            strokeDasharray="100"
            strokeDashoffset={100 - scrollProgress}
            strokeLinecap="round"
          />
        </svg>

        {/* Arrow Icon */}
        <ArrowUp className="relative z-10 w-5 h-5 text-white group-hover:-translate-y-1 transition-transform duration-300" />
      </button>
    </div>
  )
}

export default BackToTop
