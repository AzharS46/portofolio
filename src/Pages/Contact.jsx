import React, { useEffect, useState, memo } from "react"
import { Helmet } from "react-helmet-async"
import { Send, User, MessageSquare, Sparkles, Pin, Camera, Clock, Loader2 } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useLanguage } from "../context/LanguageContext"
import { supabase } from "../supabase"

const sampleComments = [
  {
    id: "1",
    content: "Amazing portfolio! The design is absolutely stunning. Keep up the great work! 🚀",
    user_name: "John Doe",
    profile_image: null,
    is_pinned: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    content: "Love the attention to detail in every section. The animations are so smooth!",
    user_name: "Jane Smith",
    profile_image: null,
    is_pinned: false,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "3",
    content: "Great projects showcase. The glassmorphism design looks really premium.",
    user_name: "Alex Developer",
    profile_image: null,
    is_pinned: false,
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
]

const sampleCertificates = [
  { id: 1, Img: null, title: "React Advanced Specialist" },
  { id: 2, Img: null, title: "JavaScript Mastery & ES6+" },
  { id: 3, Img: null, title: "Modern Web Development" },
  { id: 4, Img: null, title: "UI/UX & Responsive Design" },
]

const CommentCard = memo(({ comment }) => {
  const { t } = useLanguage()

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime()
    const hours = Math.floor(diff / 3600000)
    if (hours < 1) return t.contact.timeJustNow
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    if (days < 7) return `${days}d ago`
    return new Date(dateStr).toLocaleDateString()
  }

  return (
    <div className={`glass-card rounded-xl p-4 ${comment.is_pinned ? 'border-primary/40 bg-primary/10' : ''}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {comment.profile_image ? (
            <img src={comment.profile_image} alt={comment.user_name} className="w-10 h-10 rounded-full object-cover border-2 border-white/10" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center border border-white/15">
              <span className="text-sm font-bold text-white">{comment.user_name.charAt(0).toUpperCase()}</span>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-white">{comment.user_name}</span>
            {comment.is_pinned && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-primary/20 text-purple-300 border border-primary/30 font-medium">
                <Pin className="w-3 h-3" /> {t.contact.pinnedBadge}
              </span>
            )}
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">{comment.content}</p>
          <div className="flex items-center gap-1 mt-2">
            <Clock className="w-3 h-3 text-gray-500" />
            <span className="text-xs text-gray-500">{timeAgo(comment.created_at)}</span>
          </div>
        </div>
      </div>
    </div>
  )
})

const CertificateCard = memo(({ cert, index }) => (
  <div 
    className="group relative cursor-pointer"
    data-aos="zoom-in"
    data-aos-delay={index * 100}
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl opacity-0 group-hover:opacity-40 blur transition-all duration-500" />
    <div className="relative glass-card rounded-xl overflow-hidden aspect-[4/3] border border-white/10">
      {cert.Img ? (
        <img src={cert.Img} alt={cert.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-indigo-900/20 via-dark-200 to-purple-900/20 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-r from-primary/30 to-accent/30 flex items-center justify-center border border-white/15 group-hover:rotate-6 transition-transform">
              <span className="text-xl">🏆</span>
            </div>
            <p className="text-xs font-semibold text-gray-300">{cert.title}</p>
          </div>
        </div>
      )}
    </div>
  </div>
))

const Contact = () => {
  const { t } = useLanguage()
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [userName, setUserName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    AOS.init({ once: true, duration: 800 })
    fetchComments()

    if (supabase) {
      const channel = supabase
        .channel('realtime_comments')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'comments' },
          (payload) => {
            if (payload.new) {
              setComments((prev) => {
                if (prev.some((c) => c.id === payload.new.id)) return prev
                return [payload.new, ...prev]
              })
            }
          }
        )
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }
  }, [])

  const fetchComments = async () => {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('comments')
          .select('*')
          .order('created_at', { ascending: false })

        if (!error && data && data.length > 0) {
          setComments(data)
          return
        }
      } catch (err) {
        console.warn("Failed to fetch from Supabase, falling back to LocalStorage:", err)
      }
    }

    // Fallback to localStorage or sampleComments
    const saved = localStorage.getItem('portfolio_comments')
    if (saved) {
      try {
        setComments(JSON.parse(saved))
      } catch {
        setComments(sampleComments)
      }
    } else {
      setComments(sampleComments)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim() || !userName.trim() || isSubmitting) return

    setIsSubmitting(true)
    const commentObj = {
      id: Date.now().toString(),
      content: newComment.trim(),
      user_name: userName.trim(),
      profile_image: null,
      is_pinned: false,
      created_at: new Date().toISOString(),
    }

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('comments')
          .insert([{
            user_name: commentObj.user_name,
            content: commentObj.content,
            is_pinned: false
          }])
          .select()

        if (!error && data && data[0]) {
          setComments([data[0], ...comments])
          setNewComment("")
          setIsSubmitting(false)
          return
        }
      } catch (err) {
        console.warn("Failed to save to Supabase, falling back to LocalStorage:", err)
      }
    }

    // Fallback to local storage update
    const updated = [commentObj, ...comments]
    setComments(updated)
    localStorage.setItem('portfolio_comments', JSON.stringify(updated))
    setNewComment("")
    setIsSubmitting(false)
  }

  return (
    <section id="Contact" className="relative min-h-screen py-24 overflow-hidden">
      <Helmet>
        <title>Azhar Sunusi | Contact</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 
              className="text-4xl md:text-5xl font-extrabold gradient-text"
              data-aos="zoom-in-up"
            >
              {t.contact.certTitle}
            </h2>
            <p className="mt-3 text-gray-300/80 text-base sm:text-lg" data-aos="zoom-in-up" data-aos-delay="200">
              {t.contact.certSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sampleCertificates.map((cert, idx) => (
              <CertificateCard key={cert.id} cert={cert} index={idx} />
            ))}
          </div>
        </div>

        <div>
          <div className="text-center mb-10">
            <h2 
              className="text-4xl md:text-5xl font-extrabold gradient-text"
              data-aos="zoom-in-up"
            >
              {t.contact.commentTitle}
            </h2>
            <p 
              className="mt-3 text-gray-300/80 text-base sm:text-lg flex items-center justify-center gap-2"
              data-aos="zoom-in-up" 
              data-aos-delay="200"
            >
              <MessageSquare className="w-5 h-5 text-purple-400" />
              {t.contact.commentSubtitle}
              <Sparkles className="w-5 h-5 text-purple-400" />
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2" data-aos="fade-right">
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-4 sticky top-24 border border-white/15">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Send className="w-5 h-5 text-purple-400" />
                  {t.contact.formTitle}
                </h3>

                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl opacity-0 group-focus-within:opacity-20 blur transition-all duration-300" />
                  <div className="relative flex items-center glass rounded-xl overflow-hidden border border-white/10">
                    <User className="w-4 h-4 text-purple-300 ml-4" />
                    <input
                      type="text"
                      placeholder={t.contact.namePlaceholder}
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-transparent px-3 py-3 text-sm text-white placeholder-gray-400 outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl opacity-0 group-focus-within:opacity-20 blur transition-all duration-300" />
                  <div className="relative glass rounded-xl overflow-hidden border border-white/10">
                    <textarea
                      placeholder={t.contact.messagePlaceholder}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={4}
                      className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder-gray-400 outline-none resize-none"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="group relative w-full"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-purple-500 to-accent rounded-xl opacity-70 blur-md group-hover:opacity-100 transition-all duration-500" />
                  <div className="relative flex items-center justify-center gap-2 py-3.5 bg-dark rounded-xl border border-white/15 overflow-hidden">
                    <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-primary/30 to-accent/30" />
                    <Send className="w-4 h-4 text-white z-10 group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="text-sm font-semibold text-white z-10">{t.contact.sendBtn}</span>
                  </div>
                </button>
              </form>
            </div>

            <div className="lg:col-span-3 space-y-3" data-aos="fade-left">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-sm">
                  {comments.length} comments
                </span>
              </div>
              
              {comments
                .sort((a, b) => (b.is_pinned ? 1 : 0) - (a.is_pinned ? 1 : 0))
                .map((comment) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
