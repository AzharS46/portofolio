import React, { useEffect, useRef } from "react"

const AnimatedBackground = () => {
  const blobRefs = useRef([])
  const canvasRef = useRef(null)

  const initialPositions = [
    { x: -4, y: 0 },
    { x: -4, y: 0 },
    { x: 20, y: -8 },
    { x: 20, y: -8 },
  ]

  // Interactive Particle System Canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")

    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", handleResize)

    // Particle setup
    const particleCount = Math.min(Math.floor(window.innerWidth / 15), 80)
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.5,
        color: i % 2 === 0 ? "rgba(99, 102, 241," : "rgba(168, 85, 247,",
        alpha: Math.random() * 0.7 + 0.2,
        speedY: Math.random() * 0.4 + 0.1,
        speedX: (Math.random() - 0.5) * 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw and update particles
      particles.forEach((p, i) => {
        p.y -= p.speedY
        p.x += p.speedX
        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.01

        if (p.y < 0) {
          p.y = height + 10
          p.x = Math.random() * width
        }
        if (p.x < 0 || p.x > width) {
          p.x = Math.random() * width
        }

        const clampedAlpha = Math.max(0.1, Math.min(0.8, p.alpha))

        // Draw particle glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${clampedAlpha})`
        ctx.shadowBlur = 10
        ctx.shadowColor = `${p.color}0.8)`
        ctx.fill()

        // Draw faint connecting lines for nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.15 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Parallax Scroll Blobs
  useEffect(() => {
    const handleScroll = () => {
      const newScroll = window.pageYOffset

      blobRefs.current.forEach((blob, index) => {
        if (!blob) return
        const initialPos = initialPositions[index]
        const xOffset = Math.sin(newScroll / 120 + index * 0.7) * 280
        const yOffset = Math.cos(newScroll / 120 + index * 0.7) * 45
        const x = initialPos.x + xOffset
        const y = initialPos.y + yOffset

        blob.style.transform = `translate(${x}px, ${y}px)`
        blob.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const blobs = [
    {
      className: "absolute top-0 -left-10 md:w-96 w-64 md:h-96 h-64 bg-purple-700/40 rounded-full mix-blend-multiply filter blur-[120px] animation-delay-2000",
    },
    {
      className: "absolute top-10 -right-10 md:w-96 w-64 md:h-96 h-64 bg-indigo-700/40 rounded-full mix-blend-multiply filter blur-[120px]",
    },
    {
      className: "absolute -bottom-10 left-10 md:w-96 w-64 md:h-96 h-64 bg-violet-700/40 rounded-full mix-blend-multiply filter blur-[120px] animation-delay-4000",
    },
    {
      className: "absolute -bottom-10 right-10 md:w-96 w-64 md:h-96 h-64 bg-fuchsia-700/35 rounded-full mix-blend-multiply filter blur-[120px] animation-delay-2000",
    },
  ]

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base deep space gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-200 to-dark" />

      {/* Floating Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-80" />

      {/* Animated blobs */}
      {blobs.map((blob, index) => (
        <div
          key={index}
          ref={(el) => (blobRefs.current[index] = el)}
          className={`${blob.className} animate-blob`}
        />
      ))}

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.4) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Center glowing nebula */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-radial from-indigo-900/25 via-purple-900/10 to-transparent rounded-full blur-3xl pointer-events-none" />
    </div>
  )
}

export default AnimatedBackground
