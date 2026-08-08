import React, { useEffect, useState, memo, useRef } from "react"
import { Helmet } from "react-helmet-async"
import { ExternalLink, Github, Sparkles, Search, Code, ArrowUpRight, X, CheckCircle2, Layers } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useLanguage } from "../context/LanguageContext"

const sampleProjects = [
  {
    id: 1,
    Title: "MathNusa (Web Math)",
    Category: "Math & Tools",
    Description: "Jawab Soal Matematika Lengkap dengan Langkah Solusi. Aplikasi web interaktif untuk aljabar, kalkulus, dan plotter grafik.",
    FullDescription: "Platform matematika interaktif MathNusa yang dirancang untuk menjawab soal matematika lengkap dengan langkah-langkah solusi mendalam, fitur scan gambar, bank rumus lengkap, dan plotter grafik interaktif.",
    Img: "/mathnusa.png",
    Link: "https://web-math.vercel.app/",
    Github: "https://github.com/AzharS46/web_math",
    TechStack: ["HTML5", "CSS3", "JavaScript", "MathEngine"],
    Features: ["Penjawab Soal Matematika", "Langkah Solusi Lengkap", "Bank Rumus & Plotter", "Tema Dark Emerald"],
    is_published: true,
  },
  {
    id: 2,
    Title: "Task Management App",
    Category: "Web Apps",
    Description: "A collaborative task management application with drag-and-drop functionality, team workspaces, and real-time notifications.",
    FullDescription: "Intuitive kanban-style project management workspace. Enables teams to organize tasks into custom workflow columns, assign priority tags, set automated deadline reminders, attach file assets, and track project progress in real time.",
    Img: "/project2.png",
    Link: "https://github.com",
    Github: "https://github.com",
    TechStack: ["React", "Firebase", "Material UI", "PWA", "Framer Motion"],
    Features: ["Drag & Drop Kanban Board", "Team Workspace Collaboration", "Push Notifications", "Offline PWA Support", "Activity Log Tracker"],
    is_published: true,
  },
  {
    id: 3,
    Title: "Weather Dashboard",
    Category: "Web Apps",
    Description: "An interactive weather dashboard with beautiful visualizations, 7-day forecasts, and location-based weather tracking.",
    FullDescription: "Sleek weather application utilizing real-time meteorological data. Provides current weather metrics, 7-day hourly forecasts, interactive radar weather maps, UV index alerts, and automated location detection.",
    Img: "/project1.png",
    Link: "https://github.com",
    Github: "https://github.com",
    TechStack: ["React", "Chart.js", "OpenWeather API", "CSS3", "Tailwind CSS"],
    Features: ["Live Weather Data Stream", "Interactive Forecast Charts", "Auto Location Detection", "Severe Weather Warnings", "Dark & Light Mode"],
    is_published: true,
  },
  {
    id: 4,
    Title: "Social Media Analytics",
    Category: "Analytics",
    Description: "A comprehensive social media analytics dashboard that aggregates data from multiple platforms with real-time insights.",
    FullDescription: "All-in-one metrics aggregation tool for content creators and marketing managers. Connects with APIs to display audience growth, engagement rates, top-performing posts, and exportable PDF performance reports.",
    Img: "/project2.png",
    Link: "https://github.com",
    Github: "https://github.com",
    TechStack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Chart.js"],
    Features: ["Multi-Platform Aggregation", "Custom Exportable PDF Reports", "Audience Growth Tracking", "Engagement Rate Calculator", "Real-Time Data Refresh"],
    is_published: true,
  },
]

