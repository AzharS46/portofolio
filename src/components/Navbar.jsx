import React, { useState, useEffect } from "react"
import { Menu, X, Globe } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("Home")
  const location = useLocation()
  const navigate = useNavigate()
  const { lang, toggleLanguage, t } = useLanguage()

  const navItems = [
    { href: "#Home", label: t.nav.home },
    { href: "#About", label: t.nav.about },
    { href: "#Portofolio", label: t.nav.portfolio },
    { href: "#Contact", label: t.nav.contact },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = navItems.map(item => {
        const section = document.querySelector(item.href)
        if (section) {
          return {
            id: item.href.replace("#", ""),
            offset: section.offsetTop - 550,
            height: section.offsetHeight
          }
        }
        return null
      }).filter(Boolean)

      const currentPosition = window.scrollY
      const active = sections.find(section =>
        currentPosition >= section.offset &&
        currentPosition < section.offset + section.height
      )

      if (active) {
        setActiveSection(active.id)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lang])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleNavClick = (href) => {
    setIsOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  // Hide navbar on admin/login pages
  if (location.pathname.startsWith('/admin') || location.pathname === '/login') {
    return null
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-3 bg-dark/85 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/40' 
          : 'py-5 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <button 
              onClick={() => handleNavClick('#Home')}
              className="relative group"
            >
              <span className="text-xl font-bold bg-gradient-to-r from-primary via-purple-300 to-accent bg-clip-text text-transparent tracking-wide">
                {"<Azhar.dev />"}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                    activeSection === item.label
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {activeSection === item.label && (
                    <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30" />
                  )}
                  <span className="relative z-10">{item.label}</span>
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                    activeSection === item.label ? 'w-3/4' : 'w-0 group-hover:w-1/2'
                  }`} />
                </button>
              ))}

              {/* Language Switcher Toggle Button (ID / EN) */}
              <button
                onClick={toggleLanguage}
                aria-label="Switch Language"
                className="ml-3 group relative px-3 py-1.5 rounded-xl glass border border-white/15 text-xs font-semibold text-white flex items-center gap-1.5 hover:border-purple-500/40 transition-all duration-300"
              >
                <Globe className="w-3.5 h-3.5 text-purple-300 group-hover:rotate-45 transition-transform" />
                <span>{lang === "ID" ? "🇮🇩 ID" : "🇬🇧 EN"}</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggleLanguage}
                className="px-2.5 py-1.5 rounded-xl glass border border-white/10 text-xs font-semibold text-white flex items-center gap-1"
              >
                <Globe className="w-3.5 h-3.5 text-purple-300" />
                <span>{lang}</span>
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2.5 rounded-xl glass border border-white/10"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
        isOpen ? 'visible' : 'invisible'
      }`}>
        <div 
          className={`absolute inset-0 bg-dark/95 backdrop-blur-2xl transition-opacity duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />
        
        <div className={`absolute inset-x-4 top-20 transition-all duration-500 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <div className="glass rounded-2xl p-6 space-y-2 border border-white/15">
            {navItems.map((item, index) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                  activeSection === item.label
                    ? 'bg-gradient-to-r from-primary/20 to-accent/20 text-white border border-primary/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
