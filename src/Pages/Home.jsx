import React, { useEffect, useState, memo } from "react"
import { Helmet } from "react-helmet-async"
import { Github, Linkedin, Mail, ExternalLink, Instagram, Sparkles, ArrowRight, Code2, Braces, Terminal, Download } from "lucide-react"
import Swal from "sweetalert2"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { SOCIAL_LINKS } from "../utils/socialConfig"
import { useLanguage } from "../context/LanguageContext"

const StatusBadge = memo(() => {
  const { t } = useLanguage()
  return (
    <div className="inline-block animate-float lg:mx-0" data-aos="zoom-in" data-aos-delay="400">
      <div className="relative group cursor-pointer">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-indigo-500 rounded-full blur-md opacity-40 group-hover:opacity-75 transition duration-500 animate-gradient" />
        <div className="relative px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="bg-gradient-to-r from-primary via-purple-300 to-accent text-transparent bg-clip-text text-xs sm:text-sm font-semibold tracking-wide flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-indigo-400 animate-spin-slower" />
            {t.hero.statusBadge}
          </span>
        </div>
      </div>
    </div>
  )
})

const TypewriterRoles = () => {
  const roles = ["Developer", "Designer", "Creator", "Innovator"]
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const role = roles[currentRoleIndex]
    const speed = isDeleting ? 60 : 120

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(role.substring(0, currentText.length + 1))
        if (currentText === role) {
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        setCurrentText(role.substring(0, currentText.length - 1))
        if (currentText === "") {
          setIsDeleting(false)
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
        }
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentRoleIndex])

  return (
    <span className="relative inline-block mt-2">
      <span className="absolute -inset-2 bg-gradient-to-r from-primary to-accent blur-2xl opacity-30" />
      <span className="relative bg-gradient-to-r from-primary via-purple-300 to-accent bg-clip-text text-transparent">
        {currentText}
      </span>
      <span className="typing-cursor" />
    </span>
  )
}

const MainTitle = memo(() => {
  const { t } = useLanguage()
  return (
    <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
      <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-none">
        <span className="relative inline-block">
          <span className="absolute -inset-2 bg-gradient-to-r from-primary to-accent blur-2xl opacity-20" />
          <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            {t.hero.rolePrefix}
          </span>
        </span>
        <br />
        <TypewriterRoles />
      </h1>
    </div>
  )
})

const TechPill = memo(({ tech }) => (
  <div className="group relative px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs sm:text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 hover:border-accent/40 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
    <span className="relative z-10 flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
      {tech}
    </span>
  </div>
))