// Mouse Position Tracking Spotlight Card Component
const SpotlightProjectCard = memo(({ project, index, onOpenModal }) => {
  const { t } = useLanguage()
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty("--mouse-x", `${x}px`)
    cardRef.current.style.setProperty("--mouse-y", `${y}px`)
  }

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={() => onOpenModal(project)}
      className="group relative spotlight-card glass-card rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/40 hover:shadow-[0_15px_35px_-10px_rgba(99,102,241,0.3)] flex flex-col justify-between cursor-pointer"
      data-aos="fade-up"
      data-aos-delay={index * 120}
      data-aos-duration="700"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div>
        <div className="relative h-48 sm:h-52 overflow-hidden bg-gradient-to-br from-indigo-900/20 via-dark-200 to-purple-900/20 border-b border-white/10">
          {project.Img ? (
            <img 
              src={project.Img} 
              alt={project.Title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-r from-primary/30 to-accent/30 flex items-center justify-center border border-white/15 group-hover:rotate-6 transition-transform duration-500 shadow-lg">
                  <span className="text-2xl font-bold gradient-text">{project.Title.charAt(0)}</span>
                </div>
                <span className="text-xs font-mono text-purple-300">{t.portfolio.clickDetails}</span>
              </div>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10">
            {project.Link && (
              <a href={project.Link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} aria-label="Live Demo"
                className="p-2.5 rounded-xl bg-dark/80 backdrop-blur-md border border-white/15 hover:bg-primary/30 hover:border-primary/50 transition-all duration-300 hover:scale-110">
                <ExternalLink className="w-4 h-4 text-white" />
              </a>
            )}
            {project.Github && (
              <a href={project.Github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} aria-label="Source Code"
                className="p-2.5 rounded-xl bg-dark/80 backdrop-blur-md border border-white/15 hover:bg-purple-500/30 hover:border-purple-500/50 transition-all duration-300 hover:scale-110">
                <Github className="w-4 h-4 text-white" />
              </a>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300 flex items-center gap-1.5">
              {project.Title}
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 text-purple-400" />
            </h3>
          </div>

          <p className="text-gray-300/80 text-sm leading-relaxed line-clamp-3 mb-5 font-normal">
            {project.Description}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-0">
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
          {project.TechStack?.map((tech, idx) => (
            <span key={idx} className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-indigo-300 border border-primary/20 group-hover:border-purple-500/40 transition-colors">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
})

// Project Detail Modal Component
const ProjectModal = ({ project, onClose }) => {
  const { t } = useLanguage()
  if (!project) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-dark/85 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      <div className="relative glass rounded-3xl border border-white/20 p-6 sm:p-8 max-w-2xl w-full z-10 my-8 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-full glass hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {project.Img && (
          <div className="relative h-48 sm:h-60 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 overflow-hidden border-b border-white/10">
            <img src={project.Img} alt={project.Title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
          </div>
        )}

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-primary/30 to-accent/30 border border-white/15">
            <Layers className="w-6 h-6 text-purple-300" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{project.Title}</h2>
            <span className="text-xs font-mono text-purple-400">{t.portfolio.modal.specsTitle}</span>
          </div>
        </div>

        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
          {project.FullDescription || project.Description}
        </p>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" /> {t.portfolio.modal.keyFeatures}
          </h4>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {project.Features?.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">{t.portfolio.modal.techUsed}</h4>
          <div className="flex flex-wrap gap-2">
            {project.TechStack?.map((tech, idx) => (
              <span key={idx} className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-primary/20 to-accent/20 text-purple-200 border border-primary/30">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
          {project.Link && (
            <a href={project.Link} target="_blank" rel="noopener noreferrer" className="flex-1">
              <button className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-primary/25">
                <ExternalLink className="w-4 h-4" /> {t.portfolio.modal.livePreview}
              </button>
            </a>
          )}
          {project.Github && (
            <a href={project.Github} target="_blank" rel="noopener noreferrer" className="flex-1">
              <button className="w-full py-3.5 px-6 rounded-xl glass border border-white/15 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                <Github className="w-4 h-4" /> {t.portfolio.modal.sourceCode}
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

const Portofolio = () => {
  const { t } = useLanguage()
  const [projects] = useState(sampleProjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    AOS.init({ once: true, duration: 800 })
  }, [])

  const categories = ["All", ...Array.from(new Set(projects.map(p => p.Category).filter(Boolean)))]

  const filteredProjects = projects.filter(p => {
    const matchesCategory = selectedCategory === "All" || p.Category === selectedCategory
    const matchesSearch = p.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.Description.toLowerCase().includes(searchTerm.toLowerCase())
    return p.is_published && matchesCategory && matchesSearch
  })

  return (
    <section id="Portofolio" className="relative min-h-screen py-24 overflow-hidden">
      <Helmet>
        <title>Azhar Sunusi | Projects</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 
            className="text-4xl md:text-5xl font-extrabold gradient-text"
            data-aos="zoom-in-up"
            data-aos-duration="600"
          >
            {t.portfolio.title}
          </h2>
          <p 
            className="mt-3 text-gray-300/80 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
            data-aos="zoom-in-up"
            data-aos-duration="800"
          >
            <Sparkles className="w-5 h-5 text-purple-400" />
            {t.portfolio.subtitle}
            <Sparkles className="w-5 h-5 text-purple-400" />
          </p>
        </div>

        {/* Search Bar & Category Filter Pills */}
        <div className="space-y-6 max-w-2xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="200">
          <div className="relative group max-w-md mx-auto">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-purple-500 to-accent rounded-2xl opacity-0 group-hover:opacity-40 blur-md transition-all duration-500" />
            <div className="relative flex items-center glass rounded-xl overflow-hidden border border-white/15 px-4 py-1">
              <Search className="w-5 h-5 text-purple-400 ml-1" />
              <input 
                type="text"
                placeholder={t.portfolio.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent px-3 py-3 text-sm text-white placeholder-gray-400 outline-none"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat, idx) => {
              const isActive = selectedCategory === cat
              const count = cat === "All" 
                ? projects.length 
                : projects.filter(p => p.Category === cat).length

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isActive 
                      ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30 border border-purple-400/50 scale-105" 
                      : "glass text-gray-300 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  <span>{cat === "All" ? "Semua Proyek" : cat}</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                    isActive ? "bg-white/20 text-white" : "bg-white/10 text-gray-400"
                  }`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <SpotlightProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              onOpenModal={(proj) => setSelectedProject(proj)} 
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 glass rounded-2xl border border-white/10 max-w-md mx-auto">
            <Code className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400 text-base font-medium">{t.portfolio.noProjects}</p>
          </div>
        )}
      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  )
}

export default Portofolio
