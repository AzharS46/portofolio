import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code2, Sparkles } from "lucide-react"

const WelcomeScreen = ({ onComplete }) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
      setTimeout(onComplete, 500)
    }, 2500)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-dark flex items-center justify-center"
        >
          {/* Background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/10 via-transparent to-transparent rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative text-center"
          >
            {/* Logo icon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-6 flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-30 animate-pulse" />
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <Code2 className="w-8 h-8 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-4xl sm:text-5xl font-bold mb-3"
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Welcome
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-gray-400 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              to my portfolio
              <Sparkles className="w-4 h-4 text-accent" />
            </motion.p>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.3 }}
              className="mt-8 w-48 mx-auto"
            >
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.2, duration: 1.3, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WelcomeScreen
