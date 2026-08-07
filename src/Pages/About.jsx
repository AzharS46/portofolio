import React, { useEffect, memo, useState } from "react"
import { FileText, Code, Award, Globe, Sparkles, UserCheck, Briefcase, GraduationCap, Calendar, CheckCircle2 } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useLanguage } from "../context/LanguageContext"

const Header = memo(() => {
  const { t } = useLanguage()
  return (
    <div className="text-center lg:mb-8 mb-4 px-[5%]">
      <div className="inline-block relative group">
        <h2 
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-300 to-accent" 
          data-aos="zoom-in-up"
          data-aos-duration="600"
        >
          {t.about.title}
        </h2>
      </div>
      <p 
        className="mt-2 text-gray-300/80 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
        data-aos="zoom-in-up"
        data-aos-duration="800"
      >
        <Sparkles className="w-5 h-5 text-purple-400" />
        {t.about.subtitle}
        <Sparkles className="w-5 h-5 text-purple-400" />
      </p>
    </div>
  )
})

const ProfileImage = memo(() => (
  <div className="flex justify-center lg:justify-end items-center p-4">
    <div 
      className="relative group cursor-pointer" 
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="absolute -inset-6 opacity-30 z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
      </div>

      <div className="relative">
        <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.3)] transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-purple-400/50 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
          
          <div className="w-full h-full bg-gradient-to-br from-primary/30 via-dark-200 to-accent/30 flex items-center justify-center">
            <div className="text-center">
              <UserCheck className="w-20 h-20 text-purple-300 mx-auto mb-2 opacity-80" />
              <span className="text-sm font-semibold text-white tracking-wider">Azhar Sunusi</span>
            </div>
          </div>

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        </div>
      </div>
    </div>
  </div>
))

const StatCard = memo(({ icon: Icon, count, label }) => (
  <div 
    className="glass-card rounded-xl p-4 text-center group cursor-default"
    data-aos="zoom-in"
    data-aos-duration="600"
  >
    <div className="flex justify-center mb-2">
      <div className="p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
        <Icon className="w-5 h-5 text-purple-300" />
      </div>
    </div>
    <h3 className="text-2xl font-bold text-white">{count}</h3>
    <p className="text-gray-400 text-xs sm:text-sm font-medium">{label}</p>
  </div>
))

const SkillBadge = memo(({ name, color }) => (
  <div 
    className="px-4 py-2 rounded-full glass-card text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 cursor-default hover:scale-105 hover:border-purple-500/40"
    data-aos="fade-up"
  >
    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${color}`} />
    {name}
  </div>
))

const TimelineSection = () => {
  const { t, lang } = useLanguage()
  const [activeTab, setActiveTab] = useState("experience")

  const experiences = lang === "ID" ? [
    {
      role: "Frontend Developer",
      company: "Freelance & Projects",
      period: "2024 - Sekarang",
      description: "Mengembangkan aplikasi web modern, responsif, dan performa tinggi menggunakan React, Tailwind CSS, dan Supabase.",
    },
    {
      role: "Web Development Specialist",
      company: "Portofolio & Karya Digital",
      period: "2023 - 2024",
      description: "Membuat antarmuka pengguna (UI/UX) interaktif dengan animasi cerdas dan integrasi API terpusat.",
    },
  ] : [
    {
      role: "Frontend Developer",
      company: "Freelance & Projects",
      period: "2024 - Present",
      description: "Developing modern, responsive, and high-performance web applications using React, Tailwind CSS, and Supabase.",
    },
    {
      role: "Web Development Specialist",
      company: "Portfolio & Digital Products",
      period: "2023 - 2024",
      description: "Crafting interactive UI/UX interfaces with smart animations and centralized API integration.",
    },
  ]

  const education = lang === "ID" ? [
    {
      role: "Pendidikan Pengembangan Perangkat Lunak",
      company: "Pengembangan Mandiri & Sertifikasi",
      period: "2022 - Present",
      description: "Mempelajari arsitektur sistem web modern, struktur data, JavaScript tingkat lanjut, serta framework React.",
    },
  ] : [
    {
      role: "Software Development Education",
      company: "Self Development & Certifications",
      period: "2022 - Present",
      description: "Studying modern web system architecture, data structures, advanced JavaScript, and the React framework.",
    },
  ]

  const currentTimeline = activeTab === "experience" ? experiences : education

  return (
    <div className="mt-20 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex glass p-1.5 rounded-2xl border border-white/15">
          <button
            onClick={() => setActiveTab("experience")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === "experience"
                ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Briefcase className="w-4 h-4" /> {t.about.timeline.experienceTab}
          </button>
          <button
            onClick={() => setActiveTab("education")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === "education"
                ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <GraduationCap className="w-4 h-4" /> {t.about.timeline.educationTab}
          </button>
        </div>
      </div>

      <div className="relative border-l-2 border-primary/30 ml-4 sm:ml-8 space-y-8 pl-6 sm:pl-8">
        {currentTimeline.map((item, idx) => (
          <div key={idx} className="relative group" data-aos="fade-left" data-aos-delay={idx * 150}>
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-accent border-4 border-dark group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />

            <div className="glass-card rounded-2xl p-6 border border-white/10 group-hover:border-purple-500/40 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h4 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">{item.role}</h4>
                <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-primary/20 text-purple-300 border border-primary/30">
                  <Calendar className="w-3.5 h-3.5" /> {item.period}
                </span>
              </div>
              <p className="text-sm font-medium text-indigo-300 mb-3">{item.company}</p>
              <p className="text-gray-300/80 text-sm leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const About = () => {
  const { t } = useLanguage()

  useEffect(() => {
    AOS.init({ once: true, duration: 800 })
  }, [])

  const stats = [
    { icon: Code, count: "10+", label: t.about.stats.projects },
    { icon: Award, count: "5+", label: t.about.stats.certificates },
    { icon: Globe, count: "3+", label: t.about.stats.experience },
    { icon: Briefcase, count: "100%", label: t.about.stats.dedication },
  ]

  const skills = [
    { name: "React.js", color: "bg-blue-400" },
    { name: "JavaScript", color: "bg-yellow-400" },
    { name: "TypeScript", color: "bg-blue-500" },
    { name: "Tailwind CSS", color: "bg-cyan-400" },
    { name: "Node.js", color: "bg-green-500" },
    { name: "HTML5", color: "bg-orange-500" },
    { name: "CSS3", color: "bg-blue-600" },
    { name: "Git & GitHub", color: "bg-red-500" },
    { name: "Supabase", color: "bg-emerald-400" },
    { name: "Vite", color: "bg-violet-500" },
  ]

  return (
    <section id="About" className="relative min-h-screen py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-8">
          <ProfileImage />

          <div className="space-y-6">
            <div data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                {t.about.greeting} <span className="gradient-text">Azhar Sunusi</span> 👋
              </h3>
              <p className="text-gray-300/85 leading-relaxed text-base">
                {t.about.bio1}
              </p>
              <p className="text-gray-300/85 leading-relaxed text-base mt-3">
                {t.about.bio2}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" data-aos="fade-up" data-aos-delay="400">
              {stats.map((stat, idx) => (
                <StatCard key={idx} {...stat} />
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Pengalaman & Pendidikan */}
        <TimelineSection />

        {/* Skills Section */}
        <div className="mt-20">
          <h3 
            className="text-2xl font-bold text-white text-center mb-8"
            data-aos="fade-up"
          >
            {t.about.techStackTitle}
          </h3>
          <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
            {skills.map((skill, idx) => (
              <SkillBadge key={idx} {...skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
