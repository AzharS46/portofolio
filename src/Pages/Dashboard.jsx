import React, { useState, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom"
import { 
  FolderKanban, 
  Award, 
  MessageSquare, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Pin, 
  CheckCircle, 
  XCircle, 
  Code2, 
  LayoutDashboard,
  Sparkles
} from "lucide-react"
import { supabase } from "../supabase"

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("projects")
  const [projects, setProjects] = useState([
    { id: 1, Title: "E-Commerce Platform", Description: "React + Node.js e-commerce app", is_published: true },
    { id: 2, Title: "Task Management App", Description: "Collaborative workspace tool", is_published: true },
  ])
  const [certificates, setCertificates] = useState([
    { id: 1, title: "React Certificate", created_at: new Date().toISOString() },
  ])
  const [comments, setComments] = useState([
    { id: "1", user_name: "John Doe", content: "Awesome work!", is_pinned: true },
  ])

  const navigate = useNavigate()

  useEffect(() => {
    // Fetch data if Supabase is connected
    const fetchData = async () => {
      if (!supabase) return
      try {
        const { data: projData } = await supabase.from("projects").select("*").order("order_index")
        if (projData) setProjects(projData)

        const { data: certData } = await supabase.from("certificates").select("*")
        if (certData) setCertificates(certData)

        const { data: commData } = await supabase.from("portfolio_comments").select("*").order("created_at", { ascending: false })
        if (commData) setComments(commData)
      } catch (e) {
        console.error("Dashboard fetch error:", e)
      }
    }
    fetchData()
  }, [])

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut()
    }
    navigate("/")
  }

  const togglePublishProject = (id) => {
    setProjects(projects.map(p => p.id === id ? { ...p, is_published: !p.is_published } : p))
  }

  const deleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id))
  }

  const togglePinComment = (id) => {
    setComments(comments.map(c => c.id === id ? { ...c, is_pinned: !c.is_pinned } : c))
  }

  const deleteComment = (id) => {
    setComments(comments.filter(c => c.id !== id))
  }

  return (
    <div className="min-h-screen bg-dark text-slate-100 flex flex-col md:flex-row">
      <Helmet>
        <title>Admin Dashboard | Portfolio</title>
      </Helmet>

      {/* Sidebar */}
      <aside className="w-full md:w-64 glass border-r border-white/10 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-white text-lg">Dashboard</h2>
              <p className="text-xs text-gray-400">Admin Control Panel</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("projects")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === "projects"
                  ? "bg-gradient-to-r from-primary/20 to-accent/20 text-white border border-primary/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              Projects ({projects.length})
            </button>

            <button
              onClick={() => setActiveTab("certificates")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === "certificates"
                  ? "bg-gradient-to-r from-primary/20 to-accent/20 text-white border border-primary/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Award className="w-4 h-4" />
              Certificates ({certificates.length})
            </button>

            <button
              onClick={() => setActiveTab("comments")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === "comments"
                  ? "bg-gradient-to-r from-primary/20 to-accent/20 text-white border border-primary/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Comments ({comments.length})
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white capitalize">{activeTab} Management</h1>
            <p className="text-gray-400 text-sm">Create, edit, and organize your portfolio content</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-medium hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" />
            Add New {activeTab.slice(0, -1)}
          </button>
        </div>

        {/* Tab Content: Projects */}
        {activeTab === "projects" && (
          <div className="grid gap-4">
            {projects.map((proj) => (
              <div key={proj.id} className="glass-card rounded-xl p-5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-white text-lg">{proj.Title}</h3>
                  <p className="text-gray-400 text-sm">{proj.Description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePublishProject(proj.id)}
                    className={`p-2 rounded-lg border transition-colors ${
                      proj.is_published 
                        ? "bg-green-500/10 border-green-500/30 text-green-400" 
                        : "bg-gray-500/10 border-gray-500/30 text-gray-400"
                    }`}
                    title={proj.is_published ? "Published" : "Draft"}
                  >
                    {proj.is_published ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  </button>
                  <button onClick={() => deleteProject(proj.id)} className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: Certificates */}
        {activeTab === "certificates" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map((cert) => (
              <div key={cert.id} className="glass-card rounded-xl p-5">
                <div className="aspect-video bg-white/5 rounded-lg flex items-center justify-center mb-3">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-white">{cert.title || `Certificate #${cert.id}`}</h3>
                <div className="mt-4 flex justify-end">
                  <button className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: Comments */}
        {activeTab === "comments" && (
          <div className="grid gap-4">
            {comments.map((comm) => (
              <div key={comm.id} className="glass-card rounded-xl p-5 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-white">{comm.user_name}</span>
                    {comm.is_pinned && (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-primary/20 text-primary border border-primary/30 flex items-center gap-1">
                        <Pin className="w-3 h-3" /> Pinned
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">{comm.content}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePinComment(comm.id)}
                    className={`p-2 rounded-lg border transition-colors ${
                      comm.is_pinned ? "bg-primary/20 border-primary/40 text-primary" : "bg-white/5 border-white/10 text-gray-400"
                    }`}
                  >
                    <Pin className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteComment(comm.id)} className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Dashboard
