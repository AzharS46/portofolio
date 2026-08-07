import React, { useState, useRef, useEffect } from "react"
import { Play, Sparkles, Code2, Terminal, RefreshCw, X } from "lucide-react"
import Swal from "sweetalert2"
import { useLanguage } from "../context/LanguageContext"

const FireworksCanvas = ({ active, onComplete }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationId
    const particles = []

    // Spawn 150 vibrant glowing fireworks particles from bottom center
    const colors = ["#6366f1", "#a855f7", "#ec4899", "#3b82f6", "#10b981", "#f59e0b", "#ffffff"]
    
    // Create 3 burst points
    const burstPoints = [
      { x: window.innerWidth * 0.3, y: window.innerHeight * 0.35 },
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.25 },
      { x: window.innerWidth * 0.7, y: window.innerHeight * 0.35 },
    ]

    burstPoints.forEach(point => {
      for (let i = 0; i < 60; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 8 + 2
        particles.push({
          x: point.x,
          y: point.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 3.5 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.015 + 0.01,
          gravity: 0.12,
        })
      }
    })

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      let aliveCount = 0
      particles.forEach(p => {
        if (p.alpha > 0) {
          aliveCount++
          p.x += p.vx
          p.y += p.vy
          p.vy += p.gravity
          p.alpha -= p.decay

          ctx.save()
          ctx.globalAlpha = Math.max(0, p.alpha)
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.shadowBlur = 15
          ctx.shadowColor = p.color
          ctx.fill()
          ctx.restore()
        }
      })

      if (aliveCount > 0) {
        animationId = requestAnimationFrame(animate)
      } else {
        onComplete()
      }
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [active, onComplete])

  if (!active) return null

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[100] pointer-events-none"
    />
  )
}

const CodePlayground = () => {
  const { t } = useLanguage()
  const [isRunning, setIsRunning] = useState(false)
  const [fireworksActive, setFireworksActive] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const sampleCode = `// ✨ Mini Developer Playground
import { AzharPortfolio } from "@azhar/core";

function launchMagic() {
  const dev = new AzharPortfolio({
    developer: "Azhar Sunusi",
    skills: ["React", "Tailwind", "Supabase"],
    status: "READY_TO_INNOVATE"
  });

  dev.triggerFireworksEffect();
}

launchMagic();`

  const handleRunCode = () => {
    setIsRunning(true)
    setFireworksActive(true)

    Swal.fire({
      title: t.playground.successToast,
      text: "Code executed successfully! ✨",
      icon: "success",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: "#0a0520",
      color: "#fff",
    })

    setTimeout(() => {
      setIsRunning(false)
    }, 1500)
  }

  return (
    <>
      <FireworksCanvas active={fireworksActive} onComplete={() => setFireworksActive(false)} />

      {/* Trigger Floating Button */}
      <div className="fixed bottom-24 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative p-3 rounded-2xl glass border border-white/15 shadow-2xl flex items-center gap-2 hover:scale-105 transition-all duration-300"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-accent rounded-2xl blur-md opacity-40 group-hover:opacity-80 transition-opacity" />
          <Code2 className="relative z-10 w-5 h-5 text-purple-300 animate-pulse" />
          <span className="relative z-10 text-xs font-semibold text-white hidden sm:inline">Playground</span>
        </button>
      </div>

      {/* Playground Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="fixed inset-0 bg-dark/85 backdrop-blur-xl" onClick={() => setIsOpen(false)} />

          <div className="relative glass rounded-3xl border border-white/20 p-6 sm:p-8 max-w-xl w-full z-10 my-8 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full glass hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-primary/30 to-accent/30 border border-white/15">
                <Sparkles className="w-5 h-5 text-purple-300" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {t.playground.badge}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{t.playground.title}</h3>
              </div>
            </div>

            <p className="text-gray-300 text-xs sm:text-sm mb-4 leading-relaxed">
              {t.playground.subtitle}
            </p>

            {/* Code Window */}
            <div className="rounded-2xl glass border border-white/15 overflow-hidden mb-6 font-mono text-xs">
              <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-gray-400 text-[11px]">playground.js</span>
              </div>
              <pre className="p-4 text-purple-200 overflow-x-auto leading-relaxed bg-black/40">
                <code>{sampleCode}</code>
              </pre>
            </div>

            {/* Run Button */}
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="group relative w-full"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-purple-500 to-accent rounded-xl opacity-70 blur-md group-hover:opacity-100 transition-opacity" />
              <div className="relative py-3.5 px-6 rounded-xl bg-dark border border-white/15 flex items-center justify-center gap-2 text-sm font-bold text-white overflow-hidden">
                <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-primary/30 to-accent/30" />
                {isRunning ? (
                  <>
                    <RefreshCw className="w-4 h-4 text-purple-300 animate-spin z-10" />
                    <span className="z-10">Executing Code...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 text-emerald-400 fill-emerald-400 z-10 group-hover:scale-110 transition-transform" />
                    <span className="z-10">{t.playground.runBtn}</span>
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default CodePlayground
