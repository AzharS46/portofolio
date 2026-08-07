import React from "react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-white/10 bg-dark/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <span className="text-sm text-gray-400">
            © {currentYear}{" "}
            <span className="bg-gradient-to-r from-primary via-purple-300 to-accent bg-clip-text text-transparent font-semibold">
              Azhar Sunusi
            </span>
            . All rights reserved.
          </span>
          <span className="text-xs text-gray-500 font-mono">
            Designed & Crafted with React + Tailwind CSS
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