const CTAButton = memo(({ href, text, icon: Icon, primary, onClick }) => (
  <a href={href} onClick={onClick}>
    <button className="group relative w-[165px]">
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary via-purple-500 to-accent rounded-xl ${primary ? 'opacity-80' : 'opacity-40'} blur-md group-hover:opacity-100 transition-all duration-500`} />
      <div className="relative h-12 bg-dark/90 backdrop-blur-xl rounded-xl border border-white/15 leading-none overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-primary/30 via-purple-500/30 to-accent/30" />
        <span className="relative z-10 flex items-center justify-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all duration-300">
          <span>{text}</span>
          <Icon className={`w-4 h-4 text-purple-300 ${text.includes('Contact') || text.includes('Hubungi') ? 'group-hover:translate-x-1' : text.includes('CV') ? 'group-hover:translate-y-0.5' : 'group-hover:rotate-45'} transform transition-all duration-300`} />
        </span>
      </div>
    </button>
  </a>
))

const SocialLink = memo(({ icon: Icon, link, label, isEmail }) => {
  const handleClick = (e) => {
    if (isEmail) {
      e.preventDefault()
      navigator.clipboard.writeText(SOCIAL_LINKS.email)
      Swal.fire({
        title: "Email Copied!",
        text: `${SOCIAL_LINKS.email} has been copied to clipboard.`,
        icon: "success",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#0a0520",
        color: "#fff",
      })
    }
  }

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" aria-label={label} onClick={handleClick}>
      <button className="group relative p-3" aria-label={label}>
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-0 group-hover:opacity-40 transition-all duration-500" />
        <div className="relative rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-3 group-hover:border-primary/60 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
          <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
        </div>
      </button>
    </a>
  )
})

const Home = () => {
  const { t } = useLanguage()

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
    })
  }, [])

  const techStack = ["React 18", "JavaScript ES6+", "Tailwind CSS", "Vite", "Supabase"]
  const socialLinks = [
    { icon: Github, link: SOCIAL_LINKS.github, label: "GitHub" },
    { icon: Linkedin, link: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
    { icon: Instagram, link: SOCIAL_LINKS.instagram, label: "Instagram" },
    { icon: Mail, link: `mailto:${SOCIAL_LINKS.email}`, label: "Email", isEmail: true },
  ]

  const handleDownloadCV = (e) => {
    if (SOCIAL_LINKS.cvUrl === "#") {
      e.preventDefault()
      Swal.fire({
        title: "Download CV",
        text: "Fitur CV siap diunduh! Tambahkan link file CV Anda di file src/utils/socialConfig.js",
        icon: "info",
        background: "#0a0520",
        color: "#fff",
        confirmButtonColor: "#6366f1",
      })
    }
  }

  return (
    <section id="Home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12">
      <Helmet>
        <title>Azhar Sunusi | Frontend Developer</title>
        <meta name="description" content="Azhar Sunusi - Frontend Developer Portfolio. Building high-performance digital experiences." />
      </Helmet>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left">
            <StatusBadge />
            <MainTitle />
            
            <p 
              className="text-gray-300/90 text-base sm:text-lg max-w-xl lg:mx-0 mx-auto leading-relaxed font-normal"
              data-aos="fade-up" 
              data-aos-delay="800"
            >
              {t.hero.bio}
            </p>

            {/* Tech Stack Pills */}
            <div 
              className="flex flex-wrap gap-2.5 justify-center lg:justify-start"
              data-aos="fade-up" 
              data-aos-delay="900"
            >
              {techStack.map((tech, idx) => (
                <TechPill key={idx} tech={tech} />
              ))}
            </div>

            {/* CTA Buttons */}
            <div 
              className="flex flex-wrap gap-3.5 justify-center lg:justify-start pt-3"
              data-aos="fade-up" 
              data-aos-delay="1000"
            >
              <CTAButton href="#Portofolio" text={t.hero.exploreBtn} icon={ExternalLink} primary />
              <CTAButton href={SOCIAL_LINKS.cvUrl} text={t.hero.downloadCvBtn} icon={Download} onClick={handleDownloadCV} />
              <CTAButton href="#Contact" text={t.hero.contactBtn} icon={ArrowRight} />
            </div>

            {/* Social Links */}
            <div 
              className="flex gap-2 justify-center lg:justify-start pt-2"
              data-aos="fade-up" 
              data-aos-delay="1100"
            >
              {socialLinks.map((social, idx) => (
                <SocialLink key={idx} {...social} />
              ))}
            </div>
          </div>

          {/* Right Content - Terminal & Interactive Code Card */}
          <div 
            className="hidden lg:flex justify-center items-center"
            data-aos="fade-left" 
            data-aos-delay="600"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-accent rounded-3xl blur-2xl opacity-40 group-hover:opacity-75 transition duration-1000 animate-pulse-slow" />
              
              <div className="relative glass rounded-2xl p-7 max-w-lg border border-white/15 shadow-2xl backdrop-blur-2xl">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
                  <div className="flex gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                    <div className="w-3.5 h-3.5 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400">
                    <Terminal className="w-3.5 h-3.5 text-accent" />
                    <span>{t.hero.terminalTitle}</span>
                  </div>
                </div>
                
                <div className="font-mono text-sm space-y-2.5 text-left leading-relaxed">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-indigo-400" />
                    <span className="text-purple-400 font-semibold">export const</span>
                    <span className="text-blue-300 font-semibold">azharProfile</span>
                    <span className="text-gray-400">=</span>
                    <span className="text-yellow-300">{"{"}</span>
                  </div>
                  
                  <div className="pl-6 space-y-1.5 border-l border-white/10 ml-2">
                    <div>
                      <span className="text-indigo-300">name</span>
                      <span className="text-gray-400">: </span>
                      <span className="text-emerald-300">"Azhar Sunusi"</span>
                      <span className="text-gray-500">,</span>
                    </div>
                    <div>
                      <span className="text-indigo-300">role</span>
                      <span className="text-gray-400">: </span>
                      <span className="text-emerald-300">"Frontend Specialist"</span>
                      <span className="text-gray-500">,</span>
                    </div>
                    <div>
                      <span className="text-indigo-300">codeQuality</span>
                      <span className="text-gray-400">: </span>
                      <span className="text-amber-300">"Exceptional"</span>
                      <span className="text-gray-500">,</span>
                    </div>
                    <div>
                      <span className="text-indigo-300">stack</span>
                      <span className="text-gray-400">: [</span>
                      <span className="text-purple-300">"React"</span>
                      <span className="text-gray-500">, </span>
                      <span className="text-purple-300">"Tailwind"</span>
                      <span className="text-gray-500">, </span>
                      <span className="text-purple-300">"Supabase"</span>
                      <span className="text-gray-400">],</span>
                    </div>
                    <div>
                      <span className="text-indigo-300">status</span>
                      <span className="text-gray-400">: </span>
                      <span className="text-emerald-400">"{t.hero.availableStatus}"</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-yellow-300">{"}"}</span>
                    <span className="text-gray-400">;</span>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-3 border-t border-white/10 mt-3 text-xs text-gray-400">
                    <Braces className="w-4 h-4 text-accent animate-pulse" />
                    <span className="text-emerald-400 font-semibold">bun run build</span>
                    <span className="w-2 h-4 bg-accent animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer">
        <a href="#About" aria-label="Scroll Down">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2 backdrop-blur-md">
            <div className="w-1.5 h-3 bg-gradient-to-b from-primary to-accent rounded-full animate-pulse" />
          </div>
        </a>
      </div>
    </section>
  )
}

export default Home
