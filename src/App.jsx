import React, { useState, lazy, Suspense } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import AnimatedBackground from "./components/Background"
import BackToTop from "./components/BackToTop"
import WhatsAppWidget from "./components/WhatsAppWidget"
import CodePlayground from "./components/CodePlayground"
import WelcomeScreen from "./Pages/WelcomeScreen"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Portofolio from "./Pages/Portofolio"
import Contact from "./Pages/Contact"
import Login from "./Pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"

const Dashboard = lazy(() => import("./Pages/Dashboard"))
const NotFoundPage = lazy(() => import("./Pages/404"))

function MainPage() {
  return (
    <>
      <Home />
      <About />
      <Portofolio />
      <Contact />
    </>
  )
}

function App() {
  const [showWelcome, setShowWelcome] = useState(true)
  const location = useLocation()

  const isAuthPage = location.pathname.startsWith("/admin") || location.pathname === "/login"

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Welcome Screen overlay */}
      {showWelcome && location.pathname === "/" && (
        <WelcomeScreen onComplete={() => setShowWelcome(false)} />
      )}

      {/* Animated canvas/blob background */}
      <AnimatedBackground />

      {/* Main navigation */}
      <Navbar />

      {/* Route views */}
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="spinner" />
        </div>
      }>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      {/* Direct WhatsApp Quick Chat Widget */}
      {!isAuthPage && <WhatsAppWidget />}

      {/* Code Playground & Fireworks Easter Egg */}
      {!isAuthPage && <CodePlayground />}

      {/* Floating Back to Top Button */}
      {!isAuthPage && <BackToTop />}

      {/* Footer (hidden on admin / login) */}
      {!isAuthPage && <Footer />}
    </div>
  )
}

export default App
